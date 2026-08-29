---
week: 3
day: 5
title: "Security, approvals and permissions"
status: drafting
owner: "Director of Education"
reading_time: "25 min"
sources:
  - name: "ethereum.org — Smart contract security"
    url: "https://ethereum.org/developers/docs/smart-contracts/security/"
    label: "Reuse"
  - name: "ethereum.org — Security"
    url: "https://ethereum.org/security/"
    label: "Reuse"
  - name: "SWC Registry"
    url: "https://swcregistry.io/"
    label: "Link"
  - name: "Revoke.cash"
    url: "https://revoke.cash/"
    label: "Link"
---

# Week 3 · Part 5 — Security, approvals and permissions

[Week 0 Part 4](../../getting-started/safety.md) taught you to be careful with wallet
requests. You did not yet know what a contract was.

Now you do. This page closes the loop: **what is actually happening when you
approve something, and what new trust you take on the moment you interact with a
contract.**

::: important The shift this week made
Before Week 3, using a blockchain meant trusting the network and your own keys.

**From the moment you touch a contract, you are also trusting code you did not
write, cannot change, and probably have not read.** That is a new row in your
[trust map](../week-2/part-6-trust-and-risk-map.md), and it is the biggest one
most people ever add.
:::

## Learning objectives

- Explain what an ERC-20 approval actually does, in contract terms
- Distinguish an on-chain approval from a signature-based permission
- Name the new trust assumptions contract interaction introduces
- Apply a short pre-approval checklist to any wallet request

## Core

### What an approval really is

You now know enough Solidity to see it.

A token contract holds an allowance table:

```solidity
mapping(address => mapping(address => uint256)) allowances;
//      owner              spender        amount
```

When you "approve Uniswap to spend your USDC", you send a transaction calling:

```solidity
approve(uniswapAddress, amount)
```

That writes one number into that table. **Nothing moves.** Later, Uniswap calls
`transferFrom(you, someoneElse, amount)`, the token contract checks the
allowance, and moves your tokens.

::: important Why the two-step pattern exists at all
A contract cannot reach into your wallet. It has no key. So the only way it can
ever move your tokens is if **you** first write permission into the token's own
storage.

The design makes the spender and amount explicit. The risk depends on which
contract receives permission, how much it can spend, and whether that contract
remains trustworthy.
:::

### Unlimited approvals

Some interfaces request a very large or effectively unlimited allowance, so you
only pay gas for the approval once. Interfaces increasingly offer spending caps
instead.

```text
approve(0x9c8a…, 115792089237316195423570985008687907853269984665640564039457584007913129639935)
```

That number is the largest a `uint256` can hold. In practice: **it could cover
future holdings of this token for as long as the allowance stands.**

::: danger An old approval is a live liability
The allowance does not expire. It survives you forgetting about the site, the
team abandoning it, and the contract being compromised eighteen months later.

If that contract is ever exploited, your tokens can be taken **without you doing
anything at all**. You granted the permission years ago.
:::

**The defence** is unglamorous and works:

