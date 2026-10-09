import assert from "node:assert/strict";
import { test } from "node:test";
import { loadLibrary } from "../src/content/engine";
import {
  readSavedNotes,
  writeSavedNotes,
  toggleSavedNote,
  savedKnowledge,
} from "../src/lib/saved-notes";

test("stored notes accept only the current published identities and deduplicate without reordering", () => {
  const available = ["scope", "data"];
  const raw = JSON.stringify({
    version: 1,
    slugs: [
      "data",
      "missing",
      null,
      42,
      "scope",
      "data",
      "../../secret",
      { slug: "scope" },
    ],
  });
  assert.deepEqual(readSavedNotes(raw, available), ["data", "scope"]);
  assert.deepEqual(readSavedNotes(raw, ["scope"]), ["scope"]);
  assert.deepEqual(
    readSavedNotes(writeSavedNotes(["scope", "data", "scope"]), available),
    ["scope", "data"],
  );
});

test("corrupted, unsupported, and oversized saved state recovers to an empty collection", () => {
  for (const raw of [
    null,
    "",
    "{",
    "null",
    "[]",
    "42",
    '{"version":2,"slugs":["scope"]}',
    '{"version":1,"slugs":"scope"}',
    JSON.stringify({ version: 1, slugs: Array(201).fill("scope") }),
    " ".repeat(16385),
  ]) {
    assert.deepEqual(readSavedNotes(raw, ["scope"]), []);
  }
});

test("saving is reversible, newest-first, bounded, and preserves input and unrelated notes", () => {
  const original = ["scope", "data"];
  assert.deepEqual(
    toggleSavedNote(original, "process", ["scope", "data", "process"]),
    ["process", "scope", "data"],
  );
  assert.deepEqual(toggleSavedNote(original, "scope", ["scope", "data"]), [
    "data",
  ]);
  assert.deepEqual(
    toggleSavedNote(original, "missing", ["scope", "data"]),
    original,
  );
  assert.deepEqual(original, ["scope", "data"]);
  const large = Array.from({ length: 201 }, (_, i) => `note-${i}`);
  const stored = readSavedNotes(writeSavedNotes(large), large);
  assert.equal(stored.length, 200);
  assert.deepEqual(toggleSavedNote(stored, "note-200", large), [
    "note-200",
    ...stored.slice(0, 199),
  ]);
});

test("saved note resolution excludes drafts and retired notes without changing content or reading order", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const original = structuredClone(entries);
  const [first, second] = entries;
  const saved = savedKnowledge(entries, [
    second.slug,
    "missing",
    first.slug,
    second.slug,
  ]);
  assert.deepEqual(
    saved.map((entry) => entry.slug),
    [second.slug, first.slug],
  );
  assert.deepEqual(entries, original);
  const hidden = entries.map((entry) =>
    entry.slug === second.slug ? { ...entry, published: false } : entry,
  );
  assert.deepEqual(
    savedKnowledge(hidden, [second.slug, first.slug]).map(
      (entry) => entry.slug,
    ),
    [first.slug],
  );
});
