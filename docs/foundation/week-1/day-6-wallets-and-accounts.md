---
week: 1
day: 6
title: "Wallets, accounts and keys"
status: drafting
owner: "Director of Education"
reading_time: "16 min"
sources:
  - name: "ethereum.org — Ethereum accounts"
    url: "https://ethereum.org/developers/docs/accounts/"
    label: "Reuse"
  - name: "ethereum.org — Wallets"
    url: "https://ethereum.org/wallets/"
    label: "Reuse"
  - name: "ethereum.org — Networks"
    url: "https://ethereum.org/developers/docs/networks/"
    label: "Reuse"
  - name: "MetaMask — Support"
    url: "https://support.metamask.io/"
    label: "Link"
---

# Week 1 · Part 6 — Wallets, accounts and keys

Everything so far has been about the network. This is about **you** — how a
person holds a position in a system with no accounts department, no password
reset, and no way to prove who you are to anyone.

::: warning Almost every avoidable loss in this space traces back to one of the four things on this page
Read [Week 0 Part 4](../../getting-started/safety.md) first if you have not.
:::

## Learning objectives

- Explain why a wallet does not contain your coins
- Describe the relationship between private key, public key, address and recovery phrase
- Explain the difference between signing and sending, and why signing can be dangerous
- Explain what a testnet is and why this programme uses one

## Core

### A wallet does not hold your money

The name is genuinely misleading, and the misunderstanding it causes is not
harmless.

Your assets are entries in the blockchain's state — [Part 2](./day-2-how-shared-state-works.md).
They are not in an app on your phone. Delete your wallet software and your
assets are entirely unaffected.

::: important The correction
**A wallet holds keys. Keys authorise changes to state. The assets never move
off the chain, because they were never anywhere else.**
:::

Which is why reinstalling a wallet and entering your recovery phrase restores
everything. Nothing was transferred. You just regained the ability to sign.

### The four things, in order

They derive from one another **in one direction only**. That directionality is
the entire security model.

<div class="academy-figure">
  <div class="academy-figure-surface">

![A recovery phrase generates a private key, which derives a public key, which shortens to an address. The reverse direction is marked as impossible.](/illustrations/w1-key-derivation.png)

  </div>
  <p class="academy-figure-caption">Left to right: <strong>recovery phrase → private key → public key → address.</strong> The crossed arrow is the point — you cannot work backwards.</p>
</div>

| | What it is |
|---|---|
| **Private key** | A very large secret number. Whoever knows it can sign as you, permanently. Not *like* a password — a password is checked by a server that can reset it. There is no server here |
| **Public key** | Derived from the private key by one-way maths. Anyone can verify your signatures; nobody can work backwards. That impossibility *is* the security |
| **Address** | A shortened public key, and what you share. As safe to hand out as an email address |
| **Recovery phrase** | 12 or 24 ordinary words that regenerate the private key — and every key in the wallet |

::: danger The recovery phrase is strictly more powerful than any single key
Anyone holding it holds **every account in that wallet, forever, from anywhere**.

No legitimate site, app, wallet, support agent or Academy organiser will ever
ask for it. There is no situation where a real one needs it.
:::

### Account, wallet, address

| Term | Precisely |
|---|---|
| **Address** | One identity on the chain — `0x` followed by 40 hex characters |
| **Account** | The address plus its on-chain state: balance, nonce, and code if it's a contract |
| **Wallet** | The *software* managing your keys and signing on your behalf |

One wallet typically manages many addresses, all derived from the same recovery
phrase. That is why MetaMask shows "Account 1", "Account 2" from a single setup.

Ethereum has two account types, central in Weeks 2 and 3:

- **EOA** (Externally Owned Account) — controlled by a private key. What you have
- **Contract account** — controlled by its own code. No key, no recovery phrase, cannot initiate anything

### Signing versus sending

::: important The distinction that costs people the most money
**Signing** is local and free. Your wallet applies your private key to some
data. Nothing touches the network, no transaction fee is paid, nothing appears on any
explorer.

**Sending** is broadcasting a *signed transaction*, where the transaction
consumes gas, a transaction fee is paid, and state can change.

So every transaction is signed, but **not everything you sign is a transaction.**
:::

| You sign | What happens now | What can happen later |
|---|---|---|
| Login to a site ("prove you own this address") | Nothing on-chain | Normally nothing |
| A transaction to send 0.05 ETH | 0.05 ETH moves | Nothing further. Bounded |
| **An on-chain approval** — an `approve()` transaction | Costs gas; sets an allowance on-chain | That contract can move your tokens **at any future time** |
| **A signature-based permission** | **Nothing visible, often no gas** | Someone else can submit it later to create the same permission |

