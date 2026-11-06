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
including someone reviewing your work.
:::

## What you're doing

Sending one transaction on the Sepolia test network, and explaining in your own
words what actually happened when you did.

::: important The transaction takes two minutes. The explanation is the mission.
Week 1 argued that a blockchain is a shared record changed by signed, verified,
agreed-upon instructions. That is easy to nod along to and hard to actually hold
until you have made one yourself and found it on a public explorer that has
never heard of you.

The goal is to connect a real action you took to the ideas behind it. Later
Foundation and Deep Dive work builds on that connection.
:::

## What to submit

Complete [Part 7](./part-7-your-first-transaction.md) first.

### Evidence — three items

::: steps
1. **Your sender address (Account 1)** — the `From` address used for the transaction

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

Optional: screenshots are welcome but not required. Items 1–3 are the evidence.
:::

## Submission checklist

Tick these items before submitting. Academy reviewers use the same criteria.

Reviewers compare each item with the submitted evidence.

- [ ] Sender address (Account 1), transaction hash and explorer link are all included
- [ ] The explorer link opens and shows a **Sepolia** transaction with status Success
- [ ] The address in item 1 matches the From address on the explorer page
- [ ] Q1, Q2 and Q3 are written in my own words
- [ ] Q2 lists at least three things I actually checked
- [ ] If I used AI, I can explain what it produced and why I agree with it
- [ ] **I have not included my recovery phrase or private key anywhere**

:::: details For reviewers: what Complete looks like
This is a two-outcome check. Verify that a real transaction happened and that
the learner understands it; **do not grade writing style**.

**Complete means:**

| Item | Standard |
|---|---|
| 1–3 | A working explorer link to a **successful Sepolia transaction**, where the From address matches the submitted sender address (Account 1) |
| Q1 | Describes the *process* — wallet signed, broadcast, network verified, included in a block, visible on the explorer — rather than restating the explorer fields |
| Q2 | Names real checks — network, recipient, amount, and what the wallet was asking them to authorise |
| Q3 | Reaches the real distinction: everyone can check validity independently, but the network still needs a way to agree on **one shared history**. Without it, participants diverge and double-spending becomes possible |

**Return for revision if:** the link is broken, points to mainnet,
or shows a different address; Q1 is a paste of explorer fields; Q3 restates
*validity* rather than explaining what consensus adds; or the writing is copied.

**Do not return for revision for:** short but correct answers,
imperfect English, an unpolished writing style, or AI assistance you understand.

::: danger If a recovery phrase or private key appears in a submission
Do not share the evidence. Treat the wallet as compromised and use a fresh
wallet for future testnet work. **Do not repeat the phrase in notes or feedback.**
:::
::::

## If a reviewer requests revision

::: tip Revise means fix and resubmit, not fail
Use the feedback and table below to address the missing criterion, then
resubmit through the Academy workflow. There is no deadline.
:::

Common gaps at Week 1:

| What happened | The fix |
|---|---|
| The link points to mainnet instead of Sepolia | Re-check the network in your wallet and resend |
| Q1 restates the explorer instead of explaining the process | Describe what *happened*, in order, not what the fields say |
| Q3 answers "how do we know it was valid" instead of "why do we need agreement at all" | [Part 3](./part-3-consensus.md), first section |

These are usually quick fixes. If a faucet is unavailable, use another listed
faucet or return later. Do not pay for test ETH.
