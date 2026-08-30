---
week: 4
day: 2
title: "Who is who, and what kind of thing is it"
status: drafting
owner: "Director of Education"
reading_time: "25 min"
sources:
  - name: "ethereum.org — Ethereum Foundation"
    url: "https://ethereum.org/foundation/"
    label: "Reuse"
  - name: "ethereum.org — DAOs"
    url: "https://ethereum.org/dao/"
    label: "Reuse"
  - name: "ethereum.org — Governance"
    url: "https://ethereum.org/governance/"
    label: "Reuse"
  - name: "ethereum.org — Decentralized identity"
    url: "https://ethereum.org/decentralized-identity/"
    label: "Reuse"
---

# Week 4 · Part 2 — Who is who, and what kind of thing is it

[Part 1](./part-1-industry-map.md) asked: **what does this project do?** That is
the sector question — DeFi, infrastructure, stablecoins, gaming and so on.

This page asks a different question: **what exactly is the thing being named?**
A project or ecosystem can contain a network, a protocol, a company, a token, an
interface and a governance process at the same time.

::: important The sentence this page exists for
**Sector tells you what problem area something belongs to. Type tells you what
the named thing actually is.**

For example, "Uniswap" can mean the protocol, the website, the company behind
one interface, the UNI token or the governance process. These are not
interchangeable: they can change, fail or be controlled in different ways.
:::

## Learning objectives

- Distinguish a network, native asset, token, protocol, company, foundation, interface and DAO/governance process
- Place a named thing into its category and sector
- Explain what governance coordinates, and what it does not
- Explain why an address can become part of on-chain identity without being a person's complete identity

## Core

### Start with a familiar name

When someone says **"Uniswap"**, what are they actually talking about?

Start with the sector: Uniswap belongs mainly to **DeFi**, because it helps
people exchange tokens. Now add the type question:

| Name | Sector | What kind of thing? |
|---|---|---|
| Uniswap Protocol | DeFi | Protocol — rules implemented by contracts on a network |
| Uniswap Labs | DeFi | Company — a team and legal organisation that builds software |
| Uniswap interface | DeFi | Interface — the website or app people use to interact with the protocol |
| UNI | DeFi | Token — an on-chain asset with governance and ecosystem roles |
| Governance | DeFi | Process — how some participants coordinate certain changes |

The sector did not change. The named thing did.

That is the skill for this page: do not ask only *"Which sector is this in?"*
Ask *"What exactly am I looking at?"*

### A second example: Ethereum

The same distinction helps with Ethereum:

| Name | What kind of thing? | What it means here |
|---|---|---|
| Ethereum | Network | The blockchain system participants connect to and use |
| ETH | Native asset | Used for transaction fees and as part of Ethereum's security model |
| Ethereum Foundation | Foundation | A nonprofit supporting ecosystem work; it does not automatically control Ethereum |

::: important The row that surprises people
The Ethereum Foundation is not the same thing as the Ethereum network. If the
Foundation disappeared, other developers and organisations could still work on
Ethereum, although funding and ecosystem support would change.

Likewise, the Uniswap Protocol is not the same thing as Uniswap Labs. Deployed
contracts may continue to work if the company or its website changes, but the
protocol can still depend on upgrade permissions, interfaces, governance and
other infrastructure.

These are not slogans. They are different dependencies that can be checked.
:::

### A small category map

Use these as recognition-level definitions. You do not need to memorise a list
of organisations.

- **Network** — the blockchain system participants connect to and use. If the network is unavailable, applications built on it cannot use its current state.
- **Protocol** — rules and contracts that provide a service on a network, such as exchanging or lending assets. The protocol is not automatically the same thing as the website in front of it.
- **Company / Labs** — a legal organisation with people, owners and a jurisdiction. It may build software around a protocol without owning the protocol itself.
- **Foundation** — often a nonprofit that funds or supports ecosystem work. Supporting a network does not automatically mean controlling its rules or validators.
- **Native asset** — an asset built into a network's protocol, such as ETH on Ethereum. It does not need a token contract to exist.
- **Token** — an asset whose balances and rules are implemented by a smart contract on a network. A token may coordinate voting, ownership or incentives, but it is not automatically company equity.
- **Interface** — the website or app a person uses to interact with a protocol. An interface can change or disappear while the underlying contracts remain available, if the contracts and required services are still available.
- **DAO / governance** — a way for a community or defined group of participants to coordinate decisions. DAOs do not all use the same voting rules, legal structure or execution process.

