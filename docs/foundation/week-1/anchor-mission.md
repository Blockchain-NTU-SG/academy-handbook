---
week: 1
title: "Your first on-chain interaction"
points: 100
status: drafting
owner: "Director of Education"
---

# Week 1 — Anchor Mission

<Badge type="tip" text="100 points" /> <Badge type="info" text="Testnet only" /> <Badge type="warning" text="No deadline" />

::: danger Testnet only — and never share your keys
This mission uses free Sepolia test assets with no monetary value. **Never use
real funds.** Never share your recovery phrase or private key with anyone,
including reviewers.
:::

## What you're doing

Sending one transaction on the Sepolia test network, and explaining in your own
words what actually happened when you did.

::: important The transaction takes two minutes. The explanation is the mission.
Week 1 argued that a blockchain is a shared record changed by signed, verified,
agreed-upon instructions. That is easy to nod along to and hard to actually hold
until you have made one yourself and found it on a public explorer that has
never heard of you.

We are checking that you can connect a real thing you did to the ideas behind
it — because everything in Weeks 2 through 8 assumes that connection is in place.
:::

## What to submit

Complete [Part 7](./part-7-your-first-transaction.md) first.

### Evidence — three items

::: steps
1. **Your wallet address** — the `0x` address you used

2. **Your transaction hash** — the `0x` hash from step 6

3. **Your Sepolia Etherscan link** — `https://sepolia.etherscan.io/tx/0x…`

   Open it before submitting and confirm it loads.
:::

### Three short questions

**Q1 — What happened?** *(3–5 sentences)*

From pressing Confirm to the transaction appearing on Etherscan. In your own
words — do not paste the explorer output.

**Q2 — What did you check before confirming?** *(3–4 bullets)*

**Q3 — Why do we need consensus?** *(2–3 sentences)*

Every node can check whether your transaction was *valid* on its own. What does
consensus add on top of that?

::: tip Expected length
**Roughly 150–250 words**, plus the three evidence items. This is a check that
you did it and understood it — not an essay.

Optional: up to eight image or PDF uploads. Items 1–3 are the evidence, so
screenshots are welcome but not required.
:::

## Submission checklist

Tick these before submitting. Reviewers check the same list.

- [ ] Wallet address, transaction hash and explorer link are all included
- [ ] The explorer link opens and shows a **Sepolia** transaction with status Success
- [ ] The address in item 1 matches the From address on the explorer page
- [ ] Q1, Q2 and Q3 are written in my own words
- [ ] Q2 lists at least three things I actually checked
- [ ] If I used AI, I can explain what it produced and why I agree with it
- [ ] **I have not included my recovery phrase or private key anywhere**

:::: details For reviewers — what "completed" looks like
A two-outcome check. Two or three minutes. You are verifying that a real
transaction happened and that the member understands it — **not grading the
writing**.

**A completed submission has:**

| Item | Standard |
|---|---|
| 1–3 | A working explorer link to a **successful Sepolia transaction**, where the From address matches the submitted address |
| Q1 | Describes the *process* — wallet signed, broadcast, network verified, included in a block, visible on the explorer — rather than restating the explorer fields |
| Q2 | Names real checks — network, recipient, amount, and what the wallet was asking them to authorise |
| Q3 | Reaches the real distinction: everyone can check validity independently, but the network still needs a way to agree on **one shared history**. Without it, participants diverge and double-spending becomes possible |

**Send it back if:** the link is broken, points to mainnet, or shows a different
address; Q1 is a paste of explorer fields; Q3 restates *validity* rather than
explaining what consensus adds; or the writing is clearly copied.

**Do not send it back for:** short answers that are correct, imperfect English,
an unpolished writing style, or using AI to help draft something the member
clearly understands.

::: danger If a recovery phrase or private key appears in a submission
Reject immediately. Tell the member the wallet is compromised and to create a
fresh one and resubmit. **Do not repeat the phrase in your feedback.**
:::
::::

## If this gets rejected

::: tip Rejection means resubmit — it is not a fail
It does not affect your points once completed. There is no deadline and no
penalty for taking longer. You will be told exactly what is missing. Fix that
one thing and send it again, as many times as you need.
:::

The three most common rejections at Week 1:

| What happened | The fix |
|---|---|
| The link points to mainnet instead of Sepolia | Re-check the network in your wallet and resend |
| Q1 restates the explorer instead of explaining the process | Describe what *happened*, in order, not what the fields say |
| Q3 answers "how do we know it was valid" instead of "why do we need agreement at all" | [Part 3](./part-3-consensus.md), first section |

All three are quick fixes. If you are stuck on the transaction itself rather
than the writing — a faucet not working is the usual culprit — ask in the
Telegram group. That is what it is for.
