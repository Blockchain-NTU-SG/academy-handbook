---
week: 2
title: "Read your own transaction, and compare two chains"
points: 100
status: drafting
owner: "Director of Education"
---

# Week 2 — Anchor Mission

<Badge type="tip" text="100 points" /> <Badge type="info" text="No new on-chain activity" /> <Badge type="warning" text="No deadline" />

::: tip Nothing new to send
This mission reuses the Sepolia transaction you made in Week 1. No wallet work,
no real funds, no mainnet.
:::

## What you're doing

Three short pieces: read your own Week 1 transaction properly, compare Ethereum
with one other blockchain on three trade-offs, and answer one question about
bridges.

::: important Week 1 was about doing. Week 2 is about reading.
In Week 1 you sent a transaction and explained what happened. You now know
considerably more — what gas actually pays for, why blockchains differ, what
"settled" means. Going back to the same transaction with better eyes is the
fastest way to feel that you learned something.

The comparison is a skill that remains useful beyond this curriculum. Chains you have never
heard of will launch every month. Being able to say what one traded away, and
for what, is how you evaluate any of them.
:::

## What to submit

::: steps
1. **Read your own transaction**

   Open your Week 1 transaction on [Sepolia Etherscan](https://sepolia.etherscan.io)
   and report six fields: **From**, **To**, **Network**, **Status**,
   **Gas Used**, **Transaction Fee**.

   Then, in **1–2 sentences**: what does gas measure?

2. **Compare Ethereum with one other chain**

   Choose **one** of: Bitcoin, Solana, a Cosmos chain, or Avalanche. Compare it
   with Ethereum on **exactly three** dimensions, as a short table:

   > finality · throughput · security participation · decentralisation ·
   > execution model · ecosystem

   Then, in **3–4 sentences**: what did your chosen chain gain, and what
   trade-off did it accept?

3. **Why do bridges exist?**

   In **2–3 sentences**: why can one blockchain not automatically know what
   happened on another blockchain?
:::

::: warning Item 2 asks for a trade-off, not a winner
"Chain X is better than Ethereum" is not an answer to that question.
:::

::: tip Expected length
**Roughly 250–350 words including the table.** No new on-chain activity, no
essay. Add an image only if it helps show your evidence.
:::

## Submission checklist

Tick these items before submitting. Academy reviewers use the same criteria.

- [ ] All six transaction fields in item 1 are reported
- [ ] I explained what my gas number represents, in my own words
- [ ] I named which blockchain I chose for item 2
- [ ] I compared it with Ethereum on **three** dimensions
- [ ] I stated what my chosen chain gave up **and** what it gained
- [ ] I answered the bridge question in my own words
- [ ] If I used AI, I can explain what it produced and why I agree with it
- [ ] I have not included my recovery phrase or private key anywhere

:::: details For reviewers: what Complete looks like
Check the reasoning, **not prose quality**, and do not require the learner to
choose the comparison you would have chosen.

| Item | Standard |
|---|---|
| **1** | All six fields, matching your real Sepolia transaction. The gas explanation should convey that gas measures *computational or execution work*, and that the fee is the monetary cost of that gas. Observing that more complex operations generally consume more gas is useful, but it is not required for completion |
| **2** | Three genuine dimensions, with a stated trade-off in **both** directions |
| **3** | Reaches the actual reason: **blockchains cannot see each other**. Each network only knows its own state, so there is no native way for one to observe or verify what happened on another. A bridge or cross-chain messaging mechanism provides or verifies evidence from one chain so another chain can act on it |

**Acceptable trade-offs for item 2** — any defensible answer counts, including
ones not listed here:

- Solana's high performance requiring more validator hardware and bandwidth, which can reduce validator accessibility
- Bitcoin's simplicity costing programmability
- Cosmos's sovereignty costing shared security
- Avalanche-style configurable or sovereign network design can give application teams more control over execution and network parameters, but they must define and sustain their own validator/security setup rather than automatically inheriting another network's full security

**Item 3 extra credit** — not required — for noting that this is why bridging
adds a trust assumption.

**Return for revision if:** transaction fields are missing or do not match a real
transaction; item 2 names a winner instead of a trade-off, or compares fewer
than three dimensions; item 3 describes lock-and-mint mechanics without
explaining why the problem exists; or the writing is clearly copied.

**Do not return for revision for:** choosing an unusual chain, a
defensible comparison another person might disagree with, a short correct
answer, or imperfect English.

::: danger If a recovery phrase or private key appears
Do not share the evidence. Treat the wallet as compromised and use a fresh
wallet for future testnet work. **Do not repeat the phrase in notes or feedback.**
:::
::::

## If a reviewer requests revision

::: tip Revise means fix and resubmit, not fail
Use the feedback and table below to address the missing criterion, then
resubmit through the Academy workflow. There is no deadline.
:::

Common gaps at Week 2:

| What happened | The fix |
|---|---|
| Item 2 names a winner. "Solana is faster and therefore better" is not a trade-off | What did the speed cost? [Part 2](./part-2-comparing-blockchains.md) has the answer for all five chains |
| Item 3 explains *how* a bridge works instead of *why* one is needed | The question is about the problem, not the mechanism. [Part 5](./part-5-l1-l2-and-bridges.md), opening two paragraphs |
| The gas explanation says gas is "the fee" | Gas measures *work*; the fee is what that work costs. [Part 4](./part-4-transactions-and-gas.md) separates them |

All three are quick fixes. Recheck the linked Part if you are unsure, and keep
any remaining uncertainty explicit in your answer.
