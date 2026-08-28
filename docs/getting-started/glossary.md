---
week: 0
day: 2
title: "Web3 starter glossary"
status: drafting
owner: "Director of Education"
reading_time: "reference — skim now, return often"
sources:
  - name: "ethereum.org — Glossary"
    url: "https://ethereum.org/glossary/"
    label: "Reuse"
  - name: "ethereum.org — Gas and fees"
    url: "https://ethereum.org/developers/docs/gas/"
    label: "Reuse"
  - name: "ethereum.org — Stablecoins"
    url: "https://ethereum.org/stablecoins/"
    label: "Reuse"
  - name: "ethereum.org — Networks"
    url: "https://ethereum.org/developers/docs/networks/"
    label: "Reuse"
---

# Week 0 · Part 2 — Web3 starter glossary

The thing that stops beginners in Web3 is rarely the concepts. It is that four
unexplained words show up in the first sentence, and by the time you have looked
them all up you have lost the thread.

::: important This is a reference, not a lesson
**Do not read it end to end, and do not memorise it.** Skim the tabs once so you
know what is here, then search it — <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd> —
whenever a word stops you mid-sentence.

Nothing on this page is assessed.
:::

Every entry gives you the same three things:

> **term** → one-line explanation → a concrete example

One line is deliberately not the whole truth. It is enough to keep reading. The
week that owns each concept is in the last column, and that is where the real
explanation lives.

## Core

:::: tabs
@tab Blockchain

| Term | One line | Example | Covered |
|---|---|---|---|
| **Block** | A batch of transactions added together | Ethereum adds one roughly every 12 seconds | Week 1 |
| **Transaction** | A signed instruction to change the shared record | "Send 0.1 ETH to Ben" | Week 1 |
| **Gas** | The amount of computation or work your transaction uses | A transfer uses less gas than deploying a contract | Week 2 |
| **Validator** | A participant that proposes and checks new blocks | Ethereum has over a million | Week 1 |
| **Node** | A computer running the network's software | Your wallet talks to one to read balances | Week 1 |
| **Finality** | The point where a transaction won't be reversed | Ethereum: ~13 minutes. Solana: much faster | Week 2 |
| **Mainnet** | The real network, with real value at stake | Ethereum Mainnet | Week 1 |
| **Testnet** | A practice network with worthless coins | Sepolia — **everything in this programme** | Week 1 |
| **On-chain** | Recorded on the blockchain, public and permanent | A token transfer | Week 1 |
| **Off-chain** | Happening outside the blockchain | A Discord vote | Week 2 |

@tab Crypto assets

| Term | One line | Example | Covered |
|---|---|---|---|
| **Coin** | The native asset of its own blockchain | BTC on Bitcoin, ETH on Ethereum | Week 1 |
| **Token** | An asset created by a contract on top of a chain | USDC lives on Ethereum but is not ETH | Weeks 1, 3 |
| **Stablecoin** | A token designed to hold a steady value | USDC, USDT | Week 1 |
| **Staking** | Locking an asset to help secure a network | Locking ETH to back a validator | Week 1 |
| **Mint** | Creating new units of a token or NFT | A collection minting 5,000 items | Week 3 |
| **Burn** | Permanently destroying units | Ethereum burns part of every fee | Week 3 |
| **Airdrop** | Distributing tokens free to a set of addresses | Uniswap sent 400 UNI to early users in 2020 | Landscape |

@tab DeFi

Financial applications built as smart contracts rather than as companies. Week 3
explains how they work; recognise the words for now.

| Term | One line | Example | Covered |
|---|---|---|---|
| **TVL** | Total Value Locked — how much value sits in a protocol | A headline metric on DefiLlama | Week 4 |
| **Liquidity** | How easily something trades without moving the price | A thin market has low liquidity | Landscape |
| **LP** | Liquidity Provider — deposits assets so others can trade | Depositing into a Uniswap pool | Landscape |
| **APY / APR** | Advertised annual return. APY compounds, APR doesn't | "8% APY" on a lending market | Landscape |
| **AMM** | Trading against a formula, not an order book | Uniswap | Week 3 |
| **CEX** | Centralised Exchange — a company holds your assets | Coinbase, Binance, OKX | Week 1 |
| **DEX** | Decentralised Exchange — contracts swap from your wallet | Uniswap | Weeks 1, 3 |

