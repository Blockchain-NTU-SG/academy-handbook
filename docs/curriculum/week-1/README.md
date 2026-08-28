# Week 1 — Web3, blockchain, crypto assets and wallets

<Badge type="info" text="8 parts" /> <Badge type="tip" text="100 points" /> <Badge type="warning" text="Testnet only" />

> **Core question — why does Web3 exist, and how do blockchain assets and
> accounts actually work?**

This is where Week 0's vocabulary turns into a working mental model, and the
week you first touch a wallet. It ends with you having sent a real transaction
on a test network and being able to explain what happened.

| Part | Page | Reading |
|---|---|---|
| 1 | [Why blockchain exists](./day-1-why-blockchain-exists.md) | 12 min |
| 2 | [How shared state works](./day-2-how-shared-state-works.md) | 15 min |
| 3 | [Consensus, and how chains agree](./day-3-consensus.md) | 16 min |
| 4 | [Why anyone runs the network](./day-4-incentives.md) | 13 min |
| 5 | [What crypto assets actually are](./day-5-crypto-asset-map.md) | 15 min |
| 6 | [Wallets, accounts and keys](./day-6-wallets-and-accounts.md) | 16 min |
| 7 | [Your first transaction](./day-7-your-first-transaction.md) | 30 min hands-on |
| 8 | [How it all connects: one user journey](./day-8-the-user-journey.md) | 12 min |

**Anchor Mission:** [Week 1 mission](./anchor-mission.md) · 100 points

## The arc

Each part answers the question the previous one leaves open.

```mermaid
flowchart TD
  P1["<b>1 · Why blockchain exists</b><br/><i>what problem is this solving?</i>"]
  P2["<b>2 · How shared state works</b><br/><i>what is the record made of?</i>"]
  P3["<b>3 · Consensus</b><br/><i>who decides what gets added?</i>"]
  P4["<b>4 · Why anyone runs it</b><br/><i>who pays for all this?</i>"]
  P5["<b>5 · Crypto asset map</b><br/><i>what is being tracked?</i>"]
  P6["<b>6 · Wallets and keys</b><br/><i>how do I control any of it?</i>"]
  P7["<b>7 · Your first transaction</b><br/><i>do it for real, on testnet</i>"]
  P8["<b>8 · The user journey</b><br/><i>how does this fit together?</i>"]
  P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
```

## Before you start

::: warning Part 7 needs a wallet — but not yet
You install one **during** that page, and it will be a fresh wallet holding
testnet assets only. If you have not read
[Week 0 Part 4](../week-0/day-4-safety.md), read it before Part 6.
:::

::: details Structural note — why Week 1 has eight parts
Two deliberate splits, both to keep pages light:

**Part 3 (consensus).** The Foundation v1.2 keep-list placed blocks,
transactions, nodes, cryptography intuition, consensus intuition *and* PoW vs
PoS on a single page. Consensus and PoW/PoS were split onto their own part.

**Part 4 (incentives).** Added to answer the question consensus always raises —
*if nobody is paid a salary, why does anyone do this?* Folding it into Part 3
would have made Part 3 the heaviest page in the week, which is the problem the
first split existed to solve.

No page in this week exceeds the weight of Part 1.
:::
