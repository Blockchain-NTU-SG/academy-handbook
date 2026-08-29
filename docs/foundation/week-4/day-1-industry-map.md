---
week: 4
day: 1
title: "The Web3 industry map"
status: drafting
owner: "Director of Education"
reading_time: "16 min"
sources:
  - name: "ethereum.org — Decentralized finance (DeFi)"
    url: "https://ethereum.org/defi/"
    label: "Reuse"
  - name: "ethereum.org — NFTs"
    url: "https://ethereum.org/nft/"
    label: "Reuse"
  - name: "ethereum.org — DAOs"
    url: "https://ethereum.org/dao/"
    label: "Reuse"
  - name: "ethereum.org — Oracles"
    url: "https://ethereum.org/developers/docs/oracles/"
    label: "Reuse"
  - name: "DefiLlama"
    url: "https://defillama.com/"
    label: "Link"
  - name: "Singapore Web3 Landscape — Onchain State Singapore"
    url: "https://www.onchainstate.sg/industry-map"
    label: "Link"
  - name: "Binance Research — Industry Map (March 2025)"
    url: "https://public.bnbstatic.com/static/files/research/industry-map-mar25.pdf"
    label: "Link"
  - name: "Artemis / Stablecoin.fyi — Stablecoin Market Landscape"
    url: "https://www.stablecoin.fyi/market-map"
    label: "Link"
---

# Week 4 · Part 1 — The Web3 industry map

You now understand the machine. This is the industry built on top of it.

::: important This page is Landscape, not Core
You are **not** expected to master these sectors. You are expected to hear a
protocol named and think *"that is a lending protocol"* or *"that is
infrastructure"* — and to know roughly what problem that sector is trying to
solve.

Recognition. Not expertise.
:::

## Learning objectives

- Name the major Web3 sectors and what problem each addresses
- Explain whether blockchain is **load-bearing** in a sector — if removed, would the core product stop working or meaningfully change?
- Give at least one representative example per sector you care about
- State a real limitation for any sector you name

## Core

### How to read every sector below

Each one gets four questions, and the fourth is the one that matters:

1. What problem does this sector solve?
2. How does blockchain actually matter here?
3. What are one to three recognisable examples?
4. **What is one major limitation or risk?**

::: warning Question 4 is not pessimism
Every sector below has real problems. A description that omits them is marketing.
If you can only recite what a sector claims, you cannot evaluate anything in it —
and the Week 4 mission asks you to evaluate something.
:::

### Want to see the industry at a glance?

No single map captures Web3 perfectly. Categories overlap, companies move
between sectors, and maps become outdated. Use them for orientation, not as a
definitive taxonomy.

