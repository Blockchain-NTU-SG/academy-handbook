---
track: researcher
week: 6
day: 3
title: "Measurement design"
status: drafting
owner: "Education Team"
reading_time: "40 min"
points: 100
sources:
  - name: "DefiLlama — Public API documentation"
    url: "https://api-docs.defillama.com/"
    label: "Link"
  - name: "DefiLlama — Metrics and adapter methodology"
    url: "https://docs.llama.fi/"
    label: "Link"
  - name: "DefiLlama — Uniswap DEX-volume endpoint"
    url: "https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false"
    label: "Link"
  - name: "LibreOffice — Documentation"
    url: "https://books.libreoffice.org/en/"
    label: "Link"
---

<!--
Author note (Education team): the synthetic worked example was recalculated on
21 October 2026, and the method was run on the live Part 2 data the same day.
The model answer is kept outside the public handbook.
-->

# Week 6 · Part 3 — Measurement design

> **Core question — does higher reported trading volume mean broader Uniswap usage?**

In Part 2 you downloaded **90 complete UTC days** of DefiLlama-reported Uniswap DEX USD volume **on Ethereum** and made a chart. Now decide what would justify the word **“growth”**. A higher *average* can conceal a handful of large days, and a dollar metric cannot establish a rise in transactions or people.

Why it matters: good research defines the unit, comparison, interpretation and checks before writing a headline. Use the **same real CSV as Part 2**; do not require Dune or individual transaction data.

::: tip Think of a shop's daily revenue
If a store's average daily takings rise sharply but its median day hardly changes, the rise might be concentrated in a few unusually large sales days.

Where the picture stops: a daily median and concentration calculation still measure *reported dollar value*, not purchase counts or unique buyers. In on-chain markets, automated swaps and token-price changes add more complications.
:::

## The hard skill

**Design a reproducible metric system that checks whether a headline USD-volume change reflects a typical day or a few outlier days, and state exactly what remains unknown.**

After this Part you can:

- distinguish metric **definition** from a claim about users;
- specify primary, supporting and counter-metrics from a common data source;
- compare consistent 30-day windows, using a predeclared decision rule;
- identify skew, price effects, chain mix and provider coverage as possible distortions.

## Core / reference material

### Five things to specify for each metric

1. **Question:** What is the precisely worded claim?
2. **Unit:** USD/day, fraction of period's USD volume, or another unit?
3. **Source and filters:** Which provider, protocol, chain and UTC dates?
4. **Distortion:** What changes this value without the activity implied by the headline?
5. **Cross-check:** Which independent view or related metric would challenge the conclusion?

### Three metrics from the same Part 2 CSV

