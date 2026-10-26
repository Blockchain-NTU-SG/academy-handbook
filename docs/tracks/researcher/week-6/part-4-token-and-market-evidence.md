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

**Market capitalisation (market cap)** is a token's quoted price multiplied
by a provider's reported circulating supply. It is an estimate of market
value, not cash held by the protocol.

## The hard skill

**Choose a defensible valuation denominator and interpret relative value
alongside token structure, executable liquidity and competing explanations.**

This is economic research methodology. No trade, wallet connection, price
target, portfolio decision or real-money activity is required.

A **decentralised exchange (DEX)** lets users trade through protocol
mechanisms rather than a conventional order-matching company. An **automated
market maker (AMM)** is one DEX design; **liquidity providers (LPs)** supply
assets to its pools. The exact mechanism matters when deciding what a volume,
fee or liquidity number represents.

## Core / reference material

### Eight lenses, selected by the question

| Lens | What you are asking | Useful evidence | Common mistake |
|---|---|---|---|
| **Fundamentals** | What does it do, who uses it, what activity is charged for, and who receives the fees? | Protocol docs, activity, fees and retained revenue under stated definitions | Treating usage or total value locked (TVL)—assets a provider counts as deposited—as revenue |
| **Flows** | What capital, tokens or liquidity entered or left, and where did it go? | Dated bridge flows, issuance/redemption, treasury or exchange movements and liquidity changes | Treating a transfer or unlock as organic demand or a sale |
| **Valuation** | Does the chosen value measure match the economic denominator and period? | Comparable market value, supply basis, fee/revenue definitions and time window | Dividing by TVL or volume as if either were retained earnings |
| **Tokenomics** | How are supply, utility, security, governance and holder rights connected? | Token contracts, protocol terms, fee destinations and enforceable rights | Assuming governance power creates a claim on cash flow |
| **Unlocks** | Who receives newly transferable tokens, when, and relative to float and liquidity? An unlock is the end of a transfer restriction, not proof of a sale. | Dated vesting schedule, recipient, circulating-supply method and market depth | Treating every unlocked token as immediately sold or fully liquid |
| **Catalysts** | What observable change could alter use, cost, value capture or risk? | A defined before/after measure and a dated launch or parameter change | Treating an announcement as evidence that the change worked |
| **Risks** | Which failure could break the thesis, who is exposed, and what signal would show it? | Dependency, permissions, liquidity, oracle and incident evidence | Listing generic risks without a causal path or exposed party |
| **Narrative** | What story attracts attention, and what evidence supports it? | Dated communications, attention measures and independently checked outcomes | Treating attention or a compelling story as economic proof |

Not every question needs all eight. Use them as lenses, not a checklist or
score: begin with fundamentals and flows, test whether token holders connect
to the economics, choose a matching valuation, then consider catalysts, risks
and narrative. Attention is not automatically a catalyst for improved
fundamentals, and a catalyst is not an instruction to buy.

### Supply is not executable liquidity

The common supply-based valuation relationships use **fully diluted
valuation (FDV)** as one possible supply basis:

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

The **numerator** is the value being compared; the **denominator** is the
economic quantity chosen as its reference. A multiple says how many units of
valuation correspond to one unit of that measure. For example, a market cap
of 100 million currency units divided by comparable annual retained revenue
of 10 million units gives **10×**: ten units of valuation per unit of annual
revenue. The currency, period and definitions must match. Market cap and FDV
answer different supply questions; neither is universally correct. TVL,
fees, revenue, earnings and economic volume are not interchangeable. A
**premium** means a higher multiple than a defined comparison set; a
**discount** means a lower one. Neither label alone means expensive or cheap.

| Candidate | What it can help compare | Main boundary |
|---|---|---|
| Total value locked (TVL) | Deposited capital under a consistent methodology | Not revenue; price effects and double-counting can inflate it |
| Fees | User charges under a stated definition | Much may go to suppliers/LPs |
| Revenue | Retained/distributed economics after supplier payments | Define recipient and provider convention |
| Earnings / holder accrual | Net economics after specified costs, or actual holder distributions | Not interchangeable; governance can change rights and costs may be omitted |
| Economic volume / sector metric | Useful activity for comparable business models | Incentivised or wash-like flow can inflate activity |

Use comparable mechanisms, fee recipients, token rights, dates and definitions.
Do not compare a rollup's transaction fees with a DEX's trading volume as if
they were the same revenue. Trailing 12 months and annualised last month can
tell different stories; label extrapolation and avoid seasonal distortion.

### Worked example: eight lenses on one fictional protocol

Fictional AMM Alder reports **$20m** in annual user fees, pays **$8m** to
liquidity providers, and retains **$12m**. With a **$120m market cap**, its
market-cap-to-retained-revenue multiple is $120m ÷ $12m = **10×**. Comparable
fictional Birch is $180m ÷ $12m = **15×**, so Alder is one-third below that
reference multiple—not automatically cheap. Alder has no holder distribution,
a 15% circulating-supply unlock due in three months, and shallow quotes for a
$100,000 sale. Its announced chain integration is a catalyst to test, not
proof of growth; “AI-powered” attention is narrative, not economic evidence.
The flows and retained revenue look measurable, but holder rights and market
depth remain limits. A bounded next question is whether the integration
produces sustained retained revenue without weakening liquidity. Check fee
definitions, unlock recipients and post-launch usage; use counter-evidence to
bound confidence.

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
