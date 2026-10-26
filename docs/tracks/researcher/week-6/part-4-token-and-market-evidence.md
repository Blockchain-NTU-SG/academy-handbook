---
track: researcher
week: 6
day: 4
title: "Token and market evidence"
status: drafting
owner: "Education Team"
reading_time: "40 min"
points: 100
sources:
  - name: "CoinGecko — Supply methodology"
    url: "https://support.coingecko.com/articles/6758974979-coingecko-supply-methodology"
    label: "Link"
  - name: "CoinGecko — What is fully diluted valuation (FDV)?"
    url: "https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto"
    label: "Link"
  - name: "Uniswap — What is price impact?"
    url: "https://support.uniswap.org/hc/en-us/articles/8671539602317-What-is-price-impact"
    label: "Link"
  - name: "Etherscan — Understanding the token page"
    url: "https://info.etherscan.com/understanding-token-page/"
    label: "Link"
  - name: "Arkham — Token pages, holders and entities"
    url: "https://codex.arkm.com/the-intelligence-platform/token-pages"
    label: "Link"
---

<!--
Author note (Education team): PIX and ORBIT are made-up tokens; ORBIT
continues the supply example from Week 5 Part 5. Every figure was recalculated
on 21 October 2026. The model answer is kept outside the public handbook.
-->

# Week 6 · Part 4 — Token and market evidence

> **Core question — how much of a token can actually be traded, by whom, and
> at what price, compared with what its headline valuation suggests?**

A token page shows a market cap, a fully diluted valuation and a daily volume.
Together they look like a description of a market. In this Part you test them:
how much supply is really tradable, how concentrated it is, and what a
realistic purchase would actually cost.

::: tip Picture a house price in a small village
If one house sells for a high price, an estate agent may value every house
in the village at that price. That does not mean all of them could be sold
tomorrow at that price.

Where the picture stops: in a token market you can see some of the "buyers'
queue" directly, in an AMM pool or an order book, so you can calculate what
a trade of a given size would cost instead of guessing.
:::

## The hard skill

**Judge a token's real float, holder concentration and executable liquidity
against its headline market cap and FDV.**

After this Part you can:

- calculate market cap, FDV and their ratio, and say what each leaves out;
- estimate a real float with stated assumptions;
- measure concentration among independent large holders;
- test what a trade of a given size would cost in a pool.

## Core / reference material

### Five terms

- **Reported circulating supply:** tokens a data provider classes as
  available to the public market. It may not equal the tokens actually on
  offer at a given moment.
- **Estimated real float:** the part of reported circulation plausibly
  tradable soon, after a clearly stated adjustment for strategic holdings and
  delayed withdrawals. This is your estimate, not a standard metric.
- **Holder concentration:** the share of supply held by the largest
  independent holders. Exchanges, bridges and liquidity pools hold tokens for
  many people, so label or remove them before treating a big address as one
  investor.
- **Liquidity:** the ability to buy or sell without moving the price much.
  Check pool reserves, order-book depth, spreads and a realistic quote. Daily
  volume alone does not guarantee it.
- **Market cap and FDV:** market cap = price × reported circulating supply.
  For this Part, FDV = price × maximum supply. When you compare real tokens,
  say which supply definition you used.

### Worked example: PIX

PIX is a made-up token trading at **$2**, with **100m** reported circulating
tokens and **500m** maximum. 20m of the circulating tokens are strategic
holdings, 10m are staked with delayed withdrawals, and five independent large
holders control 21m of the rest. Its main AMM pool holds **2m PIX and 4m
USDC**. Reported daily volume is **$3m**. Ignore swap fees, and assume no
other venue has comparable depth.

1. **Headline valuation.** Market cap = 100m × $2 = **$200m**. FDV = 500m ×
   $2 = **$1bn**. Market cap ÷ FDV = **20%**. Neither tells you how much can
   actually be traded near $2.
2. **Real float.** 100m − 20m − 10m = **70m PIX**, which is 70% of reported
   circulation. This is an estimate, not an official figure.
