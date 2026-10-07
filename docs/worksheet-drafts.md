# Browser-local worksheet drafts

All four existing worksheet pages offer **Start a learning draft**. The original blank worksheet, print layout, filled example, and download URLs remain available. Use a fictional or sanitised learning example.

## Write and return

Starting a draft opens inputs for the original questions, section prompts, and hints. Each check has an exercise state: Not reviewed, Addressed in this exercise, Still open, or Not applicable. Add its reason or missing evidence separately. These states do not approve work, qualify suppliers, prove understanding, or close editorial gaps.

Changes save immediately to one draft per worksheet in this browser. A different worksheet has its own record. Returning or reloading restores the answers and opens the draft. **Show blank worksheet** switches to the original template without clearing answers; **Continue learning draft** returns to them. Other browsers/devices have separate drafts; clearing site data can remove them.

Each written response is limited to 2,000 characters and the example label to 120. The review date belongs to the learning exercise and does not change an article's editorial checkpoint.

## Keep a copy

**Download draft Markdown** includes the current answers, every original question and hint, check states and reasons, blank-answer markers, limitations, and links to the worksheet and note. Response text is exported as literal code blocks, with fences longer than any backtick run in the answer. This download has a separate `-learning-draft.md` filename; blank and filled-example files stay unchanged.

**Print / save PDF** prints the currently displayed view. With a draft open, print output contains full response text instead of clipped textarea controls. With the blank worksheet displayed, it prints the original writing spaces. Draft print output labels the answers as personal learning responses and retains the supporting note and limitations. Screen controls are hidden and print output stays light in either screen theme.

## Storage and two tabs

If browser storage cannot be read or written, edits remain in memory across client navigation in the same open tab. Reloading or closing the tab can lose these changes, and an older saved record may return. The page displays this limit; download the draft to keep a copy.

If another tab changes or clears the same worksheet, the current answers stay visible and further typing is retained locally. Choose **Use other tab's draft** to load the browser's current record, or **Keep this tab's draft** to save the open answers instead. Resolve this choice before clearing; no automatic merge is claimed.

**Clear this draft** has a cancel/confirm step. It removes only the selected worksheet record, preserving other worksheets and Saved notes. If storage cannot be changed, the message explains that only this tab was cleared and an older record may return on reload.

## Record boundaries

Draft records are versioned, identify the worksheet, and include a signature of its current sections. The loader rejects unsupported versions, a different worksheet/template, missing or unexpected answer keys, unsupported states, impossible dates, and oversized text/records. A rejected raw record stays untouched on load and can be downloaded as text before replacement. Only current known keys are rendered; response text is escaped by React.

Draft answers are not submitted to an application server, indexed by Search, added to a URL, or used to promote content maturity. They are separate from the public fictional filled examples, Saved notes, reading progress, and the proposed reader trial. No reader trial has been conducted by adding this feature.

Without JavaScript, the original blank questions, downloads, supporting-note links, and browser printing remain available; online draft editing is disabled.
