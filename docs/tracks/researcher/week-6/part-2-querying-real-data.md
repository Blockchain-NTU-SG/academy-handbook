---
track: researcher
week: 6
day: 2
title: "Querying real data"
status: drafting
owner: "Education Team"
reading_time: "60 min hands-on"
points: 100
sources:
  - name: "DefiLlama — Public API documentation"
    url: "https://api-docs.defillama.com/"
    label: "Link"
  - name: "DefiLlama — Uniswap DEX volume endpoint"
    url: "https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false"
    label: "Link"
  - name: "DefiLlama — Data methodology"
    url: "https://docs.llama.fi/"
    label: "Link"
  - name: "DuckDB — Web shell"
    url: "https://shell.duckdb.org/"
    label: "Link"
  - name: "DuckDB — SQL introduction"
    url: "https://duckdb.org/docs/stable/sql/introduction"
    label: "Link"
  - name: "DuckDB — Reading CSV files"
    url: "https://duckdb.org/docs/stable/data/csv/overview"
    label: "Link"
  - name: "LibreOffice — Calc documentation"
    url: "https://books.libreoffice.org/en/"
    label: "Link"
---

<!--
Author note (Education team): the script and every SQL query on this page were
run live on 21 October 2026 (window 2026-07-23 to 2026-10-20). The DuckDB web
shell steps (.files add, then querying the CSV by file name) were tested in a
browser. The model answer and reviewer notes are kept outside the public
handbook.
-->

# Week 6 · Part 2 — Querying real data

> **Core question — did DefiLlama-reported Uniswap trading volume on Ethereum
> rise across the last 90 complete UTC days?**

In Part 1 you checked the evidence for one transaction. Here you work with a
time series: 90 days of real protocol activity. You fetch it from DefiLlama's
free public API with a short Python script, then answer the question by
writing SQL yourself in DuckDB, a free database that runs in your browser.

You do not need a Dune account, a paid plan, a wallet or an API key.

::: tip Picture a shop's daily takings
A shop's takings can go up because more people came in, because people bought
more each, or because prices rose. The number on the till alone cannot tell you
which.

Where the picture stops: DefiLlama's figures are estimates built by its
adapters, not a raw list of every Ethereum transaction. Its methods and
historical figures can change after you download them.
:::

## The hard skill

**Retrieve a reproducible 90-day public data series, query it with SQL, check
it against the source, and write a claim that stays inside what the data can
show.**

After this Part you can:

- request documented public data without logging in;
- keep Ethereum-only data rather than a cross-chain total;
- use the last 90 complete UTC days, leaving out today's unfinished day;
- write SQL with `SELECT`, `WHERE`, `CASE WHEN`, `GROUP BY` and `AVG` to
  check and summarise a dataset;
- explain why a USD volume series cannot prove more trades or more users.

## Core / reference material

### Source, unit and files

**Source.** DefiLlama's free `GET /summary/dexs/uniswap` endpoint returns JSON.
Two parts of it matter here:

| Field | What it holds | Use it? |
|---|---|---|
| `totalDataChart` | One number per day, all chains added together | No, it is not Ethereum-only |
| `totalDataChartBreakdown` | Per day, a figure for each chain, and within each chain a figure for each Uniswap version (V1, V2, V3, V4 and a small "Auctions" line) | Yes, the `Ethereum` entry |

So Ethereum's volume for a day is the **sum of its version figures**. The
script below does that addition for you.

**Metric.** DefiLlama-reported daily Uniswap DEX volume on Ethereum, in USD per
day. It is not the number of trades, transactions, wallets or people. A rise
could come from larger swaps, higher token prices, automated trading, changes
in DefiLlama's coverage, or more trading.

