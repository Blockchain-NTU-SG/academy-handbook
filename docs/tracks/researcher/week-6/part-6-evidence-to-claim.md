---
track: researcher
week: 6
day: 6
title: "Independent investigation brief"
status: drafting
owner: "Education Team"
reading_time: "50 min"
points: 100
sources:
  - name: "Etherscan — Token pages"
    url: "https://info.etherscan.com/understanding-token-page/"
    label: "Link"
  - name: "RWA.xyz — Tokenized U.S. Treasury Funds"
    url: "https://app.rwa-xyz.com/treasuries"
    label: "Link"
  - name: "RWA.xyz — Distributed vs represented methodology"
    url: "https://app.rwa-xyz.com/blog/a-new-framework-for-tokenized-assets-distributed-and-represented"
    label: "Link"
  - name: "Franklin Templeton — OnChain U.S. Government Money Fund prospectus"
    url: "https://www.franklintempleton.com/forms-literature/download-preview/9001-P"
    label: "Link"
  - name: "SEC Commissioner Peirce — Statement on tokenized securities"
    url: "https://www.sec.gov/newsroom/speeches-statements/peirce-statement-tokenized-securities-070925"
    label: "Link"
---

# Week 6 · Part 6 — Independent investigation brief

> **Core question — can you make a defensible claim about an unfamiliar case and show what could overturn it?**

You can now reconstruct a system, interpret execution records, trace flows,
measure activity and test economic/risk claims. This Part combines those skills
without a step-by-step answer. A useful conclusion may be “the evidence does
not distinguish these two explanations yet”.

## The hard skill

**Form a bounded, falsifiable conclusion by combining system understanding,
case evidence, quantitative/economic evidence and counter-evidence. For a real
case, include direct chain evidence relevant to the question.**

A **bounded claim** states which case, evidence and time window it covers. A
**falsifiable claim** names what observation would weaken or contradict it.
**Counter-evidence** weighs against your claim; an **alternative hypothesis**
is another explanation that fits at least some of the same observations.
**Confidence** is how strongly the evidence supports your conclusion, with
reasons—not certainty. A **next check** is a specific observation that could
distinguish the explanations.

This is Researcher readiness for W7, not a project proposal, trading call or
a new weekly submission. Work read-only with public data. AI can help draft
a query or challenge a claim; you must verify every cited result and explain
the reasoning yourself.

## Core / reference material

### Choose a case that makes you investigate

**Default: a new-token allocation case.** Use the self-contained case file
below. It contains attention, allocation, selling and liquidity claims with
different evidence quality. Your question might be: *which observations are
consistent with coordinated distribution/control, and what else explains
them?* Do not declare “insider dumping” or “scam” from a pattern.

::: details Case file — NOVEL launch (synthetic)
This original Academy case was created 26 October 2026. NOVEL, Case-L1,
addresses A–D, Sponsor-S, Market-M and Locker-L are invented aliases. There
are no real transaction hashes or people behind these records. Units are
display units. This is a bounded dataset, not a claim about a real project.

NOVEL is a fictional governance token for a data-service protocol. The website
claims “community-led ownership” and “locked liquidity”. Governance can
allocate treasury funds; no direct token-holder fee distribution is specified.
No implementation/admin records for the token or locker are supplied.

**Observation snapshot: 1–8 September 2026**

| Record | Evidence type | Observation / claim |
|---|---|---|
| N01 | Synthetic allocation log summary | Before launch, A, B, C and D each receive 5m NOVEL from Distributor; total supply 100m, reported circulation 40m |
| N02 | Synthetic funding history | Sponsor-S funds gas for A–C within two minutes; D has an earlier unrelated funding record |
| N03 | Synthetic swap receipts | A–C each sell 0.5m NOVEL on launch day and 0.5m again on day 3; USDQ receipts are shown in execution summaries |
| N04 | Synthetic holdings | At day 8 A–D together retain 17m NOVEL; no direct transfers among A–D appear in this window |
| N05 | Synthetic service flow | A–C send received USDQ to Market-M; a provider labels it market-maker infrastructure, without provenance |
| N06 | Synthetic LP ownership | 70% of v2 pool-share tokens are in Locker-L, 30% at Treasury; locker unlock time is six months away; admin powers are unavailable |
| N07 | Synthetic volume aggregate | Seven complete days report USDQ turnover of 2m, 8m, 3m, 2m, 2m, 1m, 2m; unique users and counterparties are not supplied |
| N08 | Website/social claim | Attention rose sharply; the promoter calls transfers “organic demand”; there is no independently validated audience count |
| N09 | Synthetic quote | Selling 100,000 USDQ of NOVEL at the displayed marginal price returns 88,000 USDQ, net of fees, at the snapshot time |
| N10 | Unverified allocation note | Website calls A–D ecosystem partners with vesting exceptions; no signed agreement or on-chain vesting evidence is supplied |

USDQ is an invented dollar-denominated quote unit, not a real stablecoin. N03
reports six swaps totalling 3m NOVEL. N04 reflects that reduction from the
initial 20m; it does not establish how much belongs to independent people.

Use the observations to choose a bounded question. Possible measurements
include share of reported circulation, observed sold/allocated share or volume
concentration, with explicit denominator choices. No particular conclusion
or calculation is prescribed.

The missing history, label provenance, admin powers, attribution and private
allocation terms remain unknown. An operational-distribution explanation and
a coordinated-control explanation may both fit some observations. Identify
the next evidence that would distinguish them.

