---
track: researcher
week: 6
day: 3
title: "Querying and measurement design"
status: drafting
owner: "Education Team"
reading_time: "65 min hands-on"
points: 100
sources:
  - name: "DefiLlama — Public API"
    url: "https://api-docs.defillama.com/"
    label: "Link"
  - name: "DefiLlama — Methodology"
    url: "https://docs.llama.fi/"
    label: "Link"
  - name: "DuckDB — SQL introduction"
    url: "https://duckdb.org/docs/stable/sql/introduction"
    label: "Link"
  - name: "DuckDB — CSV import"
    url: "https://duckdb.org/docs/stable/data/csv/overview"
    label: "Link"
  - name: "DuckDB — Web shell"
    url: "https://shell.duckdb.org/"
    label: "Link"
  - name: "LibreOffice — Calc documentation"
    url: "https://books.libreoffice.org/en/"
    label: "Link"
---

# Week 6 · Part 3 — Querying and measurement design

> **Core question — did reported trading volume rise, and was the rise typical or concentrated in a few days?**

A flow investigation asks what happened in particular records. A measurement
asks what a defined series can support. Use one workflow:
**question → retrieve → validate → query → stress-test metric → interpret**.
Retrieval and interpretation belong to one analysis, not separate reports.

## The hard skill

**Retrieve an auditable public series, use minimal SQL to compare consistent
windows, and test whether the headline survives alternative measurements.**

The question is bounded: **DefiLlama-reported Uniswap daily DEX volume on
Ethereum, in USD, across the last 90 complete UTC days**. It is not a count of
trades, wallets or people. No account, API key or wallet is needed.

## Core / reference material

### Retrieve once; preserve the source

Download <a :href="$withBase('/files/researcher/W6.3-free-public-data.py')" download>W6.3-free-public-data.py</a>
into an empty folder. It uses Python 3's standard library. From that folder run:

```bash
python3 W6.3-free-public-data.py
# Windows: python W6.3-free-public-data.py
```

It reads DefiLlama's free
[Uniswap volume endpoint](https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false).
Use the Ethereum entries of `totalDataChartBreakdown`, summed across reported
versions, **not** the all-chain `totalDataChart`.

The outputs are:

- `uniswap_ethereum_90days.csv`: 90 ascending dates, `day_utc` and `volume_usd`;
- `W6.3-source-snapshot.json`: the selected Ethereum version values and totals,
  endpoint, retrieval time and inclusive dates;
- `W6.3-data-provenance.txt`: the scope, unit, dates and method.

The window ends yesterday UTC. The script rejects missing/duplicate days,
ambiguous chain data and invalid amounts rather than replacing gaps with zero.
Provider revisions can change past values; keep your original snapshot.
If the API is unavailable, record the error and retry; an error alone is not a
completed measurement. Ask for a dated source snapshot rather than inventing values.

### Just enough SQL

