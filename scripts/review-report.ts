import { loadLibrary } from "../src/content/engine";
import { jakartaDate, reviewState } from "../src/lib/review";

async function report() {
  const args = process.argv.slice(2);
  if (args.length > 1 || args.some((arg) => !arg.startsWith("--as-of=")))
    throw new Error("Usage: npm run review:report -- [--as-of=YYYY-MM-DD]");
  const asOf = args[0]?.slice("--as-of=".length) || jakartaDate();
  const parsed = new Date(`${asOf}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(asOf) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== asOf
  )
    throw new Error("Use a real --as-of calendar date");
  const entries = (await loadLibrary())
    .map(({ entry }) => entry)
    .sort(
      (a, b) =>
        a.nextReview.localeCompare(b.nextReview) ||
        a.slug.localeCompare(b.slug),
    );
  console.log(
    `Editorial review report as of ${asOf} (Asia/Jakarta calendar). Dates are plans, not evidence of validation.`,
  );
  console.log(
    `${entries.filter((entry) => reviewState(entry.nextReview, asOf) !== "Planned").length} notes due; ${entries.flatMap((entry) => entry.knowledgeDebt).length} gaps open.`,
  );
  for (const entry of entries) {
    console.log(
      `\n${entry.slug} — ${reviewState(entry.nextReview, asOf)} ${entry.nextReview} — ${entry.contentMaturity}`,
    );
    for (const gap of entry.knowledgeDebt)
      console.log(
        `  [${gap.priority}] ${gap.id}: ${gap.description}\n  Next: ${gap.nextCheck}\n  Close when: ${gap.closeWhen}`,
      );
  }
}
report().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