| Role | Exact measurement | Meaning |
|---|---|---|
| **Primary** | Mean `volume_usd` per day for each 30-day window | Average reported dollar value traded per day |
| **Supporting** | Median `volume_usd` per day in each window | The typical day's reported dollar volume; less influenced by a few spikes |
| **Counter-metric** | **Top-three-day share** = (sum of three highest daily volumes in a window) ÷ (sum of all 30 days' volumes) | How concentrated the reported value is among the busiest dates |

All three describe **Uniswap on Ethereum** as represented by DefiLlama. None measures the number of swaps, distinct transaction hashes, unique wallets or humans. The mean and median are expressed in **USD/day**; the top-three share is a **percentage of the 30-day total**. Use exactly the first and last 30 complete calendar days of the same 90-day CSV; do **not** compare an incomplete day or substitute the middle 30.

### Worked example: three numbers, different stories

The following figures are **made up for learning**, not live DefiLlama results:

| Metric | First 30 days | Last 30 days |
|---|---:|---:|
| Mean daily reported USD volume | $8.0m/day | $10.4m/day |
| Median daily reported USD volume | $7.5m/day | $7.875m/day |
| Share of period's total in busiest 3 days | 18% | 42% |

Mean change = `(10.4 / 8.0 − 1) × 100 = +30%`. Median change = `(7.875 / 7.5 − 1) × 100 = +5%`. The three busiest days' share rose **24 percentage points** (18% → 42%). The average did rise, but the typical day changed far less and volume became more concentrated. This challenges a claim of broad-based daily dollar-volume growth, and **says nothing definite about user counts**.

### Calculation sheet (same Part 2 CSV)

After importing the 90 rows into Calc, with `day_utc` in column A and `volume_usd` in column B:

| Quantity | First 30 (rows 2–31) | Last 30 (rows 62–91) |
|---|---|---|
| Mean | `=AVERAGE(B2:B31)` | `=AVERAGE(B62:B91)` |
| Median | `=MEDIAN(B2:B31)` | `=MEDIAN(B62:B91)` |
| Top-three-day share | `(LARGE(B2:B31;1)+LARGE(B2:B31;2)+LARGE(B2:B31;3))/SUM(B2:B31)` | `(LARGE(B62:B91;1)+LARGE(B62:B91;2)+LARGE(B62:B91;3))/SUM(B62:B91)` |

For the top-three share, prefix the expressions with `=` in Calc, format cells as **percent**, and handle a zero total by reporting **undefined**, not dividing by zero. Calc typically uses `;` argument separators; adjust for local settings if necessary.

You can also get the means and medians from SQL. Add `MEDIAN(volume_usd)` to
the grouped query you wrote in Part 2, step 4, and check the results match
your spreadsheet.

### Risks and useful counter-checks

| Distortion | Possible bias | Verification idea |
|---|---|---|
| One or two very large-volume days | Mean rises without the typical day rising | Compare mean with median and top-three concentration |
| USD prices or trade size change | Dollar value changes without a comparable change in trading frequency | Explicitly avoid transaction/user claims; another dataset would be needed |
| Today or missing dates | Partial or absent days pull an average downward | Verify Part 2's exact 90 complete dates and flag any gaps |
| Ethereum-to-other-chain migration | Ethereum-only trend differs from all-chain activity | Limit claim to Ethereum; optionally examine all-chain series separately |
| DefiLlama adapter revisions or lags | Apparent historical changes may be data updates | Date-stamp and preserve Part 2 source snapshot |

## Hands-on task

Reuse `uniswap_ethereum_90days.csv` and `W6.2-source-snapshot.json` from **Part 2**. Write a **one-page measurement-design memo**:

1. **Bound the claim.** Restate the 90-day exact UTC window and define “growth” as change in **DefiLlama-reported USD volume on Ethereum**, not increased traders or transactions.
2. **Specify three metrics.** Complete the five-line specification for **mean**, **median** and **top-three-day share**. Use Part 2's source and filter; document each unit and limitation.
3. **Declare a rule before interpreting data.** Suggested analytical threshold: label **mean daily reported volume up materially** if the last-30 mean is **at least 10%** above the first-30 mean and both windows have 30 observed complete UTC days. Separately call the pattern **broad-based within the daily-volume distribution** only if the median also rises at least 10% and top-three share does not increase. These are chosen analytic rules, **not statistical significance tests or adoption tests**. Say what you will report if baseline mean or period total is zero.
4. **Test at least three distortions.** For each, state its likely effect on interpretation, plus a check or an honest limitation. Use price/trade size, outlier concentration and data coverage (or chain-selection bias).
5. **Calculate and judge.** Apply your rule to Part 2's **actual** CSV, then separately apply it to the **synthetic worked example** above. In 70–90 words, say what the evidence supports and what it does **not** prove about users.

**Out of scope:** pretending the volume API contains transaction counts, assuming distinct wallets equal people, forecasting prices, or claiming a fixed threshold proves adoption.

## Evidence required

- One-page memo with primary, supporting and counter-metric specs.
- First and last 30-day mean, median, top-three share, exact dates and declared rule.
- Three bias checks, a real-data conclusion with source and retrieval time, and a separate labeled synthetic judgment.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns full points; incomplete or materially incorrect work is returned for feedback and revision. There is no partial-score rubric.

**Your work is complete when:**

- [ ] the same **Part 2 DefiLlama CSV** is used and all three measures are reproducible;
- [ ] mean and median units are USD/day and concentration is a percentage;
- [ ] the comparison covers the first and last 30 of **90 full UTC days**;
- [ ] the rule differentiates *mean growth* from *broad-based daily distribution growth*;
- [ ] three distortions and reasonable checks/limits are discussed;
- [ ] synthetic figures are not presented as live research findings;
- [ ] no volume observation is mislabeled a count of people or transactions.

::: details Further exploration — optional, not assessed
- Repeat the comparison with the middle 30-day period as an added reference: is the pattern consistent or does it reverse?
- Compare Uniswap's Ethereum-only series with its cross-chain volume series, keeping definitions separate.
- Calculate the top-three-day share in DuckDB as well. You will need `ROW_NUMBER() OVER (PARTITION BY period ORDER BY volume_usd DESC)`, a window function, to rank the days inside each period.
:::

::: details Sources and attribution
- [DefiLlama — Public API documentation](https://api-docs.defillama.com/) — Link, referenced only
- [DefiLlama — Metrics and adapter methodology](https://docs.llama.fi/) — Link, referenced only
- [DefiLlama — Uniswap DEX-volume endpoint](https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false) — Link, the data behind the Part 2 CSV
- [LibreOffice — Documentation](https://books.libreoffice.org/en/) — Link, referenced only
:::