**The script.** [`W6.2-free-public-data.py`](https://blockchain-ntu-sg.github.io/academy-handbook/files/researcher/W6.2-free-public-data.py)
uses only Python's standard library, so there is nothing to install beyond
Python 3. Open the link, save the file into an empty folder (in most browsers,
right-click the link and choose "Save link as"), and run it from there. It writes three
files into that folder:

- `uniswap_ethereum_90days.csv`: 90 rows with `day_utc` and `volume_usd`;
- `W6.2-source-snapshot.json`: the saved Ethereum breakdown for each of those
  days (every version figure, plus `ethereum_total_usd`, their sum), with the
  source URL and retrieval time;
- `W6.2-data-provenance.txt`: source, retrieval time, UTC window and scope.

The script stops with an error, rather than guessing, if any of the 90 days is
missing or has no Ethereum figure.

### Just enough SQL

SQL is how you ask a table a question. DuckDB can read a CSV file directly, so
the file name works as a table name.

| Piece | What it does | Example |
|---|---|---|
| `SELECT … FROM` | Choose columns from a table | `SELECT day_utc, volume_usd FROM uni` |
| `WHERE` | Keep only rows that match | `WHERE volume_usd > 1000000000` |
| `COUNT`, `MIN`, `MAX`, `AVG` | Summarise many rows into one number | `AVG(volume_usd)` |
| `CASE WHEN … THEN … END` | Label each row by a rule you choose | `CASE WHEN day_utc <= DATE '2026-08-21' THEN 'first 30' END` |
| `GROUP BY` | Summarise each label separately | `GROUP BY period` |

Dates are written as `DATE 'YYYY-MM-DD'`. `<=` and `>=` include the boundary
day, which matters when you need exactly 30 days in a group.

### Worked example: load the CSV and ask one question

Open [shell.duckdb.org](https://shell.duckdb.org/) in Chrome, Firefox or
Safari. It is a DuckDB command line running inside the page. Your file is read
by the browser and is not uploaded anywhere.

Type this and press Enter. A file picker opens; choose your CSV:

```sql
.files add
```

The shell replies `Registered: uniswap_ethereum_90days.csv`. Now save it as a
table called `uni`, so later queries are shorter:

```sql
CREATE TABLE uni AS SELECT * FROM 'uniswap_ethereum_90days.csv';
```

DuckDB works out the column types by itself: `day_utc` becomes a `DATE` and
`volume_usd` a number. You can confirm that with `DESCRIBE uni;`.

Here is a question that is **not** the one you will answer in the task: is
Uniswap busier on weekdays or at weekends? `dayofweek` returns 0 for Sunday and
6 for Saturday, so `CASE WHEN` can label every row, and `GROUP BY` averages
each label separately:

```sql
SELECT CASE WHEN dayofweek(day_utc) IN (0, 6) THEN 'weekend' ELSE 'weekday' END AS kind_of_day,
       COUNT(*) AS days,
       ROUND(AVG(volume_usd)) AS mean_usd
FROM uni
GROUP BY kind_of_day
ORDER BY kind_of_day;
```

On data retrieved on 21 October 2026 (window 23 July to 20 October 2026), the
result was:

```text
┌─────────────┬───────┬─────────────┐
│ kind_of_day │ days  │  mean_usd   │
│   varchar   │ int64 │   double    │
├─────────────┼───────┼─────────────┤
│ weekday     │ 64    │ 857049332.0 │
│ weekend     │ 26    │ 433605518.0 │
└─────────────┴───────┴─────────────┘
```

So in that window, an average weekend day carried about half the reported
volume of an average weekday. Notice what the sentence does not say: it says
nothing about how many people traded. Your numbers will differ, because your
90 days end yesterday.

The `days` column is a check worth keeping in every grouped query: 64 + 26 =
90, so no row was lost or counted twice.

### What can mislead you?

| Distortion | Risk | Check |
|---|---|---|
| Unfinished day | Today's volume looks too low | The window ends yesterday UTC |
| Wrong chain | An all-chain total read as Ethereum | Spot-check two days against the snapshot's Ethereum entry |
| Missing days | An empty date treated as zero | `COUNT(*)` and `COUNT(DISTINCT day_utc)` both return 90 |
| Off-by-one windows | 29 or 31 days in a "30-day" group | The `days` column of your grouped query |
| Large trades or price moves | More dollars without more users | Part 3 checks the median and the busiest days |
| Provider revisions | Old daily figures change later | Keep the dated snapshot |

## Hands-on task

Answer: **did Uniswap's reported daily Ethereum DEX volume, in USD, rise over
the last 90 complete UTC days?**

1. **Collect the data.** Install Python 3 if you need to. In the folder where
   you saved the script, run `python3 W6.2-free-public-data.py` (on Windows,
   `python W6.2-free-public-data.py`). If it stops with an error, record the
   error. Do not invent numbers.
2. **Check the data in SQL.** Load the CSV into the DuckDB shell as in the
   worked example. Write one query that returns the number of rows, the
   number of distinct dates, the first and last date, and the smallest
   `volume_usd`. You should see 90, 90, a last date of yesterday UTC, and no
   negative volume.
3. **Spot-check two dates.** Write a `WHERE` query that returns the CSV values
   for two dates you choose. Find the same dates in
   `W6.2-source-snapshot.json` and compare with `ethereum_total_usd`. For one
   of the two, add up the version figures under `Ethereum` yourself and confirm
   they give the same total, allowing for rounding to the cent.
4. **Compare the first and last 30 days.** Write one query using `CASE WHEN`,
   `GROUP BY`, `COUNT` and `AVG` that labels every row as first 30, middle 30
   or last 30 and returns the number of days and the mean volume for each.
   Work out the boundary dates from your own first and last date. Every group
   must show 30 days. Then calculate
   `(last-30 mean ÷ first-30 mean − 1) × 100%`, in SQL or by hand. If the
   first-30 mean is zero, the percentage is undefined.
5. **Chart and cross-check.** Open the CSV in LibreOffice Calc (or any free
   spreadsheet). Make a line chart of `day_utc` against `volume_usd`, titled
   "Uniswap · Ethereum · reported daily DEX volume (USD)", with the date range
   and source. With the header in row 1, `=AVERAGE(B2:B31)` and
   `=AVERAGE(B62:B91)` should match your SQL means. If they do not, find out
   why before going on.
6. **Write a finding (about 90 words).** Give the two means, the percentage
   change, the UTC window and the retrieval time, and say whether reported USD
   volume rose. Offer two other explanations for the change, and one sentence
   on what this data cannot tell you about traders or users.

**Out of scope:** decoding individual swaps, counting unique users, spotting
bots, forecasting prices, and drawing all-chain conclusions from Ethereum
alone.

## Evidence required

- The three files the script produced, or the error it gave.
- Your SQL for steps 2, 3 and 4, each with the output it returned.
- Your two spot-check dates, with the snapshot figures you compared and your
  hand addition for one of them.
- The labelled chart, the percentage change with its working, and your
  finding.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

Your work is complete when:

- [ ] it uses only free tools, with no account or API key;
- [ ] the metric is described as Uniswap Ethereum USD volume, not trades or users;
- [ ] your check query shows 90 rows and 90 distinct dates ending yesterday UTC;
- [ ] two spot-checked dates match the snapshot's Ethereum total;
- [ ] your grouped query shows 30 days in each group, and its means match the spreadsheet;
- [ ] the percentage change is calculated correctly from the two means;
- [ ] the finding names the source, window and retrieval time, and stays within what volume can show.

::: details Further exploration — optional, not assessed
- Run the same API URL in your browser and find one day in `totalDataChart`.
  Compare it with that day's Ethereum total. Why is it larger?
- Find the five busiest days with `ORDER BY volume_usd DESC LIMIT 5`. Do they
  cluster? Look for news from those dates.
- Rewrite your step 4 query so the boundary dates come from `MIN(day_utc)` and
  `MAX(day_utc)` instead of being typed in, so it still works when you rerun
  the script next week.
- Prefer a terminal? The free DuckDB command-line program runs the same SQL
  on the same file, without `.files add`.
:::

::: details Sources and attribution
- [DefiLlama — Public API documentation](https://api-docs.defillama.com/) — Link, referenced only
- [DefiLlama — Uniswap DEX volume endpoint](https://api.llama.fi/summary/dexs/uniswap?dataType=dailyVolume&excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false) — Link, live data source; figures change over time
- [DefiLlama — Data methodology](https://docs.llama.fi/) — Link, referenced only
- [DuckDB — Web shell](https://shell.duckdb.org/) — Link, the free SQL tool used in this Part
- [DuckDB — SQL introduction](https://duckdb.org/docs/stable/sql/introduction) — Link, referenced only
- [DuckDB — Reading CSV files](https://duckdb.org/docs/stable/data/csv/overview) — Link, referenced only
- [LibreOffice — Calc documentation](https://books.libreoffice.org/en/) — Link, referenced only
:::
