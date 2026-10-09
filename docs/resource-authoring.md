# Writing working resources

## Fictional filled examples

`src/content/resource-examples.ts` supplies the four worked examples. Each names its blank worksheet, scenario, learning goal, limitations, conclusion, next step, and section reasoning. Every original check and field must have exactly one answer under the matching section ID. Validation rejects missing, duplicate, or renamed questions and empty answers. If a worksheet question changes, update and review its example too.

Check states are `covered` (addressed only within the invented scenario), `open`, or `not-applicable`. Give a reason for each. Do not imply a real review, supplier qualification, field result, or evidence gap closure. Fictional example dates are distinct from an article's planned editorial review date.

Examples appear at `/resources/<slug>/example/`, with separate `<slug>-example.md` downloads. The same sync/build commands regenerate both blank and example downloads. Review all answers and limitations in the A4 output; filled examples may occupy more pages than blank worksheets. Both formats link back to the supporting note.

`src/content/resources.ts` is the source for worksheet metadata, sections, checks, and response fields. The resource catalog, printable detail pages, article links, and editable Markdown downloads use the same definitions.

Each resource names a published supporting article in the same domain. Its summary, intended use, limitation, and update date must be explicit. Current resources remain Developing; their presence does not change the maturity of the supporting notes.

## Editing and verification

1. Edit a resource definition or add one with a unique slug and section IDs. A section needs checks or response fields. Keep examples fictional or safely sanitized.
2. Run `npm run resources:sync` to regenerate downloads in `public/resources/` and include the regenerated files in the commit. Do not edit those Markdown files independently.
3. Run content checks, tests, and a production build. `prebuild` validates the article relationships and regenerates downloads using the deployment's canonical article URLs.
4. Review the screen and A4 print output. Check that limitations, all prompts, writing space, and the supporting-note link remain present. PDF output uses the reader's browser print dialog.

The build rejects missing or unpublished supporting articles, inconsistent domains, duplicate or unsafe identities, invalid dates, empty descriptions, and empty sections. The post-build check requires every resource HTML page and verifies that each exported download exactly matches the generated definition.

For a local build that adds routes, use `npm run build:clean` if an incremental artifact omits a page. It clears only the ignored `.next` and `out` directories before running the usual validated build. CI builds from a fresh checkout.

The original `/resources/scope-review-checklist.md` URL and all 15 checks remain. That file is now generated from the resource definition along with the three new worksheets. The original blank downloads remain unchanged. Optional [learning drafts](worksheet-drafts.md) store responses only in the reader's browser; the application does not submit them. Drafts reuse these questions, prompts, and hints. Changing sections or question text changes the template signature, so an older record is offered as a text download instead of being applied to different questions. Section IDs must also avoid the workspace and generated draft-control IDs.

JSON draft backups use the same current-template validation as browser records. A backup for changed questions is rejected instead of attaching previous answers to new prompts. Keep workspace, restore-input, and generated answer-control IDs out of section IDs.
