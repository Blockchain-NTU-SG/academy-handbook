---
week: 3
day: 4
title: "Tokens, standards and real applications"
status: drafting
owner: "Director of Education"
reading_time: "20 min"
sources:
  - name: "ethereum.org — ERC-20 token standard"
    url: "https://ethereum.org/developers/docs/standards/tokens/erc-20/"
    label: "Reuse"
  - name: "ethereum.org — ERC-721 token standard"
    url: "https://ethereum.org/developers/docs/standards/tokens/erc-721/"
    label: "Reuse"
  - name: "ethereum.org — ERC-1155 token standard"
    url: "https://ethereum.org/developers/docs/standards/tokens/erc-1155/"
    label: "Reuse"
  - name: "ethereum.org — Oracles"
    url: "https://ethereum.org/developers/docs/oracles/"
    label: "Reuse"
  - name: "EIPs"
    url: "https://eips.ethereum.org/"
    label: "Reuse"
---

# Week 3 · Part 4 — Tokens, standards and real applications

You deployed a contract that remembers a message. Change what it remembers to
*"who owns how much"* and you have built a token.

That is genuinely the whole idea. [Week 1 Part 5](../week-1/part-5-crypto-asset-map.md)
said a token is a contract's ledger. Now you have written a contract, so that
sentence means something concrete.

::: important The question this page answers
**Why can wallets, explorers and DApps interact with many different tokens
without learning a completely new interface each time?**

Because token standards give them a common **interface**.
:::

## Learning objectives

- Explain what a token standard is and why it enables interoperability
- Distinguish ERC-20, ERC-721 and ERC-1155 by what they track
- Connect each standard to the applications built on it
- Explain what an oracle is for, without describing how one is built

## Core

### Start with the actions people need

Before looking at a Solidity interface, translate the standard into ordinary
questions:

| Human question | ERC-20 function |
|---|---|
| How many tokens does Kai have? | `balanceOf` |
| Send 10 tokens | `transfer` |
| Let this DApp spend up to 10 | `approve` |
| Spend tokens previously approved | `transferFrom` |
| How much is still approved? | `allowance` |

The functions are simply shared names for these actions. The formal interface
comes next.

### A standard is an agreed set of function names

There is nothing magic about ERC-20. It is a list of functions every fungible
token agrees to expose:

```solidity
function balanceOf(address owner) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address from, address to, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function totalSupply() external view returns (uint256);
```

Plus two events, `Transfer` and `Approval`.

A contract that implements the required interface is intended to be ERC-20-compatible.

Before `transferFrom` can work, the token contract's allowance table must contain
a permission written by `approve`:

`approve` → `allowance(owner, spender)` → `transferFrom`

::: tip Why this matters more than it looks
MetaMask does not know your token exists. It does not need to. It calls
`balanceOf(yourAddress)` and displays whatever comes back.

Wallets, exchanges, explorers and DApps can integrate tokens through the same
interface without coordinating a new set of function names for each token. That
is what a standard buys you, and it is one reason the Ethereum ecosystem grew.
:::

