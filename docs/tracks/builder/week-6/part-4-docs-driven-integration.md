---
track: builder
week: 6
day: 4
title: "Docs-driven integration"
status: drafting
owner: "Education Team"
reading_time: "60 min hands-on"
points: 100
sources:
  - name: "Chainlink — Data Feeds"
    url: "https://docs.chain.link/data-feeds"
    label: "Link"
  - name: "Chainlink — Using Data Feeds on EVM chains"
    url: "https://docs.chain.link/data-feeds/using-data-feeds"
    label: "Link"
  - name: "Chainlink — Price Feed contract addresses"
    url: "https://docs.chain.link/data-feeds/price-feeds/addresses"
    label: "Link"
  - name: "Chainlink — Data Feeds API reference"
    url: "https://docs.chain.link/data-feeds/api-reference"
    label: "Link"
  - name: "Circle — USDC contract addresses"
    url: "https://developers.circle.com/stablecoins/usdc-contract-addresses"
    label: "Link"
  - name: "viem — readContract"
    url: "https://viem.sh/docs/contract/readContract"
    label: "Link"
  - name: "viem — formatUnits"
    url: "https://viem.sh/docs/utilities/formatUnits"
    label: "Link"
  - name: "Blockchain@NTU Academy Builder starter"
    url: "https://github.com/Blockchain-NTU-SG/academy-builder-starter"
    label: "Reuse"
---

