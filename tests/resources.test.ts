import assert from "node:assert/strict";
import { test } from "node:test";
import { loadLibrary } from "../src/content/engine";
import {
  renderResourceMarkdown,
  validateResources,
} from "../src/content/resource-engine";
import { resources, resourceDownload } from "../src/content/resources";

test("resource publication rejects missing or unpublished articles and invalid worksheet identities", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  validateResources(resources, entries);
  assert.equal(
    resourceDownload(resources[0]),
    "/resources/scope-review-checklist.md",
  );
  const copy = () => structuredClone(resources);
  const missing = copy();
  missing[0].articleSlug = "missing-note";
  assert.throws(
    () => validateResources(missing, entries),
    /published supporting article/,
  );
  const hidden = structuredClone(entries);
  hidden.find((entry) => entry.slug === resources[0].articleSlug)!.published =
    false;
  assert.throws(
    () => validateResources(resources, hidden),
    /published supporting article/,
  );
  assert.throws(
    () => validateResources([...resources, resources[0]], entries),
    /unique/,
  );
  const domain = copy();
  domain[0].domain = "technology";
  assert.throws(() => validateResources(domain, entries), /domains must match/);
  const unsafe = copy();
  unsafe[0].slug = "../escape";
  assert.throws(
    () => validateResources(unsafe, entries),
    /Invalid resource slug/,
  );
  const ids = copy();
  ids[0].sections[1].id = ids[0].sections[0].id;
  assert.throws(() => validateResources(ids, entries), /Section IDs/);
  const date = copy();
  date[0].updated = "2026-02-30";
  assert.throws(
    () => validateResources(date, entries),
    /real resource update date/,
  );
});

test("editable downloads retain the worksheet context, checks, prompts, and response fields", () => {
  for (const resource of resources) {
    const markdown = renderResourceMarkdown(resource);
    assert.ok(markdown.startsWith(`# ${resource.title}\n`));
    assert.ok(markdown.includes(resource.limitation));
    assert.ok(markdown.includes(`/articles/${resource.articleSlug}/`));
    for (const section of resource.sections) {
      assert.ok(markdown.includes(`## ${section.title}`));
      for (const check of section.checks || [])
        assert.ok(markdown.includes(`- [ ] ${check}`));
      for (const field of section.fields || [])
        assert.ok(markdown.includes(`**${field.label}**`));
    }
  }
});