::: tip CEX vs DEX is Core
It is the clearest example of the trade-off this whole field is about:
convenience and recourse on one side, control and self-custody on the other.
:::

@tab Governance

| Term | One line | Example | Covered |
|---|---|---|---|
| **DAO** | A group coordinating through on-chain rules | A treasury governed by token holders | Week 4 |
| **Proposal** | A formal suggested change, put to a vote | "Reduce the fee from 0.3% to 0.25%" | Week 4 |
| **Governance** | How changes get decided and applied | Forum discussion, then on-chain voting | Week 4 |
| **Multisig** | A wallet needing several signatures to act | A 3-of-5 treasury | Week 4 |

@tab Culture

You will meet these constantly. They are not technical, and treating them as
technical is a common beginner mistake.

| Term | One line | Note |
|---|---|---|
| **DYOR** | "Do Your Own Research" | Often sincere; also used to dodge responsibility for a bad call |
| **NFA** | "Not Financial Advice" | A disclaimer, not a legal shield |
| **FOMO** | Fear Of Missing Out | The most reliably exploited emotion in this industry |
| **FUD** | Fear, Uncertainty and Doubt | Sometimes describes real manipulation. Frequently used to dismiss legitimate criticism |
| **GM** | "Good morning" | A greeting. That is genuinely all it is |
| **Degen** | Someone taking deliberately reckless risk | Usually self-applied, half-joking |

::: warning Two of these deserve a second's thought
**"DYOR"** and **"NFA"** appear most often right next to the claims that deserve
the most scrutiny. **"FUD"** is the standard reply to inconvenient evidence.
Notice which. Week 4 teaches you how to check claims properly.
:::
::::

## Landscape

Words you will hear early but do not need yet.

| Term | One line | Covered |
|---|---|---|
| **Smart contract** | A program that runs on a blockchain | Week 3 |
| **DApp** | An application whose backend logic is smart contracts | Week 3 |
| **Layer 1 / Layer 2** | A base chain, and a network built on top to make it cheaper | Week 2 |
| **Bridge** | Infrastructure for moving value between blockchains | Week 2 |
| **Oracle** | A service that feeds outside data to smart contracts | Week 3 |
| **Wallet** | Software that holds your keys and signs transactions | Week 1 |
| **Seed phrase** | 12 or 24 words that recover your wallet | Week 1, Part 6 |
| **Block explorer** | A website for reading everything on a chain | Week 1 |
| **ABI** | The description of how to call a contract's functions | Week 3 |
| **EVM** | The Ethereum Virtual Machine, where contracts run | Week 2 |
| **NFT** | A token where each unit is individually distinct | Weeks 1, 3 |
| **RWA** | Real World Assets, represented on-chain | Week 4 |
| **ZK** | Zero-knowledge cryptography, for privacy and scaling | Week 4 |

::: danger Seed phrase — the one entry that matters today
**Never share it.** Not with support, not with an organiser, not with anyone.
[Part 4](./safety.md) explains why there is no exception to this.
:::

## Worked example

Here is why this page exists. A real sentence of the kind you will meet in Week 4:

> "The DAO passed a proposal to deploy the protocol on an L2, and TVL migrated
> from mainnet within a week."

Unpacked with this glossary and nothing else:

| Fragment | Meaning |
|---|---|
| The DAO passed a proposal | The token-holder group voted through a formal change |
| deploy the protocol on an L2 | Run the same application on a faster, cheaper network built on Ethereum |
| TVL migrated from mainnet | The value people had deposited moved there |

Plain English: **the community voted to move to a cheaper network, and users
followed the money within a week.**

::: important Recognition first, understanding later
You did not need to understand how an L2 works to read that sentence. That is
the point of this page.
:::

::: details Further exploration — optional, not assessed
- [ethereum.org — Glossary](https://ethereum.org/glossary/) — longer and more precise. Use it when one line is not enough
- [ethereum.org — Web3 for beginners](https://ethereum.org/web3/) — the same vocabulary in narrative form
:::

::: details Sources and attribution
- [ethereum.org — Glossary](https://ethereum.org/glossary/) — Reuse (CC BY 4.0), adapted and reorganised
- [ethereum.org — Gas and fees](https://ethereum.org/developers/docs/gas/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Stablecoins](https://ethereum.org/stablecoins/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Networks](https://ethereum.org/developers/docs/networks/) — Reuse (CC BY 4.0), adapted
:::