### Quick classification: keep these separate

These pairs are often mentioned together, but the first and second item answer
different questions:

| Pair | The useful distinction |
|---|---|
| **Coinbase ≠ Base** | Coinbase is a company; Base is a network. |
| **Circle ≠ USDC** | Circle is an issuer/company; USDC is a token. |
| **Uniswap Labs ≠ Uniswap Protocol** | Labs is a company; the Protocol is contracts and rules on a network. |
| **Ethereum Foundation ≠ Ethereum** | The Foundation supports ecosystem work; Ethereum is the network. |
| **UNI ≠ equity in Uniswap Labs** | UNI is a token; holding it does not automatically make you a shareholder. |

The goal is not to memorise every example. It is to stop a category mistake
before it turns into a false conclusion.

### More names to recognise

These compact examples broaden the map. They are reference material, not a
second directory to memorise.

:::: tabs
@tab Networks

| Network | What it is |
|---|---|
| <span class="academy-brand-label"><Icon name="token-branded:ethereum" /><strong>Ethereum</strong></span> | The largest smart-contract network |
| <span class="academy-brand-label"><Icon name="token-branded:solana" /><strong>Solana</strong></span> | High-throughput L1 |
| <span class="academy-brand-label"><Icon name="token-branded:base" /><strong>Base</strong></span> | Ethereum L2, built by Coinbase |
| <span class="academy-brand-label"><Icon name="token-branded:arbitrum" /><strong>Arbitrum</strong></span> | Ethereum L2, optimistic rollup |

@tab Companies

| Company | What it is |
|---|---|
| <span class="academy-brand-label"><Icon name="simple-icons:coinbase" /><strong>Coinbase</strong></span> | Exchange and technology company |
| <span class="academy-brand-label"><Icon name="simple-icons:circle" /><strong>Circle</strong></span> | Issuer of USDC |
| <span class="academy-brand-label"><Icon name="token-branded:uniswap" /><strong>Uniswap Labs</strong></span>, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/aave.svg" alt="" aria-hidden="true" /><strong>Aave Labs</strong></span> | Development companies behind protocols |
| <span class="academy-brand-label"><Icon name="simple-icons:alchemy" /><strong>Alchemy</strong></span>, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/infura.svg" alt="" aria-hidden="true" /><strong>Infura</strong></span> | Infrastructure providers |

::: tip Notice the pattern
Every row here is **a company with employees, investors and a jurisdiction.**
They can be sued, regulated, acquired or wound up. That is a different kind of
thing from a deployed contract.
:::

@tab Protocols

| Protocol / product | What it does |
|---|---|
| <span class="academy-brand-label"><Icon name="token-branded:uniswap" /><strong>Uniswap</strong></span> | Decentralised exchange |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/aave.svg" alt="" aria-hidden="true" /><strong>Aave</strong></span> | Lending market |
| <span class="academy-brand-label"><Icon name="simple-icons:chainlink" /><strong>Chainlink</strong></span> | Oracle network |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/layerzero.png" alt="" aria-hidden="true" /><strong>LayerZero</strong></span>, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/wormhole.png" alt="" aria-hidden="true" /><strong>Wormhole</strong></span>, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/across.svg" alt="" aria-hidden="true" /><strong>Across</strong></span> | Cross-chain messaging and bridging |

@tab Tools and research

