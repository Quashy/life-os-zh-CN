#!/usr/bin/env python3
"""Synthetic, temporary-directory release safety tests. No live note reads."""
import importlib.util
import json
import pathlib
import subprocess
import sys
import tempfile
import unittest
from unittest import mock
import hashlib
import zipfile
import re
from verify_archive_restore import verify_archive, safe_name

HERE = pathlib.Path(__file__).resolve().parent
PRIVATE_SENTINEL = "SYNTHETIC_PRIVATE_SENTINEL"
spec = importlib.util.spec_from_file_location("builder", HERE / "build_template.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

class ReleaseSafety(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="life-os-safety-")
        self.base = pathlib.Path(self.temp.name)
        self.live = self.base / "fixture"
        self.live.mkdir()
        self.output = self.base / "output"
    def tearDown(self):
        self.temp.cleanup()
    def test_unsafe_names(self):
        for name in ["..", ".", "../escape", "/absolute", "nested/name", ""]:
            with self.assertRaises(ValueError): builder.validate_destination(self.live, self.output, name)
    def test_overlap_and_existing(self):
        for output in [self.live, self.live / "build", self.base]:
            with self.assertRaises(ValueError): builder.validate_destination(self.live, output, "Candidate")
        (self.output / "Candidate").mkdir(parents=True)
        with self.assertRaises(ValueError): builder.validate_destination(self.live, self.output, "Candidate")
    def test_output_symlink(self):
        try:
            self.output.symlink_to(self.live, target_is_directory=True)
        except OSError as error:
            if getattr(error, "winerror", None) == 1314:
                self.skipTest("Windows symlink privilege unavailable; native symlink check not run")
            raise
        with self.assertRaises(ValueError): builder.validate_destination(self.live, self.output, "Candidate")
    def test_safe_settings_before_copy(self):
        for plugin in ["obsidian-local-rest-api", "agent-client", "quickadd"]:
            folder = self.live / ".obsidian/plugins" / plugin
            folder.mkdir(parents=True)
            (folder / "data.json").write_text(json.dumps({"apiKey": PRIVATE_SENTINEL, "savedSessions": ["SYNTHETIC_SESSION"], "choices": [], "ai": {"providers": [{"apiKey": PRIVATE_SENTINEL}]}}))
        self.output.mkdir()
        builder.copy_tree(str(self.live), str(self.output))
        for file in self.output.rglob("data.json"):
            self.assertNotIn("SYNTHETIC_PRIVATE_SENTINEL", file.read_text())
            self.assertNotIn("SYNTHETIC_SESSION", file.read_text())
        agent = json.loads((self.output / ".obsidian/plugins/agent-client/data.json").read_text())
        self.assertFalse(agent["autoAllowPermissions"])
        self.assertFalse(agent["autoMentionActiveNote"])
    def test_source_symlink_rejected(self):
        try:
            (self.live / "link.md").symlink_to(HERE / "RELEASE.md")
        except OSError as error:
            if getattr(error, "winerror", None) == 1314:
                self.skipTest("Windows symlink privilege unavailable; native symlink check not run")
            raise
        self.output.mkdir()
        with self.assertRaises(ValueError): builder.copy_tree(str(self.live), str(self.output))
    def test_verifier_redacts_live_state(self):
        p = self.live / ".obsidian/plugins/obsidian-local-rest-api"
        p.mkdir(parents=True)
        (p / "data.json").write_text(json.dumps({"apiKey": PRIVATE_SENTINEL}))
        result = subprocess.run([sys.executable, str(HERE / "verify_template.py"), str(self.live), "--json"], text=True, capture_output=True)
        self.assertEqual(result.returncode, 1)
        self.assertNotIn("SYNTHETIC_PRIVATE_SENTINEL", result.stdout + result.stderr)
        self.assertIn("content scan skipped", result.stdout)
    def test_manifest_is_inside_package(self):
        (self.live / "fixture.txt").write_text("synthetic")
        builder.manifest(str(self.live))
        self.assertIn("fixture.txt", (self.live / "MANIFEST.sha256").read_text())
        self.assertFalse((self.base / "MANIFEST.sha256").exists())
    def test_private_defaults_never_staged(self):
        for rel in ["Meta/Compass Config.md", "03 Planning/Life Theme.md", "08 Tasks/Tasks.md"]:
            path = self.live / rel
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("SYNTHETIC_PRIVATE_SENTINEL")
        self.output.mkdir()
        builder.copy_tree(str(self.live), str(self.output))
        self.assertEqual(list(self.output.rglob("*.md")), [])
    def test_boards_do_not_bypass_personal_content_filter(self):
        for rel in [*builder.BOARD_DEFAULTS, "04 Projects/Private Board.md"]:
            path = self.live / rel
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("## Private lane\n- [ ] SYNTHETIC_PRIVATE_SENTINEL")
        self.output.mkdir()
        builder.copy_tree(str(self.live), str(self.output))
        self.assertEqual(list(self.output.rglob("*.md")), [])
        builder.reset_defaults(str(self.output))
        self.assertFalse((self.output / "04 Projects/Private Board.md").exists())
        for rel in builder.BOARD_DEFAULTS:
            with self.subTest(board=rel):
                text = (self.output / rel).read_text(encoding="utf-8")
                self.assertNotIn(PRIVATE_SENTINEL, text)
                self.assertRegex(text, r"[\u4e00-\u9fff]")
                self.assertEqual(re.findall(r"^## (.+)$", text, re.M), ["Ideas", "In progress", "Done"])
                self.assertNotRegex(text, r"(?m)^\s*-\s*\[[^\]]*\]")
    def test_missing_reviewed_board_default_refuses_build(self):
        clean = self.base / "maintainer" / "template" / "defaults"
        missing = "06 Writing/Articles/Article Board.md"
        required = ["Meta/Compass Config.md", "03 Planning/Life Theme.md", "03 Planning/Core Values.md", "03 Planning/Ideal Week.md", "08 Tasks/Tasks.md", *builder.BOARD_DEFAULTS]
        for rel in required:
            if rel == missing:
                continue
            target = clean / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("synthetic", encoding="utf-8")
        self.output.mkdir()
        with mock.patch.object(builder, "HERE", str(clean.parent.parent)):
            with self.assertRaisesRegex(ValueError, "defaults are missing or unsafe"):
                builder.reset_defaults(str(self.output))
        self.assertEqual(list(self.output.iterdir()), [])
    def test_only_reviewed_snippet_and_clean_appearance_are_staged(self):
        snippets = self.live / ".obsidian/snippets"
        snippets.mkdir(parents=True)
        reviewed = "/* synthetic first-party style */\n.lifeos-years { display: grid; }\n"
        (snippets / "lifeos.css").write_text(reviewed, encoding="utf-8")
        (snippets / "private.css").write_text(PRIVATE_SENTINEL, encoding="utf-8")
        appearance = self.live / ".obsidian/appearance.json"
        appearance.write_text(json.dumps({"enabledCssSnippets": ["lifeos", "private"], "cssTheme": PRIVATE_SENTINEL}), encoding="utf-8")
        self.output.mkdir()
        builder.copy_tree(str(self.live), str(self.output))
        self.assertEqual([p.name for p in (self.output / ".obsidian/snippets").iterdir()], ["lifeos.css"])
        self.assertEqual((self.output / ".obsidian/snippets/lifeos.css").read_text(encoding="utf-8"), reviewed)
        settings = json.loads((self.output / ".obsidian/appearance.json").read_text(encoding="utf-8"))
        self.assertEqual(settings, {"enabledCssSnippets": ["lifeos"]})
        self.assertIn(PRIVATE_SENTINEL, appearance.read_text(encoding="utf-8"))
    def test_archive_path_rules(self):
        for path in ["../escape", "/absolute", "root/../escape", "root\\escape", "C:/escape", "root//file"]:
            self.assertFalse(safe_name(path))
        self.assertTrue(safe_name("Candidate/Guide/Start Here.md"))
    def test_portable_drop_rules_and_nested_state(self):
        for path in [".git/config", ".git\\config", "scripts/template/defaults/secret.md",
                     "scripts\\template\\defaults\\secret.md", ".obsidian/plugins/agent-client/sessions/chat.json"]:
            self.assertTrue(builder.dropped(path), path)
        for rel in [".git/config", ".obsidian/plugins/agent-client/sessions/chat.json", "wiki/concepts/private.md"]:
            source = self.live / rel
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_text(PRIVATE_SENTINEL)
        self.output.mkdir()
        builder.copy_tree(str(self.live), str(self.output))
        self.assertEqual([p for p in self.output.rglob("*") if p.is_file()], [])
    def test_manifest_paths_use_portable_slashes(self):
        nested = self.live / "Guide" / "example.md"
        nested.parent.mkdir()
        nested.write_text("synthetic")
        builder.manifest(str(self.live))
        manifest = (self.live / "MANIFEST.sha256").read_text()
        self.assertIn("Guide/example.md", manifest)
        self.assertNotIn("\\", manifest)
    def test_restore_rejects_traversal_and_bad_hash(self):
        archive = self.base / "unsafe.zip"
        with zipfile.ZipFile(archive, "w") as bundle:
            bundle.writestr("../escape", "synthetic")
        checksum = pathlib.Path(str(archive) + ".sha256")
        checksum.write_text(hashlib.sha256(archive.read_bytes()).hexdigest() + "  " + archive.name)
        with self.assertRaises(ValueError): verify_archive(archive)
        checksum.write_text("0" * 64 + "  " + archive.name)
        with self.assertRaises(ValueError): verify_archive(archive)

if __name__ == "__main__":
    unittest.main()
