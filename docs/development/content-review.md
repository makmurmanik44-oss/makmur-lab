# Editorial review workflow

The public `/review` page lists published notes, planned dates, and open gaps from MDX. `npm run review:report` prints the same source records for an editor. To inspect a particular calendar date, use `npm run review:report -- --as-of=2026-11-06`.

The initial next checkpoint is **6 November 2026**, one month after the current source review. This is an editorial planning choice, not a validated review frequency or an automatic reminder. Review sooner when a relevant source changes or a trial reveals a problem. Browser timing uses the Asia/Jakarta calendar; dates never promote maturity or imply evidence has been checked.

Each open gap has a stable `id`, its original `description`, `High` or `Normal` editorial priority, `nextCheck`, and `closeWhen`. High priority means start there when allocating review work; it is not a business-risk score. The existing eight gaps remain open. Fictional examples illustrate questions and do not close gaps.

At a checkpoint:

1. Check primary source availability and claim boundaries. Record changed guidance or new uncertainty.
2. Check the article, blank worksheet, and filled example together. Confirm every answer still matches the original question and that assumptions and fictional boundaries remain visible.
3. Perform or plan each gap's next check. Use safely sanitized evidence for a practical trial; do not add operational records to this public repository.
4. Compare results with the closure criterion. Remove a gap only after a human reviewer records supporting evidence, limitations, and a revision. Keep residual uncertainty as a narrower gap where appropriate.
5. Update `lastReviewed` only for an actual completed editorial review; update `updated` and revision history, then choose `nextReview` after `lastReviewed`. Stable/Revised still require references and no unresolved debt; that validation is necessary, not sufficient evidence of maturity.
6. Run content checks, tests, and a production export. Check public pages and downloads after publishing.

This workflow does not schedule notifications or store operational records.