| Tool / research | What it is |
|---|---|
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/dune.png" alt="" aria-hidden="true" /><strong>Dune</strong></span> | On-chain data and dashboards |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/defillama.jpg" alt="" aria-hidden="true" /><strong>DefiLlama</strong></span> | TVL and protocol comparison |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/l2beat.png" alt="" aria-hidden="true" /><strong>L2BEAT</strong></span> | L2 risk and maturity analysis |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/messari.jpg" alt="" aria-hidden="true" /><strong>Messari</strong></span> | Structured research |
| <span class="academy-brand-label"><Icon name="simple-icons:openzeppelin" /><strong>OpenZeppelin</strong></span> | Security and contract libraries |
| <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/etherscan.svg" alt="" aria-hidden="true" /><strong>Etherscan</strong></span> | Block explorer |
::::

### Why the distinction matters

Different types of things answer different practical questions:

| Question | Example of the thing to inspect |
|---|---|
| How do I use it? | The interface, such as a website or wallet connection |
| What rules run on-chain? | The protocol's deployed contracts |
| Who can change those rules? | The controls or decision process that can change them |
| Who is accountable as an organisation? | A company, foundation or other legal entity |
| What native asset am I holding? | The network, such as ETH on Ethereum |
| What token am I holding? | The token's network + contract address |

This is why "decentralised" is not a complete answer. A protocol may have
decentralised contracts but a company-run interface, a concentrated upgrade
key, or a token issued by a centralised entity.

### If company ≠ protocol, who changes the protocol?

In a normal web app, the company can update its backend. If important protocol
rules live in deployed contracts, the next question is: **which changes are
possible, and who can authorise them?**

Some contracts are designed to be difficult or impossible to change. Others
have upgrade controls, adjustable parameters or treasuries that can change.
**Governance** is the process used to decide or authorise some of those changes.

### Proposals are not deployed changes

Protocols need a way to make a possible change inspectable and discussable.
Ethereum calls its technical proposals **EIPs** — Ethereum Improvement
Proposals. You met EIPs/ERCs as standards documents in [Week 3 Part 4](../week-3/part-4-tokens-and-standards.md);
here the useful idea is the process:

`idea → proposal/specification → discussion/review → decision/adoption → implementation`

Other ecosystems use different names and processes. Publishing a proposal does
not by itself mean that the change was approved, activated or deployed. Some
governance happens on-chain, some off-chain, and some combines both.

One common pattern is a proposal discussed on a forum, an off-chain vote taken
on Snapshot, and an on-chain transaction executing the decision if it passes.
That is one pattern, not a universal model, and governance does not mean that a
token holder owns the company behind the protocol.

::: important Four lines that cover it
> **Blockchains coordinate state.**
> **Smart contracts coordinate rules.**
> **Tokens can coordinate ownership and incentives.**
> **Governance coordinates some changes.**
:::

These four lines are a summary, not the starting definition. Not every network
or protocol uses token voting, and not every change is controlled by a DAO.

::: warning What a governance token is not
Holding one is **not ownership of a company**, not a share, and not a claim on
revenue unless the protocol specifically grants one.

And governance has real problems, named honestly in
[Part 1](./part-1-industry-map.md): turnout is often very low, and token-weighted
voting concentrates influence in the largest holders.

Detailed DAO mechanism design belongs in Semester 2.
:::

### One last category mistake: address ≠ person

The same precision applies to users. A person, a wallet, an address, an ENS
name and a credential are related, but they are not the same thing.

| Name | Plain-English meaning |
|---|---|
| Person | A human being in the real world |
| Wallet | Software or a device that helps a person control keys and authorise actions |
| Address | A public, pseudonymous identifier that can receive assets and appear in transactions |
| ENS name | A readable name that can point to an address |
| Credential | A claim or proof about a person, account or achievement |

Your address can become part of your **on-chain identity** because assets,
activity, contract interactions and credentials can accumulate against it. It
is not, by itself, your complete human identity — [Week 1 Part 7](../week-1/part-7-your-first-transaction.md)
had you look at this public trail.

::: danger Pseudonymity is not anonymity
An address is not your name. But it can be a **stable identifier with a public
history**, and repeated activity can often be linked back to a person.