Open [DuckDB's free web shell](https://shell.duckdb.org/). Your CSV is read in
the browser, without uploading it to a database service. Run `.files add` and
select the CSV, then:

```sql
CREATE TABLE uni AS SELECT * FROM 'uniswap_ethereum_90days.csv';
DESCRIBE uni;
```

Confirm a DATE column and a numeric volume column. SQL pieces you need:

| Piece | Cognitive job | Example |
|---|---|---|
| SELECT / FROM | Choose a table and its fields | SELECT day_utc, volume_usd FROM uni |
| WHERE | Retain matching rows | WHERE volume_usd > 1000000000 |
| COUNT / MIN / MAX | Check coverage and range | COUNT(DISTINCT day_utc) |
| CASE WHEN | Label rows by a rule | CASE WHEN condition THEN 'first' ELSE 'last' END |
| GROUP BY | Summarise each label | GROUP BY period |
| AVG / MEDIAN | Compare average with typical day | AVG(volume_usd), MEDIAN(volume_usd) |

For a source check:

```sql
SELECT COUNT(*) AS rows, COUNT(DISTINCT day_utc) AS dates,
       MIN(day_utc) AS first_day, MAX(day_utc) AS last_day,
       MIN(volume_usd) AS minimum_usd
FROM uni;
```

Both counts must be 90, dates must cover the stated complete window, and
volumes must be non-negative. Spot-check two dates with `WHERE day_utc IN
(DATE 'YYYY-MM-DD', DATE 'YYYY-MM-DD')`, replacing the placeholders. Compare
their values to the snapshot's `ethereum_total_usd`; hand-sum the Ethereum
version entries for one date.

### Worked query: a different question

This example asks weekday versus weekend volume, leaving the first/last
30-day query for you:

```sql
SELECT CASE WHEN dayofweek(day_utc) IN (0, 6)
            THEN 'weekend' ELSE 'weekday' END AS kind,
       COUNT(*) AS days, AVG(volume_usd) AS mean_usd,
       MEDIAN(volume_usd) AS median_usd
FROM uni
GROUP BY kind;
```

The day counts must sum to 90. A weekday/weekend difference describes
reported dollar activity, not how many people trade.

For your first/middle/last comparison, derive boundary dates from your CSV:
first through first + 29 days, then +30 through +59, then +60 through +89.
Use inclusive dates and confirm **30 rows per group**. Do not copy a historical
example's dates into a new download.

### Stress-test the headline

| Metric | Definition / unit | What it tests |
|---|---|---|
| Mean | Total USD / 30 observed days, USD/day | Headline average |
| Median | Middle of the ordered daily values, USD/day | A typical day, less dominated by spikes |
| Top-three share | Sum of busiest three days / window total, % | Concentration in outliers |

In Calc, with CSV headers in row 1 and sorted dates, use:

| Quantity | First 30 (rows 2–31) | Last 30 (rows 62–91) |
|---|---|---|
| Mean | `=AVERAGE(B2:B31)` | `=AVERAGE(B62:B91)` |
| Median | `=MEDIAN(B2:B31)` | `=MEDIAN(B62:B91)` |
| Top-three share | `=(LARGE(B2:B31;1)+LARGE(B2:B31;2)+LARGE(B2:B31;3))/SUM(B2:B31)` | `=(LARGE(B62:B91;1)+LARGE(B62:B91;2)+LARGE(B62:B91;3))/SUM(B62:B91)` |

Adjust argument separators for your spreadsheet locale. Zero window total
makes concentration undefined; zero first mean makes percentage change
undefined. Report either honestly.

**Synthetic interpretation example:** mean rises from $8m to $10.4m (+30%);
median from $7.5m to $7.875m (+5%); top-three share rises from 18% to 42%
(+24 percentage points). The average rose, but the typical day changed far
less. This does not establish broader adoption.

Choose an interpretation rule **before reading results**: for example,
describe mean growth separately from whether median and concentration agree.
A chosen 10% threshold would be an analytical convention, not a significance
test or a universal adoption threshold.

### Confounders that remain

Price changes, larger trades, automation/incentives, chain migration and
provider coverage can all change USD volume. Mean, median and concentration
come from the same series: they are sensitivity checks, not independent
verification of users. Record **source / unit / chain / dates / retrieval
time**, then name which extra data could separate the explanations.

## Hands-on task

Aim for 60–75 minutes total, including reading. Produce one reproducible
analysis, without an additional report or mandatory chart:

1. Retrieve and validate the 90-day CSV; keep snapshot/provenance. Run the
   coverage query and spot-check two dates, including one version-sum check.
2. Write one `CASE WHEN` / `GROUP BY` query for the first, middle and last
   30 days, returning `COUNT`, `AVG` and `MEDIAN`.
3. Cross-check first/last means in Calc and calculate top-three share for
   those windows. Calculate the percentage change in mean and median; use
   percentage points when comparing concentration.
4. State your interpretation rule, then give a **90-word finding**: numbers,
   scope, whether the typical day agrees, two confounders, and one next check.
   Do not call dollar volume people, demand or independent users.

**Out of scope:** advanced SQL, transaction decoding, price prediction and
requiring both a full measurement memo and a second query assignment.

## Evidence required

- The three data files, SQL with outputs, two source spot-checks and the small
  first/last metric table.
- One finding containing the rule, source, timeframe, units and limitations.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns full points;
incomplete or materially incorrect work is returned for revision. There is no
partial-score rubric or separate weekly submission.

Complete means 90 complete UTC dates, 30 per group, reproducible SQL and
source checks, consistent units, and a conclusion bounded by what USD volume
can show. Mean/median agreement is a check, not a required research result.

::: details Further Exploration — optional, not assessed
Chart the daily series with source and dates. Retrieve the all-chain series
separately or calculate concentration in SQL with a ranking window function.
Neither is required; a JOIN is unnecessary for this single-table question.
:::

::: details Sources and attribution
- [DefiLlama — Public API](https://api-docs.defillama.com/) and [methodology](https://docs.llama.fi/) — Link, independent data provider; derived estimates, not raw chain records
- [Uniswap volume endpoint](https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false) — Link, live data; preserve the retrieval snapshot
- [DuckDB — Web shell](https://shell.duckdb.org/), [SQL](https://duckdb.org/docs/stable/sql/introduction) and [CSV import](https://duckdb.org/docs/stable/data/csv/overview) — Link, tool documentation
- [LibreOffice — Calc](https://books.libreoffice.org/en/) — Link, tool documentation
:::