3. **Concentration.** Five holders own 21m ÷ 70m = **30%** of the real float.
   That is a concentration risk on the selling side. On a real token, check
   that the addresses belong to separate owners.
4. **One AMM trade.** With x = 2,000,000 PIX and y = 4,000,000 USDC,
   k = x × y = 8,000,000,000,000. A buyer adds 400,000 USDC, so y becomes
   4,400,000 and the new PIX reserve is k ÷ 4,400,000 ≈ 1,818,181.82. The
   buyer receives about **181,818.18 PIX**, at an average of $400,000 ÷
   181,818.18 ≈ **$2.20**, **10%** above the $2 starting price. This is a
   simplified model, not a live quote.
5. **Judgment.** PIX has a $200m market cap and $3m of daily volume, yet a
   $400,000 buy pays about 10% over the starting price, and five holders
   control 30% of what can trade. Past volume is not proof of depth today.

## Hands-on task

ORBIT is the made-up token from [Week 5 Part 5](../week-5/part-5-token-and-incentive-economics.md).
All amounts are in US dollars unless stated.

| Market and ownership input | Value |
|---|---|
| Price; total supply; maximum supply | $0.50; 2,000m; 2,000m ORBIT |
| Reported circulating supply | 820m ORBIT |
| Known strategic holdings; staked tokens with delayed withdrawal | 220m ORBIT; 100m ORBIT |
| Five independent large holders | 200m ORBIT, within the estimated real float |
| Main AMM pool reserves | 10m ORBIT and 5m USDC |
| Reported trading volume, past 24 hours | $4m across venues |

The strategic and delayed-withdrawal tokens are counted in reported
circulation, are separate from each other, and are not readily tradable. No
other venue has comparable depth. Ignore swap fees.

1. Calculate market cap, FDV and the market cap to FDV ratio.
2. Estimate the real float and its share of reported circulation. Then
   assume the 100m unlock from Week 5 Part 5 arrives and all of it is
   tradable: what is the real float then, and by what percentage has it
   grown?
3. Calculate the five large holders' share of today's real float.
4. A buyer adds 500,000 USDC to the pool. Using x × y = k, calculate the ORBIT
   received and the average price paid.
5. Give an overall risk judgment, and explain why the $4m daily volume is not
   enough to show the market is deep.

**Out of scope:** price predictions, trading advice, order-book modelling and
fees across several venues.

## Evidence required

- Your calculations for each step, with the assumptions you used.
- Your short judgment from step 5.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

Your work is complete when:

- [ ] market cap, FDV and their ratio are correct, and you say which supply each uses;
- [ ] the real float is labelled as your estimate, with its assumptions;
- [ ] the unlock's effect on real float is calculated;
- [ ] the concentration share uses the real float as its base;
- [ ] the AMM trade is calculated with x × y = k and compared with the starting price;
- [ ] the judgment explains why volume is not depth.

::: details Further exploration — optional, not assessed
- Pick a real token. Open its holders tab on Etherscan and label the top ten
  addresses as exchange, bridge, pool, contract or unknown. How much of the
  top-ten share is left once you remove the first four types?
- Get a real swap quote for a $10,000 and a $500,000 trade on a DEX
  aggregator. How does the price impact change?
:::

::: details Sources and attribution
- [CoinGecko — Supply methodology](https://support.coingecko.com/articles/6758974979-coingecko-supply-methodology) — Link, referenced only
- [CoinGecko — What is fully diluted valuation (FDV)?](https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto) — Link, referenced only
- [Uniswap — What is price impact?](https://support.uniswap.org/hc/en-us/articles/8671539602317-What-is-price-impact) — Link, referenced only
- [Etherscan — Understanding the token page](https://info.etherscan.com/understanding-token-page/) — Link, referenced only
- [Arkham — Token pages, holders and entities](https://codex.arkm.com/the-intelligence-platform/token-pages) — Link, referenced only
:::