The last two rows do the same job by different routes. One is a transaction you
pay for; the other is a signature that may cost nothing at all. **Both can hand
over standing access to your tokens.**

::: danger The dangerous rows are the ones where nothing appears to happen
No funds leave. No confirmation appears. And you may have granted a standing
permission that outlives the moment entirely.

This is the mechanism behind a large share of wallet drains.

**"It's just a signature, not a transaction" is false comfort. So is "it didn't
cost any gas."** A wallet request can be dangerous even when nothing moves
immediately.
:::

**The habit, starting now:** before approving anything, read *which network,
which contract, what am I authorising, and for how much*. If your wallet cannot
tell you plainly, reject it and find out why.

### Mainnet and testnet

| | Mainnet | Testnet (Sepolia) |
|---|---|---|
| Assets worth | Real money | **Nothing** |
| Where you get funds | Buy them | Free, from a faucet |
| Mistakes cost | Real money | Nothing |
| Used for | Real activity | Learning, building, testing |

**Sepolia** is where everything in this programme happens. Sepolia ETH is free,
has no value, and cannot be exchanged for anything. This is deliberate: you
should build the habit of checking signatures where getting it wrong teaches you
something and costs nothing.

::: warning Two things to know
**Networks share addresses but not state.** Your address is the same on Ethereum
and Sepolia; your balances are completely separate. There is **no bridge from
testnet to mainnet**, and anyone offering one is running a scam.

**Sending over the wrong network usually loses the assets.** Always check which
network your wallet is on. It is the first line of every transaction screen for
a reason.
:::

## Landscape

- **Hardware wallet** — keys on a dedicated offline device. The standard for meaningful value; unnecessary for testnet work
- **Hot vs cold wallet** — connected to the internet, or not
- **Multisig** — requires several signatures to act
- **Smart contract wallet** — an account controlled by code, allowing recovery options and spending limits
- **Account abstraction** — making accounts programmable. Further Exploration
- **ENS** — human-readable names like `alice.eth` mapped to addresses
- **Derivation path** — the standard by which one recovery phrase generates many keys
- **Nonce** — a per-account counter preventing replayed transactions

## Guided walkthrough

Preparation only. You install the wallet in [Part 7](./day-7-your-first-transaction.md).

::: steps
1. **Decide where your recovery phrase will live**

   Paper, offline, somewhere you will not lose it and nobody will stumble across
   it. Decide **before** you have one — the moment you are shown twelve words is
   the wrong moment to improvise.

2. **Commit to a fresh wallet**

   Even for testnet work, create a new one. Do not reuse a wallet holding
   anything real. Week 0's "separate wallets" rule starts here.

3. **Bookmark the real MetaMask site**

   [metamask.io](https://metamask.io) — and install only from that bookmark.
   Fake wallet extensions in browser stores are a routine attack, and they are
   convincing.

4. **Pre-commit to the pause**

   Every approval from now on: *which network, which contract, what am I
   authorising.* Practising it on testnet is the entire reason we use testnet.
:::

## Worked example

Two people, same mistake, different networks.

::: tabs
@tab Priya — on Sepolia

She connects to a test DApp and gets a signature request she doesn't recognise.
She approves without reading — it's testnet, and she is moving fast. It was an
unlimited approval on a test token. Her Sepolia balance is drained by an
automated script within minutes.

**Cost: nothing.** The tokens were worthless.

What she got was the experience of seeing a routine-looking request, approving
it, and watching a balance vanish without a further prompt. She now reads every
request — and not because somebody told her to.

@tab Daniel — on mainnet

Same request, same reflex, real USDC. The same script runs.

The money is gone in one block. No support line exists, because there is no
operator — which is the whole point of [Part 1](./day-1-why-blockchain-exists.md).
:::

::: important Same decision, same mechanism, permanently different outcome
**This is why the Academy is testnet-only.** Not to make things easier. Because
the skill you are building is a reflex, and reflexes are built by getting it
wrong somewhere it does not matter.
:::

::: details Further exploration — optional, not assessed
- [ethereum.org — Ethereum accounts](https://ethereum.org/developers/docs/accounts/) — EOAs and contract accounts precisely
- [ethereum.org — Wallets](https://ethereum.org/wallets/) — types compared, and how to choose
- [ethereum.org — Account abstraction](https://ethereum.org/roadmap/account-abstraction/) — making accounts programmable
:::

::: details Sources and attribution
- [ethereum.org — Ethereum accounts](https://ethereum.org/developers/docs/accounts/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Wallets](https://ethereum.org/wallets/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Networks](https://ethereum.org/developers/docs/networks/) — Reuse (CC BY 4.0), adapted
- [MetaMask — Support](https://support.metamask.io/) — Link, referenced only
:::