::: details Where standards come from
Standards start as **EIPs** — Ethereum Improvement Proposals — argued in public
and published at [eips.ethereum.org](https://eips.ethereum.org/). The ones that
define application-level interfaces are **ERCs**.

ERC-20 was proposed in 2015 by Fabian Vogelsteller. It is short — you can read
the whole thing in ten minutes — and it may be the highest-leverage document in
the industry.
:::

### The three standards

:::: tabs
@tab ERC-20 — fungible

**Every unit is interchangeable.** Your 1 USDC is identical to anyone's 1 USDC.

State is essentially one table:

```solidity
mapping(address => uint256) balances;
```

**What is built on it:** stablecoins (<span class="academy-brand-label"><Icon name="token-branded:usdc" /><strong>USDC</strong></span>, <span class="academy-brand-label"><Icon name="token-branded:usdt" /><strong>USDT</strong></span>), governance tokens (UNI,
AAVE), staking and reward tokens, and much of DeFi.

::: warning Decimals confuse everyone once
ERC-20 has no fractions. Balances are whole numbers, and a `decimals` value says
where to put the point.

USDC uses 6 decimals, so `1000000` means 1 USDC. Most tokens use 18. **A
contract reading a balance without checking `decimals` will be wrong by a factor
of a trillion**, and this has caused real losses.
:::

@tab ERC-721 — non-fungible

**Every unit is distinct.** Token #1 and token #2 are different things with
different owners.

The state flips around:

```solidity
mapping(uint256 => address) owners;   // token id -> owner
```

**What is built on it:** NFT collections, ENS domain names, event tickets,
in-game items, credentials, and records of ownership for real-world assets.

::: warning The image is usually not on-chain
[Week 1 Part 5](../week-1/part-5-crypto-asset-map.md) flagged this. Now you can
see exactly why: storing an image in contract state would cost a fortune in gas.

Many ERC-721 projects use the metadata extension, including `tokenURI`, to point
to a token's metadata — often a name, description and media reference. Metadata
and media are commonly stored off-chain or content-addressed, but some projects
use different designs, including storing more information on-chain. If the
service holding off-chain data goes away, the token can remain while the picture
does not.

**When you evaluate an NFT project, checking where the metadata actually lives
is a real question**, not a technicality.
:::

@tab ERC-1155 — both

One contract managing **many token types at once**, fungible or not.

```solidity
mapping(uint256 => mapping(address => uint256)) balances;  // id -> owner -> amount
```

Designed for games: one contract holding 10,000 identical health potions
(fungible), 50 rare swords (semi-fungible) and 1 unique artifact
(non-fungible) — with batch transfers so you can move a whole inventory in one
transaction instead of twenty.

More efficient, more complex. You are unlikely to need it in Foundation.
::::

### From standards to applications

Now connect each standard to what people actually build.

| Standard | Enables | Because |
|---|---|---|
| **ERC-20** | Stablecoins, DEXs, lending, governance | Interchangeable units can be pooled, priced and lent |
| **ERC-721** | Digital ownership, ENS, tickets, credentials | Distinct units can represent one specific thing |
| **ERC-1155** | Game inventories, mixed collections | One contract, many types, batch operations |

Three application shapes are worth recognising:

**DEX — a smart-contract exchange.** For example, <span class="academy-brand-label"><Icon name="token-branded:uniswap" /><strong>Uniswap</strong></span> uses pooled assets rather than an order book at a company, and swaps
between them by a formula. Users do not first deposit into the DEX as they would
with a custodial exchange; they approve the token contract and call the DEX,
subject to the protocol's design.

**Lending protocol — smart-contract borrowing.** A protocol such as <span class="academy-brand-label"><Icon name="token-branded:aave" /><strong>Aave</strong></span> lets users deposit collateral and borrow against it. If collateral falls too far in value, anyone can trigger a
liquidation — remember from [Part 1](./part-1-what-is-a-smart-contract.md) that
the contract cannot act alone, so a bot does it and takes a fee.

**Oracle — outside data brought in.** A lending protocol needs a price. [Week 2
Part 3](../week-2/part-3-why-ethereum-and-evm.md) explained why a contract cannot
fetch one: it must be deterministic, so it cannot read the internet.

::: important So a price has to be *put on-chain by a transaction* first
That is what an oracle is: a service that writes external data on-chain so
contracts can read it, with every node seeing the identical value.

And it is why [Week 2 Part 6](../week-2/part-6-trust-and-risk-map.md) put the
oracle in its own row. **The contract can be flawless and the input still
wrong.**
:::

::: warning Deliberately not covered
**How AMM pricing maths works.** **How liquidation thresholds are calculated.**
**How oracle networks reach agreement.**

These are genuinely interesting and they are Further Exploration or Semester 2.
You need to know what these things are *for* and what they add to your trust
map. That is enough for Foundation.
:::

## Landscape

- **EIP / ERC** — public improvement proposals; ERCs are the application-level proposals that define common interfaces. A shared interface helps tools recognise a token without deciding whether it is trustworthy
- **`approve` / `transferFrom`** — the two-step pattern letting a contract move your tokens after you grant permission. [Part 5](./part-5-security-and-approvals.md)
- **`tokenURI` / metadata** — the token's record often points to name and image details stored elsewhere. The token and the media it points to are not the same thing
- **IPFS** — a way to refer to content by a fingerprint of its contents, often used for NFT metadata. Changed content gets a different reference, but the file is not guaranteed to stay available
- **Mint / burn** — creating and destroying units. A contract's rules decide who can do this and what it means for supply
- **ERC-4626** — a standard for tokenised vaults that put deposits into a strategy. Common functions make them easier for applications to use, but the strategy still carries risk
- **Token allowlists** — a project or exchange's chosen set of supported tokens. This is why an exchange listing is a business decision, not a technical one
- **Rebasing tokens** — tokens whose displayed balances can change without an ordinary transfer. Integrations that assume balances only change through transfers can display or account for them incorrectly

## Worked example

Read a real token's storage without reading its code.

Open the <span class="academy-brand-label"><Icon name="token-branded:usdc" /><strong>USDC</strong></span> contract on Etherscan — `0xA0b8…eB48`, the address from
[Week 2 Part 3](../week-2/part-3-why-ethereum-and-evm.md) — and open **Read
Contract**.

| Call | What comes back | What it tells you |
|---|---|---|
| `name()` | USD Coin | Display name only. **Not proof of anything** |
| `symbol()` | USDC | Same |
| `decimals()` | 6 | Divide raw balances by 1,000,000 |
| `totalSupply()` | A very large number | Total units in existence, in raw form |
| `balanceOf(addr)` | A number | That address's holdings, in raw form |

::: danger `name()` is just a string somebody chose
Anyone can deploy a contract that returns `"USD Coin"` and `"USDC"`. It costs a
few cents and takes five minutes — you now have the skills to do it yourself.

**For a token on a particular network, its practical identity is the network
plus its contract address.** Names, symbols and logos can be copied: fake-token
scams use the same name, symbol or logo at a different address.

Always verify the address against the issuer's official documentation. Never
trust a token because a website or a message told you its name.
:::

Now look at the **Contract** tab. USDC is verified, so you can read its actual
source — and you will find it is not a simple ERC-20. It has pause functions and
a blocklist.

That is not a criticism. It is the concrete form of the trust assumption
[Week 1 Part 5](../week-1/part-5-crypto-asset-map.md) described: a regulated
issuer can freeze addresses. **You can now go and read the code that does it**,
which is a genuinely different position from being told about it.

::: details Further exploration — optional, not assessed
- [ERC-20](https://ethereum.org/developers/docs/standards/tokens/erc-20/) · [ERC-721](https://ethereum.org/developers/docs/standards/tokens/erc-721/) · [ERC-1155](https://ethereum.org/developers/docs/standards/tokens/erc-1155/) — the standards themselves
- [OpenZeppelin's ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) — the most-copied contract in the industry, and readable
- **AMM maths, liquidation mechanics, oracle design** — the real depth, deliberately out of scope here
:::

::: details Sources and attribution
- [ethereum.org — ERC-20 token standard](https://ethereum.org/developers/docs/standards/tokens/erc-20/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — ERC-721 token standard](https://ethereum.org/developers/docs/standards/tokens/erc-721/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — ERC-1155 token standard](https://ethereum.org/developers/docs/standards/tokens/erc-1155/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Oracles](https://ethereum.org/developers/docs/oracles/) — Reuse (CC BY 4.0), adapted
- [EIPs](https://eips.ethereum.org/) — Reuse (CC0), referenced

*Named tokens are illustrative examples, not recommendations.*
:::