These records are synthetic and cannot establish facts about a real protocol
or person. No separate real-chain field check is required for this default
exercise. A learner choosing a real case instead must use direct chain
evidence relevant to that case's question.
:::

For the default dossier, use its records to test competing explanations; do
not add an unrelated real transaction just to satisfy a checklist. If you
instead choose a real unfamiliar system, use at least one direct public chain
record that bears on your actual question, and verify its event emitter and
result.

**Non-token alternative:** investigate an unfamiliar protocol/system, including
a tokenised-Treasury product or **real-world asset (RWA)**, governance execution
or infrastructure dependency.
Ask a comparably falsifiable question and combine a primary source with direct
chain evidence and a meaningful measurement. Researcher is cross-domain, not
investment-only.

### Worked example: testing “freely usable”

Suppose a Treasury-token issuer documents share representation on-chain. That
supports the representation claim, not unrestricted trading. A prospectus can
specify eligibility, approvals and redemption conditions. A public transfer
shows one successful transfer, not that everyone can transfer.

For this alternate case, use the [RWA.xyz dashboard](https://app.rwa-xyz.com/treasuries)
with its [distributed/represented definitions](https://app.rwa-xyz.com/blog/a-new-framework-for-tokenized-assets-distributed-and-represented),
and an issuer document such as the
[Franklin prospectus](https://www.franklintempleton.com/forms-literature/download-preview/9001-P).
Do not sum categories without defining the total. An
[SEC Commissioner's statement](https://www.sec.gov/newsroom/speeches-statements/peirce-statement-tokenized-securities-070925)
is regulator commentary, not a binding rule or the product's legal terms.
Date your snapshot; a provider's totals are not a measure of permissionless liquidity.

### Build a brief another researcher can challenge

Use the following as one-page headings, not eleven separate assignments:

| Brief section | Include |
|---|---|
| Question / thesis | A bounded claim, case, date and falsification condition |
| System | Mechanism summary and relevant actors/dependencies |
| Evidence | Relevant case records plus a meaningful quantitative/economic measurement, with units and provenance; direct chain evidence is required when the case is real |
| Challenge | Strongest support, strongest counter-evidence/alternative, and one material causal risk |
| Judgment | Confidence with reason, what would change it, and one concrete next check |

Tag statements **observed / inferred / unknown**. Classify sources as primary
protocol/issuer, explorer/raw chain, independent data provider, commercial
intelligence provider, or opinion/secondary analysis. “Independent” describes
your source relationship; it does not certify accuracy or absence of incentives.

**Address ≠ person. Correlation ≠ common control. Unlock ≠ sale. Transfer ≠
economic demand. Volume ≠ users.** A bridge hop or mixer can reduce attribution
confidence without proving intent. Name the link you cannot establish.

## Hands-on task

Write **approximately one page / 450–600 words**, plus a compact evidence table
if needed. Budget about 50 minutes including reading. Choose a narrow question
and a few decisive sources, not an entire sector.

The brief must contain:

1. research question and bounded thesis;
2. system/mechanism summary and relevant actors/dependencies;
3. evidence appropriate to the case: for the synthetic dossier, cite relevant
   record IDs and label them as invented observations; for a real case, include
   a direct chain record relevant to the question, with chain, full hash/address,
   block/date, result and link;
4. at least one meaningful quantitative/economic measurement with unit,
   window, source and working;
5. strongest supporting evidence and strongest counter-evidence/alternative;
6. one material risk traced to an exposed party;
7. confidence, evidence that would change the conclusion, and one concrete next check.

For the synthetic case, label dossier records synthetic and keep conclusions
within their bounded observation window. For a real case, the direct record
must bear on the question, and missing attribution must stay unknown.

**Out of scope:** price targets, investment recommendations, identity claims
from clusters, long reports, paid forensic tools, or a final PoW commitment.

## Evidence required

- The brief and compact linked evidence table, with check date and source types.
- Calculation working can be a table cell; do not add a second report.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned for revision. There is no
partial-score rubric or separate weekly submission.

Complete means the question is falsifiable, system and risk are causal,
source observations and derived evidence are distinguishable, the measurement
is reproducible, and the strongest alternative is engaged rather than
dismissed. For a real case, include relevant direct chain evidence. Confidence
must fit the weakest material link. A carefully justified unknown is preferable
to an unsupported accusation.

::: details Further Exploration — optional, not assessed
Repeat one calculation with a different definition or seek evidence that would
reverse your conclusion. Larger reports and a different domain belong to later
independent work, not a second assessed task here.
:::

::: details Sources and attribution
- [Etherscan — Token pages](https://info.etherscan.com/understanding-token-page/) — Link, explorer reference
- [RWA.xyz — Treasury funds](https://app.rwa-xyz.com/treasuries) and [methodology](https://app.rwa-xyz.com/blog/a-new-framework-for-tokenized-assets-distributed-and-represented) — Link, independent data provider; date your snapshot
- [Franklin prospectus](https://www.franklintempleton.com/forms-literature/download-preview/9001-P) — Link, primary issuer terms
- [SEC Commissioner Peirce — Tokenized securities](https://www.sec.gov/newsroom/speeches-statements/peirce-statement-tokenized-securities-070925) — Link, regulator commentary, not a binding rule
- Launch dossier and brief method — original Academy material
:::
