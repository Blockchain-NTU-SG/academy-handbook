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

Complete [Part 6](./day-6-your-first-transaction.md) first. Items 1–3 come
directly from it.

::: steps
1. **Your wallet address**

   The `0x` address you used — 42 characters.

2. **Your transaction hash**

   The `0x` hash — 66 characters.

3. **A link to your transaction on Sepolia Etherscan**

   The full URL, in the form `https://sepolia.etherscan.io/tx/0x…`.
   Open it before submitting and confirm it loads.

4. **What happened — 3 to 5 sentences**

   In your own words, describe what occurred from the moment you confirmed to
   the moment it appeared as settled. **Do not paste the explorer output** —
   explain it.

5. **Three identifications — one line each**

   - Which **network** did this happen on?
   - Which **asset** moved, and is it a coin or a token? One sentence on how you know.
   - **Who signed** the transaction, and what did signing actually prove?

6. **Your safety checklist — 4 to 6 bullets**

   In your own words, the practices you will follow for the rest of the
   programme. Not copied from Week 0 — yours.

7. **Why consensus is needed — 2 to 4 sentences**

   Every node can check whether your transaction was valid on its own. Explain
   what consensus adds that independent verification does not, and what would go
   wrong without it.
:::

::: tip Uploads and length
**Optional uploads:** up to eight images or PDFs. A screenshot of your confirmed
transaction is welcome but not required — items 1–3 are the evidence.

**Expected length:** roughly 400–600 words. Longer is not better.
:::

## Submission checklist

Tick these before submitting. Reviewers check the same list.

- [ ] Wallet address, transaction hash and explorer link are all included
- [ ] The explorer link opens and shows a **Sepolia** transaction with status Success
- [ ] The address in item 1 matches the From address on the explorer page
- [ ] Items 4–7 are written in my own words
- [ ] I have answered all three identifications in item 5
- [ ] My safety checklist has at least four points
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
| 4 | An explanation of the *process* — signed, broadcast, verified, included in a block, confirmed — rather than a restatement of the explorer fields |
| 5 | **Sepolia**; **ETH**, a coin/native asset, because it pays the fee and is not issued by a contract; **the member**, using their private key, proving authorisation without revealing the key |
| 6 | A checklist that reads as genuinely theirs |
| 7 | Reaches the real distinction: validity is checked independently by everyone, but when two valid options compete, consensus decides which counts — without it, participants diverge into different histories and double-spending becomes possible |

**Send it back if:** the link is broken, points to mainnet, or shows a different
address; item 4 is a paste of explorer fields; any identification in item 5 is
missing or wrong; item 7 restates *validity* rather than explaining what
consensus adds; or the writing is clearly copied.

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
| Item 4 restates the explorer instead of explaining the process | Describe what *happened*, in order, not what the fields say |
| Item 7 answers "how do we know it was valid" instead of "why do we need agreement at all" | [Part 3](./day-3-consensus.md), first section |

All three are quick fixes. If you are stuck on the transaction itself rather
than the writing — a faucet not working is the usual culprit — ask in the
Telegram group. That is what it is for.
