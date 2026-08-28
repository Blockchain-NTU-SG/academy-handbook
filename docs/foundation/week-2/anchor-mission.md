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

The comparison is the skill that outlasts this programme. Chains you have never
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

   > finality · throughput · validator requirements · decentralisation ·
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
essay. Optional: up to eight image or PDF uploads.
:::

## Submission checklist

- [ ] All six transaction fields in item 1 are reported
- [ ] I explained what my gas number represents, in my own words
- [ ] I named which blockchain I chose for item 2
- [ ] I compared it with Ethereum on **three** dimensions
- [ ] I stated what my chosen chain gave up **and** what it gained
- [ ] I answered the bridge question in my own words
- [ ] If I used AI, I can explain what it produced and why I agree with it
- [ ] I have not included my recovery phrase or private key anywhere

:::: details For reviewers — what "completed" looks like
Two or three minutes. You are checking comprehension, **not prose quality**, and
not whether they picked the comparison you would have.

| Item | Standard |
|---|---|
| **1** | All six fields, matching a real Sepolia transaction from that member. The gas explanation should convey that gas measures *computational work*, and that a contract call does more work than a plain transfer. Any wording carrying that idea is fine |
| **2** | Three genuine dimensions, with a stated trade-off in **both** directions |
| **3** | Reaches the actual reason: **blockchains cannot see each other**. Each network only knows its own state, so there is no native way for one to observe or verify what happened on another. A bridge is external infrastructure that watches both |

**Acceptable trade-offs for item 2** — any defensible answer counts, including
ones not listed here:

- Solana's speed costing validator accessibility and stability
- Bitcoin's simplicity costing programmability
- Cosmos's sovereignty costing shared security
- Avalanche's configurability costing ecosystem concentration

**Item 3 extra credit** — not required — for noting that this is why bridging
adds a trust assumption.

**Send it back if:** transaction fields are missing or do not match a real
transaction; item 2 names a winner instead of a trade-off, or compares fewer
than three dimensions; item 3 describes lock-and-mint mechanics without
explaining why the problem exists; or the writing is clearly copied.

**Do not send it back for:** choosing an unusual chain, a comparison you
disagree with but which is defensible, short answers that are correct, or
imperfect English.

::: danger If a recovery phrase or private key appears
Reject immediately. Tell the member their wallet is compromised and to create a
fresh one. **Do not repeat the phrase in your feedback.**
:::
::::

## If this gets rejected

::: tip Rejection means resubmit — it is not a fail
There is no deadline and no penalty for taking longer. You will be told the one
specific thing to fix.
:::

The three most common rejections at Week 2:

| What happened | The fix |
|---|---|
| Item 2 names a winner. "Solana is faster and therefore better" is not a trade-off | What did the speed cost? [Part 2](./day-2-comparing-blockchains.md) has the answer for all five chains |
| Item 3 explains *how* a bridge works instead of *why* one is needed | The question is about the problem, not the mechanism. [Part 5](./day-5-l1-l2-and-bridges.md), opening two paragraphs |
| The gas explanation says gas is "the fee" | Gas measures *work*; the fee is what that work costs. [Part 4](./day-4-transactions-and-gas.md) separates them |

All three are quick fixes. Stuck on any of it, ask in the Telegram group.