<!--
Author note (Education team): the task primitive is Chainlink Data Feeds
(ETH / USD on Ethereum Sepolia). The worked example deliberately uses a
different primitive (Circle's USDC) so the page teaches the method without
walking learners through the task. Do not add the feed address, ABI or
heartbeat to this page. The model answer and reviewer notes are kept outside
the public handbook.
-->

# Week 6 · Part 4 — Docs-driven integration

> **Core question — how do I add a tool nobody taught me, using only its
> documentation, without trusting anything I have not checked?**

Everything you used in Week 5 came with an Academy walkthrough. Real projects
do not work like that. You pick a protocol, a token or a data service, open its
docs, and work it out yourself.

This Part teaches a method for doing that quickly: answer five questions from
the docs, then check each answer against the chain before you build on it.

::: tip Picture a new city's metro
You do not need a guide to use a metro you have never seen. You find the map,
the line you need, the ticket rules and the last train time, then you ride it
once to make sure it goes where the map says.

Where the picture stops: a metro map is rarely wrong. Docs often are. They go
out of date, show mainnet by default, or leave out the one detail you need.
That is why the "ride it once" step matters more here.
:::

## The hard skill

**Integrate an unfamiliar Web3 component from its official documentation, and
check every assumption against how it really behaves.**

After this Part you can:

- find the network, address and interface you need in a docs site;
- tell the parts of a tool you need from the parts you can ignore;
- turn a docs example written for another library into viem code;
- prove that what the docs say matches the deployed contract.

## Core / reference material

### Five questions to answer from the docs

Whatever the tool is, you need the same five answers before you write code.

| Question | Why it matters | Where it usually is |
|---|---|---|
| 1. Which network and address? | The wrong network or address gives "returned no data" (you met this in [Part 2](./part-2-simulation-debugging-and-tracing.md)) | An "addresses" or "deployments" page, often with a network selector |
| 2. Which functions do I need? | You need the ABI for those functions, and nothing else | An API reference, an interface file or a code example |
| 3. What units come back? | A number without its units is meaningless | `decimals()` or a note in the reference |
| 4. How fresh is the data? | External data may update only when its update rules trigger, not on every block | Update rules, timestamps returned with the data |
| 5. What can go wrong? | Every tool has limits and failure cases | Warnings, "best practices" or "risks" pages |

Write the answers down as you find them. That list becomes your **docs log**,
and it is half of this Part's evidence.

### Take only what you need

Docs describe everything a tool can do. You usually need one small slice.

Start from the single thing you want to show or do, then work backwards: which
function gives me that, and what does that function need? A token contract may
have twenty functions. To show a balance you need two of them.

### Translate examples into viem

Docs often show examples in Solidity, ethers.js or web3.js rather than viem.
The library changes, but three pieces always carry over: the **address**, the
**ABI** (or the function signature) and the **function name**.

| In the docs example | In your viem code |
|---|---|
| `new web3.eth.Contract(abi, address)` | nothing to create; pass `address` and `abi` to each call |
| `contract.methods.someFunction().call()` | `client.readContract({ address, abi, functionName: 'someFunction' })` |
| A JSON ABI copied from the page | the same JSON, or `parseAbi([...])` with only the functions you use |

Results that the docs print as numbers come back from viem as `bigint`,
JavaScript's integer type for values that must stay exact beyond the safe range
of an ordinary `Number`. Format them with
`formatUnits(value, decimals)` rather than dividing by hand.

### Separate provenance from on-chain behaviour

Official documentation and on-chain inspection answer different questions.
The official deployment source tells you which component and address you intend
to use and what its interface means. On-chain inspection tells you what code
and state exist at that address on a particular network and block. If the two
sources disagree, stop and investigate rather than blindly trusting either
one.

For a token, the provenance-first workflow is:

1. Get the network-specific address from the official deployment list.
2. Inspect that address on-chain.
3. Optionally cross-check the explorer's verified source and metadata.

The following commands check properties of the address; they do **not** prove
that a malicious contract is the authentic token. A fake contract can return
`USDC` and `6` too.

```bash
# Is there a contract at this address on this network? "0x" means no.
cast code <address> --rpc-url $RPC_URL

# What decimals does this deployed contract report?
cast call <address> "decimals()(uint8)" --rpc-url $RPC_URL

# What symbol does this deployed contract report?
cast call <address> "symbol()(string)" --rpc-url $RPC_URL
```

Record which source answered each question in your docs log: provenance comes
from the official deployment source; these calls verify code and state at the
selected address. A successful call does not prove the address's source
identity; a fake contract can report the same metadata.

### Worked example: show USDC amounts correctly

**Goal:** the app should show a USDC amount on Sepolia correctly. We use the
five questions on Circle's docs.

**1. Network and address.** Circle's
[USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses)
page has a Testnet table. Its Ethereum Sepolia row gives
`0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`.

**2. Functions.** USDC is an ERC-20, so it has the standard ERC-20 functions.
To show an amount we need `symbol` and `decimals` (and `balanceOf` to read a
balance). viem already ships an `erc20Abi`, so there is nothing to copy.

**3. Units.** The addresses page does not mention decimals. You saw in
[Week 3 Part 4](../../../foundation/week-3/part-4-tokens-and-standards.md)
that USDC uses 6, but here we check rather than remember. Token balances are
stored as integers in base units; `decimals` tells the app where to place the
display point. With 6 decimals, `20 USDC` is `20,000,000` base units, and
`bigint` keeps that integer exact.

**4. Freshness.** A token balance does not have a separate oracle-style
heartbeat or staleness model. A normal read returns the state at the latest
block the selected RPC is serving, unless you explicitly query a historical
block. For this use case, there is no separate freshness threshold to
calculate as there is for an external price feed; the RPC can still lag, so
the block context matters when freshness is important.

**5. What can go wrong.** The address is for Sepolia only. On another network
it is a different contract or nothing at all.

**Check against the chain.** Run from your starter repository, with `.env`
loaded (`source .env`):

```bash
cast code 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 --rpc-url $RPC_URL
cast call 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 "decimals()(uint8)" --rpc-url $RPC_URL
```

The first prints a long bytecode string starting `0x6080…`, so a contract is
there. The second prints `6`.

**Build the smallest working version.** A script in `scripts/usdc.ts`:

```ts
import { erc20Abi, formatUnits, parseUnits } from 'viem'
import { client, requireSepolia } from './client.js'

// Circle docs → USDC contract addresses → Testnet → Ethereum Sepolia
const usdc = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'

async function main() {
  await requireSepolia()
  if (!await client.getCode({ address: usdc })) throw new Error('No contract at this address on Sepolia.')

  const [symbol, decimals] = await Promise.all([
    client.readContract({ address: usdc, abi: erc20Abi, functionName: 'symbol' }),
    client.readContract({ address: usdc, abi: erc20Abi, functionName: 'decimals' }),
  ])
  console.log(`${symbol} has ${decimals} decimals`)

  const twenty = parseUnits('20', decimals)
  console.log(`20 ${symbol} on-chain = ${twenty} units`)
  console.log(`${twenty} units read with 18 decimals = ${formatUnits(twenty, 18)} ${symbol}`)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
```

Run it with `npx tsx scripts/usdc.ts`:

```text
USDC has 6 decimals
20 USDC on-chain = 20000000 units
20000000 units read with 18 decimals = 0.00000000002 USDC
```

The last line is the bug you avoid by checking. Had we assumed 18 decimals,
every amount in the app would be wrong by a factor of a trillion, and nothing
would have crashed to warn us.

**Docs log:**

| Question | Answer | Where I found it | How I checked it |
|---|---|---|---|
| Network and address | Sepolia, `0x1c7D…7238` | Circle, USDC contract addresses, Testnet table | `cast code` returns bytecode |
| Functions | `symbol`, `decimals` (`balanceOf` for balances) | ERC-20 standard; viem's `erc20Abi` | The script reads both |
| Units | 6 decimals | Not on the page | `cast call … decimals()` returns `6` |
| Freshness | Latest state served by the selected RPC | Token balances have no oracle heartbeat; note the block context if needed | Normal read; query a historical block only when required |
| What can go wrong | Address only valid on Sepolia | Circle's table lists one address per network | Script refuses other chains via `requireSepolia()` |

Notice the distinction: docs establish the intended deployment and interface;
the chain checks the selected address's actual code and state.

### Oracle vocabulary

The task uses a different kind of external component. A **data feed** is a
contract interface that exposes a value such as ETH / USD. An **oracle** is the
system that brings information from outside the chain into that contract. A
feed's **timestamp** tells you when the returned answer was produced or
recorded. A Chainlink Data Feed is a **push-style oracle**: the oracle network
writes new answers on-chain according to feed-specific update rules, commonly
when the observed value moves beyond a **deviation threshold** or when the
**heartbeat** interval is reached. A deviation threshold means sufficient
movement can trigger an update earlier; a heartbeat is the maximum intended
interval before an update when movement is small. These values differ between
feeds and networks, so look up the actual configuration in the official docs.
**Stale data** is an answer older than the freshness rule your application
accepts.

The age check is therefore an application decision: read the answer and its
timestamp, compare the age with the documented heartbeat plus a margin, and
show a warning when the result is too old. A fresh timestamp does not prove
that the price is economically correct; it only answers the freshness question.

::: details Landscape — push and pull oracles
The feed in this Part's task is a **push** oracle: the oracle network writes a
new answer on-chain when its deviation or heartbeat rules call for an update,
and anyone can read the latest one. Some newer oracles are **pull** based: the
app fetches a signed price off-chain and submits it with its own transaction,
so the price is only written when someone needs it. The method on this page
works for both. Only the answers to the five questions change.
:::

## Hands-on task

Add a live **ETH / USD price from Chainlink Data Feeds** to your Week 5 app on
Ethereum Sepolia. Work only from
[Chainlink's official docs](https://docs.chain.link/data-feeds) and the viem
docs. There is no Academy walkthrough for this one.

Your app must:

1. **Show the current ETH / USD price**, read from the Chainlink feed with
   viem. Format it using the feed's own `decimals()`, read from the contract
   rather than typed in.
2. **Show how old the price is**, and display a clear warning when it is older
   than the feed's heartbeat plus a margin you choose. Explain your margin in
   one sentence.
3. **Use the price for something:** show the connected account's Sepolia ETH
   balance in US dollars.

Then write a **docs log** like the worked example's, answering the five
questions for the feed. At least two rows must include a check against the
real feed, with the command or code you ran and what it returned.

A few tips:

- Chainlink's addresses page opens on mainnet. Look for the network selector.
- The docs' JavaScript example uses web3.js. Translate it into viem rather
  than adding another library.
- The feed's past answers are on-chain too. Comparing the timestamps of a few
  recent rounds shows how often it really updates.

**Out of scope:** reading the feed from a Solidity contract, other feeds or
networks, mainnet, extra npm packages, and redesigning your app.

::: tip Use AI as a pair, not a replacement
An AI assistant can help translate the web3.js example. It cannot tell you the
feed's address, units or update rules for certain, because those change.
Every answer in your log must come from the docs or the chain.
:::

## Evidence required

- Your code (a link to your branch or commit, or the diff).
- One screenshot of your app showing the price, its age and your balance in
  US dollars.
- Your docs log, with at least two rows checked against the real feed.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

::: details Further exploration — optional, not assessed
- Read the same feed inside a Solidity contract, and test it in Foundry with a
  mock feed so you control the price and the timestamp.
- Prove your stale warning works: run your app against an Anvil fork of
  Sepolia, move time forward with `cast rpc evm_increaseTime 7200` and
  `cast rpc evm_mine`, then reload.
- Show a second feed, such as BTC / USD, and see how much of your code you can
  reuse.
:::

::: details Sources and attribution
- [Chainlink — Data Feeds](https://docs.chain.link/data-feeds) — Link, referenced only
- [Chainlink — Using Data Feeds on EVM chains](https://docs.chain.link/data-feeds/using-data-feeds) — Link, referenced only
- [Chainlink — Price Feed contract addresses](https://docs.chain.link/data-feeds/price-feeds/addresses) — Link, referenced only
- [Chainlink — Data Feeds API reference](https://docs.chain.link/data-feeds/api-reference) — Link, referenced only
- [Circle — USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses) — Link, referenced only
- [viem — readContract](https://viem.sh/docs/contract/readContract) — Link, referenced only
- [viem — formatUnits](https://viem.sh/docs/utilities/formatUnits) — Link, referenced only
- [Blockchain@NTU Academy Builder starter](https://github.com/Blockchain-NTU-SG/academy-builder-starter) — Reuse (MIT), the `client.ts` helper used in the worked example
:::