| Habit | Why |
|---|---|
| Set a spending cap where the wallet allows it | Bounds the loss to what you meant to spend |
| Review approvals periodically | [revoke.cash](https://revoke.cash/) or Etherscan's Token Approvals tool |
| Use a separate wallet for experiments | An approval on a wallet with nothing in it costs nothing |

### Approvals versus signatures

Two ways to hand over the same permission; one may not require gas at the moment
you sign.

| Permission form | On-chain approval | Signature-based permission |
|---|---|---|
| What it is | An `approve()` **transaction** | A signed **message** |
| Costs gas | Yes | **Often nothing** |
| Visible on-chain immediately | Yes | **No** |
| Who submits it | You | **Someone else, later** |
| Grants real permission | Yes | **Yes** |

::: danger "No gas" is not "no risk"
A signature-based permission can create the same standing access as an approval
without appearing anywhere on-chain when you sign it. It may be submitted later
by someone else. A signature is not automatically dangerous: inspect what
permission it authorises, who can submit it, and how long it lasts.

This is why [Week 2 Part 4](../week-2/part-4-transactions-and-gas.md) says: **when
your wallet opens, read what it is asking.** Cost is not the signal. What you are
authorising is the signal.
:::

You do not need the mechanics of permit-style signatures for Foundation. You
need the takeaway: **a wallet request can be dangerous even when nothing moves
and nothing is charged.**

### The new trust assumptions

Interacting with a contract adds these, on top of everything from Week 2:

| You are trusting | Failure looks like |
|---|---|
| **The contract's code** is correct | Funds drained by a bug |
| **The address** is the real one | You interacted with a convincing fake |
| **The frontend** was not hijacked | The site served you a malicious transaction |
| **The permissions** you granted are bounded | An old allowance used against you |
| **Any contract it calls** is also sound | A dependency's failure becomes yours |

That last row is what **composability** costs. Protocols build on protocols, so
a flaw three layers down can reach you.

::: warning An audit is evidence, not a guarantee
Audited protocols get exploited. An audit means competent people reviewed a
specific version at a specific time, and found what they found.

It is meaningfully better than no audit. It is not a warranty.
:::

## Landscape

- **Reentrancy** — a called contract calls back before the first finishes. If state is updated too late, an attacker may repeat an action such as a withdrawal; the 2016 DAO hack is a famous example
- **Access control bugs** — a missing `require` or permission check, exactly like the `Vault` in [Part 2](./part-2-solidity-minimum.md). An unauthorised caller may change settings or take funds
- **Integer issues** — mistakes in arithmetic such as values wrapping unexpectedly. Solidity 0.8 adds built-in overflow checks, but unsafe logic can still cause losses
- **Price manipulation** — moving a thin market to fool a contract reading it. A lending or trading protocol may then value collateral or trades incorrectly
- **Upgradeable proxies** — the code behind an address can be replaced. An upgrade can fix a bug, but the upgrade controller remains a trust assumption
- **Rug pull** — a team removing value, changing the rules or abandoning a project. Users may be unable to recover what they put in
- **Front-running / MEV** — your pending transaction is public before it executes. Another participant may trade or reorder around it and worsen your result
- **SWC Registry** — a historical catalogue of known weakness classes. It is no longer actively maintained, so use current security resources too

## A short checklist

Print it, or keep it in your head. Before approving anything:

::: important Before you approve
1. **Which network?** Testnet for Academy work, always.
2. **Which contract address?** Verified against the official source — not a link someone sent you.
3. **What am I authorising?** A transfer, an approval, or a signature?
4. **How much?** A capped amount beats unlimited.
5. **Do I know this site is real?** Bookmark, not search result, not DM.
6. **If this is wrong, what do I lose?** If the answer is "everything", slow down.
:::

Six questions, about fifteen seconds. It is the highest-value fifteen seconds in
this handbook.

## Worked example

A concrete drain, step by step. Nothing here is exotic.

| # | What happens | Where it went wrong |
|---|---|---|
| 1 | A "token airdrop" link arrives by DM | Reaching a DApp through a message |
| 2 | The site is a convincing clone | URL not checked against a bookmark |
| 3 | It asks to connect the wallet | Harmless on its own |
| 4 | It requests an **unlimited approval** for a token | The dangerous request |
| 5 | The user confirms it without checking the spender and amount — the actual mistake | The request is not read closely |
| 6 | The transaction confirms, but the balance stays unchanged. The user assumes nothing important happened and underestimates the permission they granted | No tokens moved, so the standing permission is missed |
| 7 | Minutes or months later, `transferFrom` drains the balance | Permission became effective when the approval transaction confirmed in step 6 |

::: important Where this was actually preventable
Step 2 and step 5.

**Step 2** is [Week 0 Part 4](../../getting-started/safety.md) — bookmarks, not links.
**Step 5** is this page — read the request, notice "unlimited", cap or reject.

No sophisticated attack occurred. No cryptography was broken. Someone was
helpful, then the user did not read one screen.
:::

And notice the asymmetry: **the attacker needed one careless approval; the user
needed to be careful every time.** That is why this is a habit rather than
knowledge — you cannot look it up in the moment.

::: tip Keep this model handy
You now have a concrete model for reading token permissions: identify the spender,
the amount, the submission path and how long the permission lasts.
:::

::: details Further exploration — optional, not assessed
- [ethereum.org — Smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/) — patterns and pitfalls
- [SWC Registry](https://swcregistry.io/) — a catalogue of known weakness classes
- [Ethernaut](https://ethernaut.openzeppelin.com/) — OpenZeppelin's security wargame. Genuinely fun, entirely optional, and the fastest way to develop instincts
- [Revoke.cash](https://revoke.cash/) — check what you have approved. Worth doing once even with nothing at stake
:::

::: details Sources and attribution
- [ethereum.org — Smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Security](https://ethereum.org/security/) — Reuse (CC BY 4.0), adapted
- [SWC Registry](https://swcregistry.io/) — Link, referenced only
- [Revoke.cash](https://revoke.cash/) — Link, referenced only
:::
