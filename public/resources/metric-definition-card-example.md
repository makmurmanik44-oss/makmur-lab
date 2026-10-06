# Filled example: request-to-order elapsed days

Makmur Lab — Developing worked example — 2026-10-06

Fictional learning example. Every request, option, record, role, and date below is invented. Covered means addressed within this scenario; it does not mean checked in practice.

## Scenario

An invented learning team reviews elapsed time from accepting a complete print request to releasing its order. Two fabricated records are used to test a calculation; they are not company performance data.

Learning goal: Specify events, exclusions, and a test result before drawing a chart.

Limitations: Two fabricated records cannot establish a KPI target, typical performance, or cause of delay. Calendar dates hide time-of-day detail and do not separate active work from waiting.

Blank worksheet: https://makmurmanik44-oss.github.io/makmur-lab/alpha/resources/metric-definition-card/

Related learning note: https://makmurmanik44-oss.github.io/makmur-lab/alpha/articles/data-definitions-before-dashboards/

## Name the decision

Why this matters: Start with a question that can lead to investigation; a single elapsed-time value does not explain a delay.

**Metric name and question it should answer**

Request-to-order calendar days: how long did completed requests take from acceptance of a complete request to order release?

**Who uses the result, and which action could follow?**

A fictional process reviewer could select a long-duration case for step-by-step examination. The result alone does not identify which person or step caused the duration.

## Define the calculation

Why this matters: State the population and event rule so two reviewers could reproduce the same result.

**Unit, population, and time window**

Calendar days per released order. Simulation window: orders released 1–31 October 2026; test population contains two fabricated orders only.

**Counting rule or formula**

For each order, subtract the UTC calendar date of complete-request acceptance from the UTC release date. Mean = sum of these durations divided by included orders. Test durations 3 and 5 days give (3 + 5) / 2 = 4 days, n = 2.

**Included statuses, exclusions, and exceptional cases**

Include released orders with both valid dates and one unique order ID. Exclude cancelled requests and disclose their count. Unreleased or returned requests are shown separately; missing dates and reversed event order are flagged, not assigned zero.

**Source records, extract cutoff, and definition owner**

Invented request-event and order-event tables joined by order ID. Simulated cutoff: 1 November 2026 at 00:00 UTC. Definition owner role: process reviewer; actual source mapping remains to be checked.

## Check the input records

Why this matters: A correct calculation on invented values does not verify actual source completeness.

**Required records and identifiers are present; missing coverage is disclosed.**

Still open: Both fabricated test orders have IDs and dates. Coverage of any actual request population has not been measured; missing or duplicate events remain a review task.

**The extract cutoff is suitable for the intended decision.**

Covered in scenario: The simulated cutoff follows the stated release window. It is suitable for this completed-record arithmetic test; late entries would require a disclosed refresh.

**A sample is compared with underlying records; unresolved differences are recorded.**

Still open: Only fabricated test rows exist. No comparison with observed underlying records has taken place.

**Known limitations and a test case with expected result**

Test order T1: accepted 6 October, released 9 October 2026 = 3 calendar days. T2: accepted 7 October, released 12 October = 5 days. Mean = 4 days. No working-day, time-of-day, or causal interpretation is supported.

**Review question and next revision**

Do users agree on complete-request acceptance, and are returns recorded consistently? Next revision should document observed exceptions and missing coverage before adding a performance target.

## What remains open

The definition produces the expected test value, but event coverage and decision usefulness remain untested. A chart or improvement claim would be premature.

Next step: Review the event definitions with the intended user and compare a safely sanitized sample with its underlying records before using the metric for a decision.
