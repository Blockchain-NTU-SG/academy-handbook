---
track: researcher
week: 6
day: 4
title: "Token, liquidity and valuation evidence"
status: drafting
owner: "Education Team"
reading_time: "40 min"
points: 100
sources:
  - name: "CoinGecko — Supply methodology"
    url: "https://support.coingecko.com/articles/6758974979-coingecko-supply-methodology"
    label: "Link"
  - name: "CoinGecko — FDV"
    url: "https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto"
    label: "Link"
  - name: "DefiLlama — Data definitions"
    url: "https://docs.llama.fi/analysts/data-definitions"
    label: "Link"
  - name: "Uniswap — Price impact"
    url: "https://support.uniswap.org/hc/en-us/articles/8671539602317-What-is-price-impact"
    label: "Link"
  - name: "Etherscan — Token pages"
    url: "https://info.etherscan.com/understanding-token-page/"
    label: "Link"
  - name: "Arkham — Token pages"
    url: "https://codex.arkm.com/the-intelligence-platform/token-pages"
    label: "Link"
---

<!-- Original synthetic data, not live valuations or recommendations.
No reviewer solution is published here. Existing route retained. -->

# Week 6 · Part 4 — Token, liquidity and valuation evidence

> **Core question — what makes a valuation comparison meaningful, and what could explain an apparent discount?**

A low multiple can mean overlooked economics, weak value capture, low float,
fragile liquidity or simply an invalid comparison. Use the supply model from
W5.5, the investigation discipline from Part 2 and measurement discipline from
Part 3 to decide what a number means before making a claim.

## The hard skill

**Choose a defensible valuation denominator and interpret relative value
alongside token structure, executable liquidity and competing explanations.**

This is economic research methodology. No trade, wallet connection, price
target, portfolio decision or real-money activity is required.

## Core / reference material

### Eight lenses, selected by the question

| Lens | Research question |
|---|---|
| Fundamentals | What does the protocol do? Which activity creates economic value, what does it charge, and who receives it? |
| Flows | What actually moved, from whom, and with what attribution limits? |
| Valuation | Which numerator and denominator fit the economics and period? |
| Tokenomics | Does ownership have a credible path to protocol economics? |
| Unlocks | Who gains transferable supply, and under what incentives? Unlock ≠ sale. |
| Catalysts | Which observable change could alter usage, costs, value capture or risk? |
| Risks | What dependency could invalidate the result or stop value reaching holders? |
| Narrative | What attracts attention, and is that supported by fundamentals? |

Not every question needs all eight. This framework organises evidence; it
does not produce a buy/sell score. Attention is not automatically a catalyst
for improved fundamentals, and a catalyst is not an instruction to buy.

### Supply is not executable liquidity

The common supply-based valuation relationships are:

$$
\text{Market Cap} = P\times S_{\text{circ}}
\qquad\qquad
\text{FDV} = P\times S_{\text{max}}
$$

$P$ is the token's stated price in a chosen currency (for example, USD per
token); $S_{\text{circ}}$ is reported circulating supply, and $S_{\text{max}}$
is maximum supply, both in token units. The products are therefore in the
chosen currency. For this lesson FDV uses maximum supply; report a provider's
different convention if it uses another supply base. Market cap asks about
current reported circulation; FDV asks about a specified broader supply base
at today's marginal price. Neither is always the correct numerator or the cash
needed to buy all tokens.

**Estimated real float** is your assumption about supply plausibly tradable
soon after specified adjustments, not a universal standard. Avoid double
subtracting allocations. Top-holder **addresses** can represent exchanges,
bridges, LPs or many users; independence must be justified, not assumed.
Use Part 2's hypothesis standard.

Executable liquidity asks what a stated-size trade could get now: quote size,
direction, venue, fees and time matter. Daily volume is turnover, not depth.
[W5.3](../week-5/part-3-mechanism-and-market-design.md) owns the AMM calculation;
here we interpret quotes rather than repeat its algebra.

### Choosing the denominator is the work

When comparing valuation with an economic measure, use:

$$
\text{Multiple} =
\frac{\text{Valuation}}{\text{Chosen Economic Denominator}}
$$

The numerator and denominator must match the research question, currency,
period and convention. For example, a USD market value divided by comparable
USD retained revenue for the same stated period gives a valuation-to-revenue
multiple. Market cap and FDV answer different supply questions; neither is
universally correct. TVL, fees, revenue, earnings and economic volume are not
interchangeable. An apparent discount is a question to investigate, not
automatically an opportunity.

