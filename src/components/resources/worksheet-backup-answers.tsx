import type { ResourceDefinition } from "@/content/resources";
import {
  draftAnswerKey,
  draftCheckLabels,
  type WorksheetDraft,
} from "@/lib/worksheet-drafts";

export function WorksheetBackupAnswers({
  resource,
  draft,
}: {
  resource: ResourceDefinition;
  draft: WorksheetDraft;
}) {
  return (
    <details className="draft-backup-answers">
      <summary>Inspect backup answers</summary>
      {resource.sections.map((section) => (
        <section key={section.id}>
          <h3>{section.title}</h3>
          {section.prompt && <p>{section.prompt}</p>}
          {(section.checks || []).map((check, index) => {
            const answer =
              draft.checks[draftAnswerKey(section.id, "check", index)];
            return (
              <div key={check}>
                <p>
                  <strong>{check}</strong>
                </p>
                <p>Exercise state: {draftCheckLabels[answer.state]}</p>
                <p className="draft-backup-response">
                  {answer.note || "No reason or missing evidence recorded."}
                </p>
              </div>
            );
          })}
          {(section.fields || []).map((field, index) => (
            <div key={field.label}>
              <p>
                <strong>{field.label}</strong>
              </p>
              {field.hint && <p>{field.hint}</p>}
              <p className="draft-backup-response">
                {draft.fields[draftAnswerKey(section.id, "field", index)] ||
                  "No response recorded."}
              </p>
            </div>
          ))}
        </section>
      ))}
    </details>
  );
}
