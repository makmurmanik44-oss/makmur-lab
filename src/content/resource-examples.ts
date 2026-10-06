export type ExampleCheck = {
  check: string;
  state: "covered" | "open" | "not-applicable";
  response: string;
};
export type ResourceExample = {
  resourceSlug: string;
  title: string;
  updated: string;
  scenario: string;
  learningGoal: string;
  limitation: string;
  conclusion: string;
  nextStep: string;
  sections: {
    sectionId: string;
    reasoning: string;
    checks?: ExampleCheck[];
    fields?: { label: string; value: string }[];
  }[];
};

export const exampleNotice =
  "Fictional learning example. Every request, option, record, role, and date below is invented. Covered means addressed within this scenario; it does not mean checked in practice.";
export const exampleStates = {
  covered: "Covered in scenario",
  open: "Still open",
  "not-applicable": "Not applicable here",
};
export const resourceExamples: ResourceExample[] = [
  {
    resourceSlug: "scope-review-checklist",
    title: "Filled example: a training booklet request",
    updated: "2026-10-06",
    scenario:
      "A fictional learning team needs 20 training booklets by 21 October 2026. Each booklet has 24 A4 monochrome pages, printed duplex on 12 sheets and stapled. The requester supplies a final PDF; a reviewer checks a proof before production.",
    learningGoal:
      "Separate a common priced scope from an unresolved acceptance question.",
    limitation:
      "These invented print requirements illustrate the questions, not a recommended specification, procurement policy, or tested acceptance method.",
    conclusion:
      "Quantity and included work are clear enough for a draft request. Acceptance of print legibility and the price treatment of a revised PDF remain open; the checklist has not established readiness to order.",
    nextStep:
      "Have the requester and reviewer agree the proof criteria and revision approval before seeking comparable offers.",
    sections: [
      {
        sectionId: "need",
        reasoning:
          "Quantity, use, and timing make the need reviewable; role labels give each unanswered question an owner.",
        checks: [
          {
            check: "The business or operational problem is stated clearly.",
            state: "covered",
            response:
              "Participants need a paper copy for a fictional training exercise where screens are unavailable.",
          },
          {
            check:
              "Required quantity, timing, and operating conditions are recorded.",
            state: "covered",
            response:
              "20 booklets; 24 A4 monochrome pages each, duplex and stapled; delivery to the fictional training room by 21 October 2026.",
          },
          {
            check:
              "The person responsible for confirming the technical requirement is identified.",
            state: "covered",
            response:
              "The requester owns PDF content and quantity. The reviewer confirms the agreed print proof.",
          },
        ],
      },
      {
        sectionId: "boundary",
        reasoning:
          "A quotation should describe the same deliverables, including handoffs that could change the price or schedule.",
        checks: [
          {
            check: "Included deliverables are listed.",
            state: "covered",
            response:
              "One proof copy, production of 20 approved booklets, stapling, packaging, and delivery to the training room.",
          },
          {
            check: "Exclusions and third-party dependencies are recorded.",
            state: "covered",
            response:
              "Content writing and PDF redesign are excluded. Production depends on the requester supplying the final PDF and the reviewer approving the proof.",
          },
          {
            check:
              "Installation, commissioning, documentation, and training are considered where applicable.",
            state: "not-applicable",
            response:
              "No installation or commissioning applies to these booklets. Delivery confirmation is included; running the training session is excluded.",
          },
        ],
      },
      {
        sectionId: "acceptance",
        reasoning:
          "Listing an inspection is different from agreeing what passes it. The missing criterion stays visible.",
        checks: [
          {
            check:
              "Tests, inspections, or documents that support acceptance are specified.",
            state: "covered",
            response:
              "Compare the proof with the final PDF for page order and page count; count 20 delivered booklets and check stapling.",
          },
          {
            check:
              "Measurement conditions and acceptance ownership are recorded.",
            state: "open",
            response:
              "The reviewer owns acceptance, but the reading conditions and minimum legibility criterion for the proof have not been agreed.",
          },
          {
            check:
              "Uncertain technical requirements are marked for clarification.",
            state: "covered",
            response:
              "Mark paper choice and legibility for clarification on the draft request; do not imply the proof already passed.",
          },
        ],
      },
      {
        sectionId: "comparison",
        reasoning:
          "Separate options and assumptions so a total price does not hide a different promise.",
        checks: [
          {
            check:
              "Suppliers price a common scope or deviations are separated.",
            state: "covered",
            response:
              "Use the same 20-copy specification and delivery location; ask each fictional option to list deviations separately.",
          },
          {
            check: "Optional or conditional work is identified.",
            state: "covered",
            response:
              "Any colour cover or extra proof is an optional line. A changed PDF after proof approval is conditional work.",
          },
          {
            check: "Assumptions and commercial exclusions are visible.",
            state: "covered",
            response:
              "Assume one final PDF and one proof round; identify content edits and additional delivery trips as exclusions requiring clarification.",
          },
        ],
      },
      {
        sectionId: "ownership",
        reasoning:
          "An approval point can be proposed while its pricing detail is still unresolved.",
        checks: [
          {
            check: "Changes require a defined approval before execution.",
            state: "covered",
            response:
              "The requester approves scope changes in the scenario; the reviewer approves a new proof before changed production starts.",
          },
          {
            check:
              "Additional-work pricing and evidence requirements are defined where uncertainty remains.",
            state: "open",
            response:
              "No price mechanism exists yet for a revised PDF or a second proof. Request a separate basis and record approval before extra work.",
          },
          {
            check: "The decision and unresolved questions are recorded.",
            state: "covered",
            response:
              "Decision: keep this as a draft request. Open: paper and legibility criteria, proof turnaround, and treatment of revised files.",
          },
        ],
      },
      {
        sectionId: "reflection",
        reasoning:
          "Reflection captures what a future trial must check instead of treating completion of boxes as proof of usefulness.",
        fields: [
          {
            label: "Resolved questions and remaining gaps",
            value:
              "Resolved: quantity, page format, included delivery, and role ownership. Still open: acceptance conditions and change pricing. In a later sanitized trial, record questions this checklist missed and revise it.",
          },
        ],
      },
    ],
  },
  {
    resourceSlug: "supplier-capability-review",
    title: "Filled example: an anonymous print option",
    updated: "2026-10-06",
    scenario:
      "The same fictional request needs 20 training booklets by 21 October 2026. Option A is an invented print option; all statements and sample records here are simulated, including its registration and available production slot.",
    learningGoal:
      "Distinguish registration, demonstrated capability, promised capacity, and unknown dependencies.",
    limitation:
      "No supplier has been assessed. The example does not establish an evidence freshness rule or show that two options provide independent capacity.",
    conclusion:
      "Option A has simulated capability information but unconfirmed capacity and upstream exposure. It remains an option to investigate, not a qualified or guaranteed source.",
    nextStep:
      "Ask for confirmation against the final specification and delivery period, then investigate shared production dependencies before any continuity decision.",
    sections: [
      {
        sectionId: "requirement",
        reasoning:
          "Evidence only becomes relevant when it is compared with a defined deliverable and period.",
        fields: [
          {
            label: "Category, deliverable, and operating conditions",
            value:
              "Printing: 24 A4 monochrome pages per booklet, duplex on 12 sheets, stapled; final PDF and approved proof are required handoffs.",
          },
          {
            label: "Quantity, location, and required period",
            value:
              "20 booklets delivered to a fictional training room by 21 October 2026; proof approval planned for 16 October in this simulation.",
          },
        ],
      },
      {
        sectionId: "evidence",
        reasoning:
          "A simulated sample may illustrate capability while a capacity promise still needs a dated check.",
        fields: [
          {
            label:
              "Option label and what its approval status actually verifies",
            value:
              "Option A. Its invented directory entry contains contact details only; it verifies neither this print specification nor an available slot.",
          },
          {
            label: "Capability evidence",
            value:
              "An invented proof of a similar 24-page booklet shows page order and stapling. It does not demonstrate legibility for the new PDF; request a new proof.",
          },
          {
            label: "Capacity evidence",
            value:
              "An invented message says 20 copies can be produced during 16–20 October. No reserved slot or delivery confirmation exists in the scenario.",
          },
          {
            label: "Evidence date and reviewer",
            value:
              "Simulated evidence date: 6 October 2026. Reviewer role: learning exercise reviewer. No real review was performed.",
          },
          {
            label: "Shared upstream source or subcontractor",
            value:
              "Unknown. Option A and a hypothetical Option B may use the same print shop or paper stock source; two names do not establish independent capacity.",
          },
        ],
      },
      {
        sectionId: "next-check",
        reasoning:
          "Keep evidence scope and unknowns explicit; do not turn a statement into a checked commitment.",
        checks: [
          {
            check:
              "The evidence relates to the defined requirement and period.",
            state: "open",
            response:
              "The similar booklet is only partial evidence. The final PDF proof, production slot, and delivery date still need confirmation.",
          },
          {
            check:
              "Registration, transaction history, and current capability are kept distinct.",
            state: "covered",
            response:
              "The directory entry, similar proof, and capacity message are recorded separately. No transaction history is invented to close the gaps.",
          },
          {
            check:
              "Missing evidence and possible shared dependencies remain visible.",
            state: "covered",
            response:
              "The final proof and reserved capacity are missing; shared print shop and paper supply remain unknown.",
          },
        ],
        fields: [
          {
            label: "Unresolved question, next check, and review date",
            value:
              "Can Option A meet the final scope and period, and does it share production with Option B? Request dated confirmation and dependency information. Fictional follow-up: 12 October 2026, before proof approval.",
          },
        ],
      },
    ],
  },
  {
    resourceSlug: "metric-definition-card",
    title: "Filled example: request-to-order elapsed days",
    updated: "2026-10-06",
    scenario:
      "An invented learning team reviews elapsed time from accepting a complete print request to releasing its order. Two fabricated records are used to test a calculation; they are not company performance data.",
    learningGoal:
      "Specify events, exclusions, and a test result before drawing a chart.",
    limitation:
      "Two fabricated records cannot establish a KPI target, typical performance, or cause of delay. Calendar dates hide time-of-day detail and do not separate active work from waiting.",
    conclusion:
      "The definition produces the expected test value, but event coverage and decision usefulness remain untested. A chart or improvement claim would be premature.",
    nextStep:
      "Review the event definitions with the intended user and compare a safely sanitized sample with its underlying records before using the metric for a decision.",
    sections: [
      {
        sectionId: "decision",
        reasoning:
          "Start with a question that can lead to investigation; a single elapsed-time value does not explain a delay.",
        fields: [
          {
            label: "Metric name and question it should answer",
            value:
              "Request-to-order calendar days: how long did completed requests take from acceptance of a complete request to order release?",
          },
          {
            label: "Who uses the result, and which action could follow?",
            value:
              "A fictional process reviewer could select a long-duration case for step-by-step examination. The result alone does not identify which person or step caused the duration.",
          },
        ],
      },
      {
        sectionId: "definition",
        reasoning:
          "State the population and event rule so two reviewers could reproduce the same result.",
        fields: [
          {
            label: "Unit, population, and time window",
            value:
              "Calendar days per released order. Simulation window: orders released 1–31 October 2026; test population contains two fabricated orders only.",
          },
          {
            label: "Counting rule or formula",
            value:
              "For each order, subtract the UTC calendar date of complete-request acceptance from the UTC release date. Mean = sum of these durations divided by included orders. Test durations 3 and 5 days give (3 + 5) / 2 = 4 days, n = 2.",
          },
          {
            label: "Included statuses, exclusions, and exceptional cases",
            value:
              "Include released orders with both valid dates and one unique order ID. Exclude cancelled requests and disclose their count. Unreleased or returned requests are shown separately; missing dates and reversed event order are flagged, not assigned zero.",
          },
          {
            label: "Source records, extract cutoff, and definition owner",
            value:
              "Invented request-event and order-event tables joined by order ID. Simulated cutoff: 1 November 2026 at 00:00 UTC. Definition owner role: process reviewer; actual source mapping remains to be checked.",
          },
        ],
      },
      {
        sectionId: "quality",
        reasoning:
          "A correct calculation on invented values does not verify actual source completeness.",
        checks: [
          {
            check:
              "Required records and identifiers are present; missing coverage is disclosed.",
            state: "open",
            response:
              "Both fabricated test orders have IDs and dates. Coverage of any actual request population has not been measured; missing or duplicate events remain a review task.",
          },
          {
            check: "The extract cutoff is suitable for the intended decision.",
            state: "covered",
            response:
              "The simulated cutoff follows the stated release window. It is suitable for this completed-record arithmetic test; late entries would require a disclosed refresh.",
          },
          {
            check:
              "A sample is compared with underlying records; unresolved differences are recorded.",
            state: "open",
            response:
              "Only fabricated test rows exist. No comparison with observed underlying records has taken place.",
          },
        ],
        fields: [
          {
            label: "Known limitations and a test case with expected result",
            value:
              "Test order T1: accepted 6 October, released 9 October 2026 = 3 calendar days. T2: accepted 7 October, released 12 October = 5 days. Mean = 4 days. No working-day, time-of-day, or causal interpretation is supported.",
          },
          {
            label: "Review question and next revision",
            value:
              "Do users agree on complete-request acceptance, and are returns recorded consistently? Next revision should document observed exceptions and missing coverage before adding a performance target.",
          },
        ],
      },
    ],
  },
  {
    resourceSlug: "process-boundary-worksheet",
    title: "Filled example: a bounded print purchasing process",
    updated: "2026-10-06",
    scenario:
      "A fictional team maps purchasing of the 20 training booklets, from acceptance of a complete request to release of an order. The sequence is proposed for discussion; nobody has observed or validated it in a workplace.",
    learningGoal:
      "Keep SIPOC categories and process boundaries distinct from observed flow and measured timing.",
    limitation:
      "This is a fictional five-category SIPOC sketch, not a complete SIPOC+CM analysis, verified process map, or bottleneck diagnosis.",
    conclusion:
      "The sketch identifies handoffs and a possible return loop. Participant agreement, exceptional routes, and actual timing evidence are still missing.",
    nextStep:
      "Ask participants to review the boundary, then trace a small safely sanitized sample and revise the flow before making a timing comparison.",
    sections: [
      {
        sectionId: "boundary",
        reasoning:
          "A clear starting and ending event prevents delivery or payment time from being mixed into this review.",
        fields: [
          {
            label: "Process name and question to investigate",
            value:
              "Print request to released order. Which handoffs or returns might need closer observation before measuring elapsed time?",
          },
          {
            label: "Starting event and ending event",
            value:
              "Start: reviewer records acceptance of a complete request. End: an approved order is released to the selected fictional print option.",
          },
          {
            label: "Activities outside this boundary",
            value:
              "Drafting the PDF before request acceptance, print production after order release, delivery acceptance, the training session, and payment.",
          },
        ],
      },
      {
        sectionId: "sipoc",
        reasoning:
          "Link each input provider to the main sequence and its output users; do not confuse these role labels with a validated organisation chart.",
        fields: [
          {
            label: "Suppliers",
            value:
              "Requester provides the need and final PDF; reviewer provides clarification and proof criteria; anonymous print options provide offers and capability statements.",
          },
          {
            label: "Inputs",
            value:
              "Accepted request for 20 booklets, final PDF, agreed acceptance criteria, offers on a common scope, and an applicable approval requirement to be clarified.",
          },
          {
            label: "Process",
            value:
              "Review request → clarify missing scope (return to requester if needed) → seek comparable offers → review evidence and deviations → obtain applicable approval → release order. Actual routing is unknown.",
          },
          {
            label: "Outputs",
            value:
              "Released order with agreed scope and acceptance criteria; recorded decision and unresolved questions. Delivered booklets are an output of a later process.",
          },
          {
            label: "Customers",
            value:
              "The selected print option uses the order; the requester and later acceptance reviewer use the recorded scope and criteria.",
          },
        ],
      },
      {
        sectionId: "observe",
        reasoning:
          "A proposed sequence is a starting point for observation. Open checks prevent the sketch being presented as evidence.",
        checks: [
          {
            check:
              "People involved in the process have reviewed the proposed boundary.",
            state: "open",
            response:
              "No actual participants have reviewed it; the role labels and boundary are invented.",
          },
          {
            check:
              "A small sanitized sample is checked for missing steps, returns, or exceptional routes.",
            state: "open",
            response:
              "No observed sample exists. A future trial should trace returned requests, approval exceptions, and changes after offer review.",
          },
          {
            check:
              "Timing events and calendar or working-time rules are stated before comparison.",
            state: "covered",
            response:
              "For a proposed test, use the UTC calendar date of complete-request acceptance and order release; elapsed calendar days = end date minus start date. This is neither active work time nor a working-day measure.",
          },
        ],
        fields: [
          {
            label: "Unknown step or event, evidence needed, and next check",
            value:
              "Unknown: applicable approval and return routes. Needed: participant explanations and sanitized event traces. Next check: compare the proposed sequence with a small sample and record each mismatch before timing analysis.",
          },
        ],
      },
    ],
  },
];

export function examplePath(example: Pick<ResourceExample, "resourceSlug">) {
  return `/resources/${example.resourceSlug}/example`;
}
export function exampleDownload(
  example: Pick<ResourceExample, "resourceSlug">,
) {
  return `/resources/${example.resourceSlug}-example.md`;
}