| Candidate | What it can help compare | Main boundary |
|---|---|---|
| TVL | Deposited capital under a consistent methodology | Not revenue; price effects and double-counting can inflate it |
| Fees | User charges under a stated definition | Much may go to suppliers/LPs |
| Revenue | Retained/distributed economics after supplier payments | Define recipient and provider convention |
| Earnings / holder accrual | Net economics after specified costs, or actual holder distributions | Not interchangeable; governance can change rights and costs may be omitted |
| Economic volume / sector metric | Useful activity for comparable business models | Incentivised or wash-like flow can inflate activity |

Use comparable mechanisms, fee recipients, token rights, dates and definitions.
Do not compare a rollup's transaction fees with a DEX's trading volume as if
they were the same revenue. Trailing 12 months and annualised last month can
tell different stories; label extrapolation and avoid seasonal distortion.

### Worked example: explaining a multiple

Synthetic peer P has $120m market cap and $12m comparable trailing-year
retained revenue: **10×**. Peer Q has $180m and $12m: **15×**. Two-point mean
and median are both 12.5×; P is 20% below that reference. That is arithmetic,
not proof of undervaluation. Perhaps Q has stronger sustainable growth; perhaps
P's token lacks a credible revenue claim. Check the rights and quality of the
denominator before choosing between those explanations.

An outlier is a question. A premium/discount needs an explanation, evidence
that could falsify it, and a confidence boundary.

## Hands-on task

Use this **synthetic snapshot dated 26 October 2026**. All three fictional
protocols are comparable spot AMMs on Case-L1, with the same trailing-year
definitions and no cross-listed revenue. Values in $m unless stated.

| Protocol | Market cap | FDV | TVL | User fees | Retained revenue after LP payments |
|---|---:|---:|---:|---:|---:|
| ORBIT | 410 | 1,000 | 600 | 60 | 12 |
| LANE | 300 | 400 | 450 | 40 | 10 |
| MESH | 240 | 480 | 500 | 50 | 8 |

ORBIT's token is $0.50: 820m circulating / 2,000m maximum tokens.
Within reported circulation, 220m strategic tokens and a separate 100m in
delayed withdrawals are assumed unavailable soon. Five addresses hold 200m
of the remainder; common control is unverified. The next 100m unlock is
assumed fully tradable. ORBIT has no direct holder distribution; holders vote
on treasury spending. Comparable rights for LANE/MESH are **unknown**.

A fictional quote snapshot for selling $100,000 worth at the marginal price
returns $91,000 for ORBIT, $98,000 for LANE and $97,000 for MESH, net of fees.
These quotes are not live execution guarantees.

Produce **one calculation/interpretation table**:

1. Choose and defend a denominator from the table. Compute market-cap multiples
   for all three and their mean/median. Identify one apparent premium/discount.
   State whether FDV would change that comparison and why.
2. Estimate ORBIT's real float now and after the unlock, and the five addresses'
   current share of that estimate. Label assumptions; do not call them five people.
3. Give **two explanations** for the apparent valuation difference and the
   evidence needed to discriminate. Connect token rights, unlock/liquidity or
   activity quality to at least one explanation.
4. In **up to 100 words**, state the bounded conclusion, one potential
   fundamental catalyst, a plausible narrative-only explanation, and evidence
   that would invalidate your conclusion. An unknown rights comparison can
   justify withholding a value judgment.

**Out of scope:** price targets, position sizing, trade recommendations,
repeating constant-product maths or pretending these are real protocols.

## Evidence required

- One table containing calculations, assumptions and competing explanations.
- The short conclusion with a next evidence check; no separate investment report.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns full points;
incomplete or materially incorrect work is returned for revision. There is no
partial-score rubric or separate weekly submission.

Complete means a justified denominator, reproducible relative calculations,
labelled float/concentration assumptions, two explanations with discriminating
evidence, and a conclusion that respects unknown rights and liquidity.
A premium is not automatically expensive; a discount is not automatically an opportunity.

::: details Further Exploration — optional, not assessed
Compare a real protocol's fee and revenue definitions across its docs and a
data provider. Date your observations and explain differences before comparing
multiples. A quote may be inspected read-only; do not connect or trade.
:::

::: details Sources and attribution
- [CoinGecko — Supply methodology](https://support.coingecko.com/articles/6758974979-coingecko-supply-methodology) and [FDV](https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto) — Link, data-provider definitions
- [DefiLlama — Data definitions](https://docs.llama.fi/analysts/data-definitions) — Link, independent provider methodology; checked 26 October 2026
- [Uniswap — Price impact](https://support.uniswap.org/hc/en-us/articles/8671539602317-What-is-price-impact) — Link, protocol/tool reference
- [Etherscan — Token pages](https://info.etherscan.com/understanding-token-page/) — Link, explorer evidence and labels
- [Arkham — Token pages](https://codex.arkm.com/the-intelligence-platform/token-pages) — Link, commercial intelligence provider; optional reference, not required access
- Peer table, quote snapshot and comparison method — original Academy teaching example
:::
