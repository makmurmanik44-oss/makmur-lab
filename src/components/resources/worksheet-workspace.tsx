"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ResourceDefinition } from "@/content/resources";
import { WorksheetBackupAnswers } from "./worksheet-backup-answers";
import {
  blankWorksheetDraft,
  draftAnswerKey,
  draftCheckLabels,
  draftLabelLimit,
  draftTextLimit,
  draftBackupByteLimit,
  readWorksheetDraft,
  readWorksheetDraftBackup,
  renderWorksheetDraftMarkdown,
  renderWorksheetDraftBackup,
  worksheetDraftHasAnswers,
  worksheetDraftResponseCount,
  worksheetDraftKey,
  type DraftCheckState,
  type WorksheetDraft,
} from "@/lib/worksheet-drafts";

type WorkspaceState = {
  draft: WorksheetDraft;
  ready: boolean;
  mode: "persistent" | "session";
  conflict: boolean;
  invalid: boolean;
};
// Keep storage-limited edits across client navigation in the same open tab.
const tabDrafts = new Map<
  string,
  { state: WorkspaceState; raw: string | null }
>();

function downloadText(
  text: string,
  filename: string,
  type = "text/markdown;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function WorksheetWorkspace({
  resource,
  children,
}: {
  resource: ResourceDefinition;
  children: ReactNode;
}) {
  const initial: WorkspaceState = {
    draft: blankWorksheetDraft(resource),
    ready: false,
    mode: "persistent",
    conflict: false,
    invalid: false,
  };
  const [state, setState] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [notice, setNotice] = useState("");
  const [restoreMessage, setRestoreMessage] = useState("");
  const [readingBackup, setReadingBackup] = useState(false);
  const [restorePreview, setRestorePreview] = useState<{
    draft: WorksheetDraft;
    filename: string;
    expectedDraft: string;
  } | null>(null);
  const current = useRef(initial);
  const stored = useRef<string | null>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);
  const clearButton = useRef<HTMLButtonElement>(null);
  const labelInput = useRef<HTMLInputElement>(null);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const restoreInput = useRef<HTMLInputElement>(null);
  const restoreCancelButton = useRef<HTMLButtonElement>(null);
  const fileReadId = useRef(0);
  const key = worksheetDraftKey(resource.slug);
  const pendingBackup = restorePreview?.draft;
  useEffect(() => {
    if (!pendingBackup) return;
    const frame = requestAnimationFrame(() =>
      restoreCancelButton.current?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [pendingBackup]);
  function apply(next: WorkspaceState) {
    current.current = next;
    tabDrafts.set(key, { state: next, raw: stored.current });
    setState(next);
  }
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const cached = tabDrafts.get(key);
      let next: WorkspaceState;
      if (
        cached &&
        (cached.state.mode === "session" || cached.state.conflict) &&
        cached.state.draft.template === blankWorksheetDraft(resource).template
      ) {
        next = cached.state;
        stored.current = cached.raw;
      } else {
        try {
          stored.current = localStorage.getItem(key);
          const recovered = readWorksheetDraft(stored.current, resource);
          next = {
            draft: recovered || blankWorksheetDraft(resource),
            ready: true,
            mode: "persistent",
            conflict: false,
            invalid: Boolean(stored.current && !recovered),
          };
        } catch {
          next = {
            draft: blankWorksheetDraft(resource),
            ready: true,
            mode: "session",
            conflict: false,
            invalid: false,
          };
        }
      }
      current.current = next;
      tabDrafts.set(key, { state: next, raw: stored.current });
      setState(next);
      setEditing(worksheetDraftHasAnswers(next.draft));
    });
    function synchronize(event: StorageEvent) {
      if (
        (event.key !== key && event.key !== null) ||
        current.current.mode === "session"
      )
        return;
      const raw = event.key === null ? null : event.newValue;
      if (raw === stored.current) return;
      // Never replace a reader's draft silently with another tab's answers.
      const next = { ...current.current, conflict: true };
      current.current = next;
      tabDrafts.set(key, { state: next, raw: stored.current });
      setState(next);
    }
    window.addEventListener("storage", synchronize);
    return () => {
      fileReadId.current += 1;
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", synchronize);
    };
  }, [key, resource]);

  function persist(draft: WorksheetDraft) {
    let { mode, conflict } = current.current;
    if (mode === "persistent" && !conflict) {
      try {
        if (localStorage.getItem(key) !== stored.current) conflict = true;
        else {
          const raw = JSON.stringify(draft);
          localStorage.setItem(key, raw);
          stored.current = raw;
        }
      } catch {
        mode = "session";
      }
    }
    apply({ draft, ready: true, mode, conflict, invalid: false });
  }
  function updateField(answerKey: string, value: string) {
    const draft = current.current.draft;
    persist({ ...draft, fields: { ...draft.fields, [answerKey]: value } });
  }
  function updateCheck(
    answerKey: string,
    change: Partial<WorksheetDraft["checks"][string]>,
  ) {
    const draft = current.current.draft;
    persist({
      ...draft,
      checks: {
        ...draft.checks,
        [answerKey]: { ...draft.checks[answerKey], ...change },
      },
    });
  }
  function resolveConflict(useOther: boolean) {
    try {
      const raw = localStorage.getItem(key);
      if (useOther) {
        const recovered = readWorksheetDraft(raw, resource);
        const next = {
          ...current.current,
          draft: recovered || blankWorksheetDraft(resource),
          mode: "persistent" as const,
          conflict: false,
          invalid: Boolean(raw && !recovered),
        };
        stored.current = raw;
        apply(next);
        setNotice("Loaded the browser's current draft.");
      } else {
        const raw = JSON.stringify(current.current.draft);
        localStorage.setItem(key, raw);
        stored.current = raw;
        apply({
          ...current.current,
          mode: "persistent",
          conflict: false,
          invalid: false,
        });
        setNotice("This tab's draft is now the saved browser draft.");
      }
    } catch {
      apply({ ...current.current, mode: "session", conflict: false });
      setNotice(
        "Browser storage could not be accessed. This tab's answers are retained.",
      );
    }
  }
  function clearDraft() {
    let mode = current.current.mode;
    if (mode === "persistent") {
      try {
        if (localStorage.getItem(key) !== stored.current) {
          apply({ ...current.current, conflict: true });
          setConfirmClear(false);
          return;
        }
        localStorage.removeItem(key);
        stored.current = null;
      } catch {
        mode = "session";
      }
    }
    apply({
      draft: blankWorksheetDraft(resource),
      ready: true,
      mode,
      conflict: false,
      invalid: false,
    });
    setConfirmClear(false);
    setEditing(false);
    setNotice(
      mode === "persistent"
        ? "This worksheet draft was cleared."
        : "Draft cleared in this tab. Browser storage could not be changed; an older saved draft may return after reload.",
    );
    toggleButton.current?.focus();
  }
  function cancelClear() {
    setConfirmClear(false);
    clearButton.current?.focus();
  }
  async function selectBackup(file: File | undefined) {
    const readId = ++fileReadId.current;
    setRestorePreview(null);
    setRestoreMessage("");
    setReadingBackup(false);
    if (!file) return;
    if (file.size > draftBackupByteLimit) {
      setReadingBackup(false);
      setRestoreMessage(
        "Choose a JSON backup no larger than 512 KB. Your draft was not changed.",
      );
      return;
    }
    const expectedDraft = JSON.stringify(current.current.draft);
    setReadingBackup(true);
    try {
      const raw = await file.text();
      if (readId !== fileReadId.current) return;
      const imported = readWorksheetDraftBackup(raw, resource);
      if (!imported) {
        setRestoreMessage(
          "This file is not a backup for this worksheet's current questions. Choose its JSON backup; your draft was not changed.",
        );
        return;
      }
      setConfirmClear(false);
      setRestorePreview({
        draft: imported,
        filename: file.name.slice(0, 160),
        expectedDraft,
      });
      setRestoreMessage(
        "Backup checked. Review the replacement before confirming.",
      );
    } catch {
      if (readId === fileReadId.current)
        setRestoreMessage(
          "The backup file could not be read. Your draft was not changed.",
        );
    } finally {
      if (readId === fileReadId.current) setReadingBackup(false);
    }
  }
  function cancelRestore() {
    fileReadId.current += 1;
    setRestorePreview(null);
    setRestoreMessage("Restore cancelled. Your current draft was kept.");
    restoreInput.current?.focus();
  }
  function restoreDraft() {
    if (!restorePreview || current.current.conflict) return;
    const expectedDraft = JSON.stringify(current.current.draft);
    if (expectedDraft !== restorePreview.expectedDraft) {
      setRestorePreview({ ...restorePreview, expectedDraft });
      setRestoreMessage(
        "Your open draft changed after selecting the backup. Review the current and backup details, then confirm again if you want to replace it.",
      );
      return;
    }
    let mode = current.current.mode;
    if (mode === "persistent") {
      try {
        if (localStorage.getItem(key) !== stored.current) {
          apply({ ...current.current, conflict: true });
          setRestoreMessage(
            "Another tab changed the saved draft. Resolve that choice before restoring this backup.",
          );
          return;
        }
        const raw = JSON.stringify(restorePreview.draft);
        localStorage.setItem(key, raw);
        stored.current = raw;
      } catch {
        mode = "session";
      }
    }
    apply({
      draft: restorePreview.draft,
      ready: true,
      mode,
      conflict: false,
      invalid: false,
    });
    setEditing(true);
    setRestorePreview(null);
    setRestoreMessage(
      mode === "persistent"
        ? "Backup restored in this browser."
        : "Backup restored in this open tab only. Download a backup to keep it before reload; browser storage is unavailable.",
    );
    requestAnimationFrame(() => labelInput.current?.focus());
  }
  const { draft } = state;
  const hasAnswers = worksheetDraftHasAnswers(draft);
  return (
    <div className="worksheet-workspace">
      <div className="draft-controls">
        <p className="eyebrow">Try your own learning example</p>
        <p>
          Use fictional or sanitized details. Draft answers stay in this browser
          and are not submitted to Makmur Lab. A draft is separate from the
          published filled example.
        </p>
        <div className="resource-actions">
          <button
            ref={toggleButton}
            type="button"
            className="button button-primary"
            disabled={!state.ready}
            aria-expanded={editing}
            aria-controls="worksheet-working-area"
            onClick={() => {
              setEditing(!editing);
              setConfirmClear(false);
              if (!editing)
                requestAnimationFrame(() => labelInput.current?.focus());
            }}
          >
            {editing
              ? "Show blank worksheet"
              : hasAnswers
                ? "Continue learning draft"
                : "Start a learning draft"}
          </button>
          {hasAnswers && (
            <>
              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  downloadText(
                    renderWorksheetDraftMarkdown(resource, draft),
                    `${resource.slug}-learning-draft.md`,
                  );
                  setNotice("Learning draft download requested.");
                }}
              >
                Download draft Markdown
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  downloadText(
                    renderWorksheetDraftBackup(resource, draft),
                    `${resource.slug}-draft-backup.json`,
                    "application/json;charset=utf-8",
                  );
                  setNotice(
                    "Draft backup download requested. Use Restore draft backup on this worksheet to continue in another browser.",
                  );
                }}
              >
                Download draft backup
              </button>
              <button
                ref={clearButton}
                type="button"
                className="button button-outline"
                disabled={
                  state.conflict || Boolean(restorePreview) || readingBackup
                }
                onClick={() => {
                  setConfirmClear(true);
                  requestAnimationFrame(() => cancelButton.current?.focus());
                }}
              >
                Clear this draft
              </button>
            </>
          )}
        </div>
        <p className="draft-storage" role="status" aria-live="polite">
          {!state.ready
            ? "Loading browser draft…"
            : state.mode === "session"
              ? "Browser storage is unavailable. Changes stay in this open tab across navigation, but can be lost on reload. Download your draft to keep it; older saved answers may return after reload."
              : state.conflict
                ? "Another tab changed this worksheet. Your typing stays in this tab until you choose which draft to keep."
                : hasAnswers
                  ? "Saved in this browser. Other devices and browsers have separate drafts."
                  : "One draft per worksheet. Changes save in this browser as you type."}
        </p>
        {state.invalid && (
          <div className="draft-notice">
            <p>
              A stored record could not be loaded with this template. It stays
              untouched until you edit or clear this draft.
            </p>
            <button
              className="button button-outline"
              type="button"
              onClick={() =>
                downloadText(
                  stored.current || "",
                  `${resource.slug}-stored-record.txt`,
                  "text/plain;charset=utf-8",
                )
              }
            >
              Download stored record
            </button>
          </div>
        )}
        {state.conflict && (
          <div className="resource-actions">
            <button
              className="button button-outline"
              type="button"
              onClick={() => resolveConflict(true)}
            >
              Use other tab&apos;s draft
            </button>
            <button
              className="button button-outline"
              type="button"
              onClick={() => resolveConflict(false)}
            >
              Keep this tab&apos;s draft
            </button>
          </div>
        )}
        {confirmClear && (
          <div
            className="draft-notice"
            onKeyDown={(event) => {
              if (event.key === "Escape") cancelClear();
            }}
          >
            <p>
              Clear only this worksheet&apos;s answers? Download them first if
              you need a copy.
            </p>
            <div className="resource-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={cancelClear}
                ref={cancelButton}
              >
                Keep draft
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={clearDraft}
              >
                Confirm clear draft
              </button>
            </div>
          </div>
        )}
        <div className="draft-backup-tools">
          <label htmlFor="draft-restore-file">Restore draft backup</label>
          <p id="draft-restore-help">
            Choose this worksheet&apos;s JSON backup, up to 512 KB. The file is
            read on this device. Preview and confirm before replacing your
            current draft; Markdown and PDF copies are for reading.
          </p>
          <input
            ref={restoreInput}
            id="draft-restore-file"
            type="file"
            accept=".json,application/json"
            className="draft-file-input"
            disabled={!state.ready || readingBackup}
            aria-describedby="draft-restore-help"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              void selectBackup(file);
            }}
          />
          <p role="status" className="draft-storage">
            {readingBackup ? "Reading backup…" : restoreMessage}
          </p>
        </div>
        {restorePreview && (
          <section
            className="draft-restore-preview"
            aria-labelledby="draft-restore-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") cancelRestore();
            }}
          >
            <h2 id="draft-restore-title">Review draft replacement</h2>
            <p>
              <strong>{resource.title}</strong> · {restorePreview.filename}
            </p>
            <dl className="draft-restore-summary">
              <div>
                <dt>Current draft</dt>
                <dd>
                  {draft.label || "No example label"}
                  <br />
                  {draft.date || "No review date"}
                  <br />
                  {worksheetDraftResponseCount(draft)} responses with text or an
                  exercise state
                </dd>
              </div>
              <div>
                <dt>Backup draft</dt>
                <dd>
                  {restorePreview.draft.label || "No example label"}
                  <br />
                  {restorePreview.draft.date || "No review date"}
                  <br />
                  {worksheetDraftResponseCount(restorePreview.draft)} responses
                  with text or an exercise state
                </dd>
              </div>
            </dl>
            <WorksheetBackupAnswers
              resource={resource}
              draft={restorePreview.draft}
            />
            <p>
              This replaces only this worksheet&apos;s current draft. Download
              its backup first if you want to keep both copies. Restoring does
              not validate the exercise or change the published example.
            </p>
            <div className="resource-actions">
              <button
                ref={restoreCancelButton}
                type="button"
                className="button button-outline"
                onClick={cancelRestore}
              >
                Keep current draft
              </button>
              <button
                type="button"
                className="button button-primary"
                disabled={state.conflict}
                onClick={restoreDraft}
              >
                Confirm restore draft
              </button>
            </div>
          </section>
        )}
        <p className="visually-hidden" role="status" aria-live="polite">
          {notice}
        </p>
        <noscript>
          <p>
            Online drafting needs JavaScript. You can still read, print, or
            download the blank worksheet.
          </p>
        </noscript>
      </div>
      <div id="worksheet-working-area">
        {editing ? (
          <>
            <div className="draft-editor">
              <div className="worksheet-identification">
                <label htmlFor="draft-example-label">
                  Example label
                  <input
                    ref={labelInput}
                    id="draft-example-label"
                    autoComplete="off"
                    maxLength={draftLabelLimit}
                    value={draft.label}
                    onChange={(event) =>
                      persist({
                        ...current.current.draft,
                        label: event.target.value,
                      })
                    }
                  />
                </label>
                <label htmlFor="draft-review-date">
                  Review date
                  <input
                    id="draft-review-date"
                    type="date"
                    min="0001-01-01"
                    max="9999-12-31"
                    value={draft.date}
                    onChange={(event) => {
                      if (event.target.validity.valid)
                        persist({
                          ...current.current.draft,
                          date: event.target.value,
                        });
                    }}
                  />
                </label>
              </div>
              <p className="draft-instructions">
                Check states describe this exercise only. Add the reason or
                missing evidence; they do not establish approval or field
                validation. Each written response allows up to{" "}
                {draftTextLimit.toLocaleString("en-US")} characters.
              </p>
              {resource.sections.map((section, sectionIndex) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="worksheet-section"
                  aria-labelledby={`section-${section.id}`}
                >
                  <h2 id={`section-${section.id}`}>
                    <span aria-hidden="true">
                      {String(sectionIndex + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {section.title}
                  </h2>
                  {section.prompt && <p>{section.prompt}</p>}
                  {(section.checks || []).map((check, index) => {
                    const answerKey = draftAnswerKey(
                      section.id,
                      "check",
                      index,
                    );
                    const answer = draft.checks[answerKey];
                    const id = `draft-${section.id}-check-${index}`;
                    return (
                      <fieldset className="draft-check" key={answerKey}>
                        <legend>{check}</legend>
                        <label htmlFor={id}>
                          Exercise state
                          <select
                            id={id}
                            value={answer.state}
                            onChange={(event) =>
                              updateCheck(answerKey, {
                                state: event.target.value as DraftCheckState,
                              })
                            }
                          >
                            {Object.entries(draftCheckLabels).map(
                              ([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <label htmlFor={`${id}-note`}>
                          Reason or missing evidence
                          <textarea
                            id={`${id}-note`}
                            rows={3}
                            maxLength={draftTextLimit}
                            value={answer.note}
                            onChange={(event) =>
                              updateCheck(answerKey, {
                                note: event.target.value,
                              })
                            }
                          />
                        </label>
                      </fieldset>
                    );
                  })}
                  <div className="draft-fields">
                    {(section.fields || []).map((field, index) => {
                      const answerKey = draftAnswerKey(
                        section.id,
                        "field",
                        index,
                      );
                      const id = `draft-${section.id}-field-${index}`;
                      return (
                        <div key={answerKey}>
                          <label htmlFor={id}>{field.label}</label>
                          {field.hint && (
                            <p id={`${id}-hint`} className="worksheet-hint">
                              {field.hint}
                            </p>
                          )}
                          <textarea
                            id={id}
                            rows={4}
                            maxLength={draftTextLimit}
                            aria-describedby={
                              field.hint ? `${id}-hint` : undefined
                            }
                            value={draft.fields[answerKey]}
                            onChange={(event) =>
                              updateField(answerKey, event.target.value)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
            <div className="draft-print">
              <p>
                <strong>Personal learning draft</strong> · Check states describe
                this exercise only; these responses do not establish approval or
                field validation.
              </p>
              <p>
                <strong>Example label:</strong> {draft.label || "Not recorded"}
                <br />
                <strong>Review date:</strong> {draft.date || "Not recorded"}
              </p>
              {resource.sections.map((section) => (
                <section className="worksheet-section" key={section.id}>
                  <h2>{section.title}</h2>
                  {section.prompt && <p>{section.prompt}</p>}
                  {(section.checks || []).map((check, index) => {
                    const answer =
                      draft.checks[draftAnswerKey(section.id, "check", index)];
                    return (
                      <div className="draft-print-answer" key={check}>
                        <p>
                          <strong>{check}</strong>
                        </p>
                        <p>Exercise state: {draftCheckLabels[answer.state]}</p>
                        <p>
                          Reason or missing evidence:{" "}
                          {answer.note || "No response recorded."}
                        </p>
                      </div>
                    );
                  })}
                  {(section.fields || []).map((field, index) => (
                    <div className="draft-print-answer" key={field.label}>
                      <p>
                        <strong>{field.label}</strong>
                      </p>
                      {field.hint && <p>{field.hint}</p>}
                      <p>
                        {draft.fields[
                          draftAnswerKey(section.id, "field", index)
                        ] || "No response recorded."}
                      </p>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