1. **[Singapore Web3 Landscape — Onchain State Singapore](https://www.onchainstate.sg/industry-map)**

   Start here. It is a quick one-page view of the Web3 companies and projects
   around Singapore, and the easiest map to understand at a glance. Open it at
   full size.

2. **[Binance Research — Industry Map, March 2025](https://public.bnbstatic.com/static/files/research/industry-map-mar25.pdf)**

   Want the detailed global version? This is a much deeper map with many
   sectors, sub-sectors and projects. It is an optional deep dive.

3. **[Artemis / Stablecoin.fyi — Stablecoin Market Landscape](https://www.stablecoin.fyi/market-map)**

   A sector can become an industry map of its own. Stablecoins expand into
   issuers, blockchains, payments, on/off ramps, infrastructure, analytics and
   financial services.

**An industry map is a snapshot, not a fixed taxonomy. And every box on the map
can become another map of its own.**

::: tabs
@tab Infrastructure

**Problem:** applications need reliable access to chains without running their
own nodes.

**Why blockchain matters:** it *is* the chain, plus everything needed to build on
it — RPC providers, indexers, data availability, developer tooling.

**Examples:** Alchemy, Infura, The Graph

**Limitation:** convenience recentralises. When most applications read the chain
through two providers, an outage at one takes down a large slice of "the
decentralised web" — which is exactly what
[Week 2 Part 4](../week-2/day-4-transactions-and-gas.md) warned about.

@tab Wallets

**Problem:** people need to hold keys and sign transactions without
understanding cryptography.

**Why blockchain matters:** self-custody is only possible if key management is
usable. Wallets are the entire user-facing surface.

**Examples:** MetaMask, Phantom, Rabby, Safe

**Limitation:** the security burden sits with the user, and interfaces still ask
people to approve things they cannot evaluate — [Week 3 Part 5](../week-3/day-5-security-and-approvals.md).

@tab Stablecoins and payments

**Problem:** cross-border payments can involve several intermediaries, fees and
settlement delays.

**Why blockchain matters:** it can enable fast global settlement without the
same correspondent-banking path.

**Examples:** Circle (USDC), Tether (USDT)

**Limitation:** the largest stablecoins are **centralised claims on an issuer**.
Reserves, redemption and freezing are all trust assumptions — [Week 1 Part 5](../week-1/day-5-crypto-asset-map.md).
This is the clearest case where Web3 redistributes trust rather than removing it.

@tab DeFi

**Problem:** traditional financial services usually rely on institutions to hold
assets, match transactions or enforce rules.

**Why blockchain matters:** contracts can enforce terms without a company, and
many protocols are designed for permissionless access, subject to their
interfaces and other controls.

**Examples:** Uniswap (DEX), Aave (lending)

**Limitation:** composability spreads failure, oracles can be manipulated, and
much of the yield historically came from token emissions rather than genuine
economic activity. "Permissionless" also means no recourse when something goes
wrong.

@tab RWA

**Problem:** most of the world's value is in assets that settle slowly and trade
in limited hours.

**Why blockchain matters:** on-chain representation allows 24/7 settlement and
programmability.

**Examples:** tokenised treasuries and money-market funds

**Limitation:** **the token is a claim, not the asset.** A tokenised bond depends
entirely on the legal entity holding the real one. That is a legal question wearing
a technical costume, and blockchain does not solve it.

@tab NFTs and ownership

**Problem:** digital items are usually controlled inside the platform that
issued them, which makes independent ownership and portability difficult.

**Why blockchain matters:** it can provide an independently verifiable ownership
record that can be referenced across applications.

**Examples:** ENS, event ticketing, in-game items

**Limitation:** the token usually points at a link — [Week 3 Part 4](../week-3/day-4-tokens-and-standards.md).
And the 2021 collectibles boom left the sector's reputation well behind its more
durable uses.

@tab Gaming and consumer

**Problem:** players invest years in items they do not own and cannot take
anywhere.

**Why blockchain matters:** items can persist beyond one publisher.

**Examples:** on-chain games, consumer social applications

**Limitation:** many early blockchain games struggled to attract players beyond
financial incentives. Financialising play can attract speculators rather than players, and
"play-to-earn" economies have repeatedly collapsed.

@tab DAOs and governance

**Problem:** coordinating people and money without a company structure.

**Why blockchain matters:** treasuries and voting can be enforced by contracts
rather than trust.

**Examples:** protocol governance, grant programmes

**Limitation:** governance participation can be low, and token-weighted voting
can concentrate influence in large holders. Legal status is unresolved in many
jurisdictions.

@tab Oracles and cross-chain

**Problem:** contracts cannot see outside their own chain — [Week 2 Part 3](../week-2/day-3-why-ethereum-and-evm.md).

**Why blockchain matters:** without external data and cross-chain messaging,
contracts can only act on what is already on their chain.

**Examples:** Chainlink; LayerZero, Wormhole, Across

**Limitation:** both can create **concentrated points of failure**. Bridges have
historically been a major source of large crypto exploits — [Week 2 Part 5](../week-2/day-5-l1-l2-and-bridges.md).

@tab Data, ZK, DePIN, AI

**On-chain data** — Dune, DefiLlama, Nansen. Raw on-chain data is public but hard
to use directly. *Limitation:* dashboards embed someone's definitions; "TVL" is
a choice, not a fact.

**ZK and privacy** — proving something is true without revealing it. Used for
scaling and privacy. *Limitation:* hard to build, hard to audit, and privacy
tools attract regulatory attention.

**DePIN** — token incentives to bootstrap physical networks. *Limitation:* the
hard part is real-world operations, and demand rarely arrives with supply.

**AI × Web3** — an emerging and unsettled area. *Limitation:* a great deal of it
is narrative. Ask what the blockchain is load-bearing for; sometimes the answer
is "nothing".
:::

### The question to carry into every sector

::: important Where is the blockchain actually load-bearing?
For each sector, ask: **if you removed the blockchain, what specifically breaks?**

Here, **load-bearing** means: if you removed the blockchain, would the core
product stop working or meaningfully change?

- Stablecoin payments — settlement without correspondent banks. **Real.**
- A DEX — custody-free trading with no company. **Real.**
- A supply-chain pilot with one operator and no external verification — usually a
  database with extra steps. **Often not real.**

Week 2 Part 1 asked this about private chains. It generalises to entire sectors.
:::

## Landscape

- **TVL** — total value locked. The headline sector metric, and a contested definition
- **Protocol revenue vs incentives** — is a project earning, or paying users to show up?
- **Modular vs monolithic** — whether execution, settlement and data availability are separated
- **Account abstraction** — making wallets programmable, aimed squarely at the wallets limitation
- **Restaking** — reusing staked ETH to secure other services. New, and adds correlated risk
- **Intents / chain abstraction** — hiding chain choice from users entirely

## Worked example

Someone tells you about **"a decentralised protocol for tokenised carbon
credits."** You have never heard of it. Place it in ninety seconds.

| Question | Working answer |
|---|---|
| Sector? | **RWA**, with DeFi and data adjacencies |
| Problem? | Carbon markets are opaque, fragmented, and double-counting is rife |
| Blockchain load-bearing? | **Partly.** A shared registry nobody can quietly edit is genuinely useful |
| Limitation? | **The credit's quality is an off-chain fact.** Tokenising a worthless credit produces a worthless token, verifiably |

::: important That last row is the whole skill
[Week 1 Part 3](../week-1/day-3-consensus.md) said it in a single line:
**blockchains secure the ledger, not reality.**

The chain can prove a credit was issued, transferred and retired exactly once.
It cannot prove a tree was planted. Any project in this sector lives or dies on
its off-chain verification — so *that* is what you investigate, and
[Part 3](./day-3-research-tool-map.md) shows you how.
:::

::: details Further exploration — optional, not assessed
- [DefiLlama](https://defillama.com/) — browse by category to see relative sector sizes
- [ethereum.org — DeFi](https://ethereum.org/defi/) · [NFTs](https://ethereum.org/nft/) · [DAOs](https://ethereum.org/dao/) — deeper on three of the largest
- Pick the sector you find least convincing and find its strongest defender. Steelmanning is more useful than dismissing
:::

::: details Sources and attribution
- [ethereum.org — Decentralized finance (DeFi)](https://ethereum.org/defi/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — NFTs](https://ethereum.org/nft/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — DAOs](https://ethereum.org/dao/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Oracles](https://ethereum.org/developers/docs/oracles/) — Reuse (CC BY 4.0), adapted
- [DefiLlama](https://defillama.com/) — Link, referenced only
- [Singapore Web3 Landscape — Onchain State Singapore](https://www.onchainstate.sg/industry-map) — Link, referenced only
- [Binance Research — Industry Map (March 2025)](https://public.bnbstatic.com/static/files/research/industry-map-mar25.pdf) — Link, referenced only
- [Artemis / Stablecoin.fyi — Stablecoin Market Landscape](https://www.stablecoin.fyi/market-map) — Link, referenced only

*Named organisations and protocols are illustrative examples chosen for
recognisability, not recommendations or endorsements.*
:::
