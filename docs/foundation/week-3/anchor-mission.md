---
week: 3
title: "Deploy and explain your own contract"
points: 100
status: drafting
owner: "Director of Education"
---

# Week 3 — Anchor Mission

<Badge type="tip" text="100 points" /> <Badge type="info" text="Testnet only" /> <Badge type="warning" text="No deadline" />

::: danger Testnet only
Deploy to the test network only. **Never deploy an Academy exercise to mainnet**,
and never use a wallet holding real funds.
:::

## What you're doing

Deploying your contract from [Part 3](./day-3-remix-lab.md), calling it, and
explaining what it stores and what changes when you use it.

::: important The deployment is the easy part
You already did it in Part 3. What we are checking is that you can say **what
your contract remembers, what changes when someone calls it, and what it cannot
protect against.**

That last one matters most. Anyone can deploy a contract. Knowing its limits is
the difference between having followed instructions and having understood them.
:::

## What to submit

::: steps
1. **Contract address** — the `0x` address from Remix

2. **Deployment transaction hash** — the transaction that created it

3. **One successful write transaction hash** — your `setMessage` call

   All three must be on the test network and must open on the explorer.

4. **Your source code**

   Paste it, or link a file in your GitHub repo from
   [Week 0 Part 1](../../getting-started/welcome-and-setup.md).

5. **Name one read function, one write function, and one event** in your contract

   One line each. Say which is which.

6. **Three short answers**

   - **What state does your contract store?** *(1–2 sentences)*
   - **What changes when the write function is called?** *(1–2 sentences)*
   - **Name one limitation or security consideration.** *(1–2 sentences)*
:::

::: tip Expected length
**Roughly 200–300 words**, plus the three links and your source code. Optional:
up to eight image or PDF uploads — a screenshot of your deployed contract in
Remix is welcome, not required.
:::

::: warning On question 6c
Any real limitation counts. Some honest examples from this exact contract:

- anyone can call `setMessage` — there is no permission check
- the message is public forever and cannot be deleted
- there is no way to fix a bug once deployed
- storing long text costs more gas than you would expect

You are not expected to find a clever exploit. You are expected to notice that
**your contract has limits**, and to name one.
:::

## Submission checklist

- [ ] Contract address, deployment hash and write transaction hash are all included
- [ ] All three open on the explorer and are on the **test network**
- [ ] My source code is included or linked
- [ ] I named a read function, a write function and an event
- [ ] I answered all three parts of question 6
- [ ] If I used AI, I can explain what my contract does and what would break if it changed
- [ ] **I have not included my recovery phrase or private key anywhere**

:::: details For reviewers — what "completed" looks like
Two or three minutes. Verify a real deployment and real understanding — **not
code quality**, and not whether they extended the contract.

| Item | Standard |
|---|---|
| 1–3 | All three open on the **test network**. The contract address matches the deployment transaction's created contract, and the write transaction targets that same address |
| 4 | Source matches what is deployed, at least in substance |
| 5 | Correctly identifies which is read, which is write, and names an event. A `public` state variable counts as a read function — that is correct, and worth acknowledging if they spot it |
| 6a | Names the actual state — the message, and ideally the visitor and count |
| 6b | Describes the state change **and** that it costs gas or needs a signature |
| 6c | **Any genuine limitation.** Missing access control, immutability, public data, gas cost. Accept anything real |

**Send it back if:** any link is broken, points to mainnet, or the addresses do
not correspond; the source is clearly not what was deployed; question 5 confuses
read and write; or 6b describes the write without any sense that state changed.

**Do not send it back for:** using the Part 3 contract unmodified, an unpolished
answer that is correct, imperfect English, or not verifying the source on
Etherscan — that was optional.

::: danger If a recovery phrase or private key appears
Reject immediately. Tell the member their wallet is compromised and to create a
fresh one. **Do not repeat the phrase in your feedback.**
:::
::::

## If this gets rejected

::: tip Rejection means resubmit — it is not a fail
No deadline, no penalty. You will be told the one thing to fix.
:::

The three most common rejections at Week 3:

| What happened | The fix |
|---|---|
| The contract address and the deployment transaction do not match | On the explorer, open the deployment transaction and copy the address from its **Created Contract** field |
| Question 5 calls a `public` variable "not a function" | It **is** a read function — Solidity generates one for you. [Part 2](./day-2-solidity-minimum.md), State tab |
| 6c says "it is secure" or leaves it blank | Every contract has limits. Start with: who is allowed to call your write function? |

Stuck on the deployment rather than the writing? [Part 3](./day-3-remix-lab.md)
has a troubleshooting section, and the Telegram group has people who hit the same
error last week.