Withdraw from a KYC'd exchange to your address, and that exchange can connect
the two. Reuse one address across a forum post, an ENS name and a donation, and
anyone can connect them.

**Deanonymisation is usually done by correlation, not by breaking cryptography.**
:::

The genuine trade-off:

| Possibility | Risk |
|---|---|
| Portable reputation you own, not a platform | Activity made from the same address can be linked together |
| Credentials that follow you between applications | Public activity can remain visible and is not controlled by one platform |
| On-chain records are not controlled by one platform | Correlation can undo pseudonymity |

::: tip Practical implication
Using separate wallets for separate purposes is a **privacy** measure as well as
a security one. [Week 0 Part 4](../../getting-started/safety.md) recommended it for
safety; this is the second reason.
:::

DID is a W3C standard; SBT is a design concept used by some projects, not a
universal formal standard. Both are Further Exploration, not compulsory
Foundation.

## Landscape

- **Foundation** — a non-profit that funds ecosystem work. It may support a network without controlling its rules or validators
- **Labs / Core contributor** — a company or group that builds a protocol's software. It may influence development without owning the protocol
- **Protocol vs interface** — the contracts, versus the website in front of them. They often have different owners, so a website can change while the contracts remain
- **Multisig / Safe** — a wallet requiring several signers, commonly used by treasuries. Losing enough signers can block a treasury action
- **Snapshot** — off-chain voting used by some DAOs. It records governance preference but does not itself execute a contract change
- **Delegation** — assigning your voting power to someone who participates. You gain a representative, but rely on that person's choices
- **ENS** — human-readable names mapped to addresses. They make identity easier to read, while the address and its public activity remain the underlying record
- **DID / SBT** — identity concepts used by some projects. A DID can represent an identifier, while an SBT is a non-transferable token used for something such as a credential; neither by itself proves a person's real-world identity. Further Exploration

## Worked example

> **"Coinbase launched Base, so Base is centralised and Coinbase controls your
> funds."**

Take it apart by category.

| Claim | Assessment |
|---|---|
| Coinbase is a company | **True** |
| Coinbase built Base | **True** — Base is an Ethereum L2 |
| Coinbase operates the sequencer | **True today**, and openly acknowledged |
| Therefore Coinbase controls your funds | **Does not follow** |

Base is a **network**; Coinbase is a **company**; the sequencer is a **role**.
Conflating them produces a claim that sounds damning and is imprecise.

The accurate version, using [Week 2 Part 5](../week-2/part-5-l1-l2-and-bridges.md):

> "Base's sequencer is currently operated by Coinbase, which means it could in
> principle censor or reorder transactions. Whether users can exit to Ethereum
> without Coinbase's cooperation depends on the network's actual maturity —
> which [L2BEAT](https://l2beat.com/) assesses. Custody of your assets is not the
> same question as who orders transactions."

::: important Same underlying facts, completely different claim
The first version is a vibe. The second is checkable, and it points at where to
check.

**Being precise about categories is what turns an opinion into an analysis** —
and it is what [Part 3](./part-3-research-tool-map.md) and the Week 4 mission ask
you to do.
:::

::: details Further exploration — optional, not assessed
- [ethereum.org — Ethereum Foundation](https://ethereum.org/foundation/) — what a foundation does, and does not do
- [ethereum.org — Governance](https://ethereum.org/governance/) — how Ethereum itself changes, which is unlike most protocol governance
- [ethereum.org — Decentralized identity](https://ethereum.org/decentralized-identity/) — DIDs and verifiable credentials
- Pick a protocol you use and find its forum. Reading one real governance debate teaches more than any summary
:::

::: details Sources and attribution
- [ethereum.org — Ethereum Foundation](https://ethereum.org/foundation/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — DAOs](https://ethereum.org/dao/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Governance](https://ethereum.org/governance/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Decentralized identity](https://ethereum.org/decentralized-identity/) — Reuse (CC BY 4.0), adapted

*Named organisations are illustrative examples, not recommendations.*
:::
