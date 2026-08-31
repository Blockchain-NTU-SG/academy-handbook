---
week: 3
day: 1
title: "What a smart contract actually is"
status: drafting
owner: "Director of Education"
reading_time: "20 min"
sources:
  - name: "ethereum.org — Introduction to smart contracts"
    url: "https://ethereum.org/developers/docs/smart-contracts/"
    label: "Reuse"
  - name: "ethereum.org — Anatomy of smart contracts"
    url: "https://ethereum.org/developers/docs/smart-contracts/anatomy/"
    label: "Reuse"
  - name: "ethereum.org — Dapps"
    url: "https://ethereum.org/dapps/"
    label: "Reuse"
---

# Week 3 · Part 1 — What a smart contract actually is

[Week 2 Part 3](../week-2/part-3-why-ethereum-and-evm.md) told you a contract is
an account made of code. That is accurate and it is not yet useful.

::: important The plain-English version
**A smart contract is a program deployed at an address on the blockchain.
People and applications interact with the functions it exposes, and the
network executes the same rules for each call.**

Some functions may be open to everyone, while others use permission checks.
Some contracts are immutable; others include admin or governance controls that
can change parts of their behaviour.
:::

The name is misleading twice over: it is not a legal contract, and it is not
especially smart. It is a small program with unusual properties.

## Learning objectives

- Explain what a smart contract is without using the word "contract"
- Describe what state, functions and events are, and how they relate
- Explain why "code is law" cuts both ways
- Recognise the shape of a contract before you can write one

## Core

### What makes it unusual

An ordinary program runs on a computer someone controls. A smart contract is
executed by the network's nodes according to its deployed code and rules.

| Dimension | Ordinary program | Smart contract |
|---|---|---|
| Runs on | A server someone owns | Every node, identically |
| Who can change it | The owner, any time | It may be immutable, or changeable through an admin or upgrade mechanism |
| Who can read the code | Whoever is given it | Deployed bytecode is public; human-readable source is easiest to inspect when verified |
| Who can call it | Whoever is allowed | Functions may be open or restricted by their rules |
| If it has a bug | Patch and redeploy | It keeps running the bug |

That fourth row is the one people underestimate. **A deployed contract is
public infrastructure whether or not you intended it to be.** Anyone can call any
function you left callable, in any order, at any time, including in ways you
never imagined.

::: warning "Code is law" cuts both ways
When deployed code cannot be changed, the same immutability that stops someone
rewriting your balance also stops anyone fixing a mistake. There is no support
line, no rollback, and no
"obviously that wasn't the intent."

This is why [Part 5](./part-5-security-and-approvals.md) exists, and why real
deployments get audited.
:::

### The three things a contract has

Almost every contract you will ever read is made of these.

<div class="academy-figure">
  <div class="academy-figure-surface">

![A smart contract container holding stored state, functions, and an outward broadcast for events. An external call enters from the left.](/illustrations/w3-contract-anatomy.png)

  </div>
  <p class="academy-figure-caption"><strong>State</strong> it remembers, <strong>functions</strong> it can run, <strong>events</strong> it announces outward. Note the arrow: nothing happens until something calls in from outside.</p>
</div>

**State** is what the contract remembers between calls. It is stored on-chain,
and changing it costs gas. Updates become part of the chain's history, even when
the current value changes. A token contract's state is mostly one big table of
who owns how much.

**Functions** are what the contract can do. They split exactly the way
[Week 2 Part 4](../week-2/part-4-transactions-and-gas.md) described:

| Request type | Read | Write |
|---|---|---|
| Changes state | No | Yes |
| Costs gas | No | Yes |
| Needs a signature | No | Yes |
| Example | "What is my balance?" | "Send 10 tokens to Ben" |

**Events** are announcements. The contract cannot read them; applications
outside can. Standard ERC-20 token transfers are typically surfaced through
`Transfer` events that wallets and explorers index.

### A contract needs a trigger

Worth repeating from [Week 2 Part 3](../week-2/part-3-why-ethereum-and-evm.md),
because it explains so much:

::: important Execution needs a trigger
A contract has no key of its own and does not sign or submit an ordinary
transaction by itself. It cannot run on a timer or see the internet; something
else must trigger its execution.

When a protocol appears to act automatically — a loan liquidated the moment
collateral drops — something off-chain is watching and sending that transaction.
Often a bot or service is paid a fee for doing it.
:::

### How a DApp uses a contract

Most DApps connect an ordinary interface to a contract through an RPC node.
The path depends on what you are doing:

| Action | Typical path | What happens |
|---|---|---|
| Read | Interface → RPC node → contract | The application requests current state; no wallet signature is needed |
| Write | Interface → wallet → RPC node → transaction → contract | Your wallet signs a state-changing transaction, which the network executes |

Contracts can also emit **events** after a write. An off-chain indexer may read
those events and format them into the history or activity view you see in the
interface. The full architecture appears in
[Week 2 Part 5](../week-2/part-5-l1-l2-and-bridges.md); the important idea here is
that the contract is the on-chain rule-set, not the whole application.

### What contracts are good at, and bad at

| Good at | Bad at |
|---|---|
| Holding and moving assets by rules | Anything needing outside data |
| Enforcing conditions nobody can override | Anything private |
| Coordinating strangers without a middleman | Anything needing human judgement |
| Being verifiable by anyone | Being changed after a mistake |
| Composing with other contracts | Large computation — gas makes it expensive |

The right-hand column is the useful one. Most failed blockchain projects tried to
do something in the right column.

## Landscape

- **Deployment** — the transaction that puts a contract's code on-chain and gives it an address. That address is where later calls find the program
- **Constructor** — code that runs once at deployment, then never again. It sets the contract's starting values
- **ABI** — the description of how to call a contract's functions. Applications use it to turn a human action into the right request; see [Part 2](./part-2-solidity-minimum.md)
- **Verified source** — publishing the source so anyone can check it matches the deployed bytecode. This makes the intended code easier to inspect, not automatically safe
- **Immutable vs upgradeable** — some contracts can be replaced behind a proxy. An upgrade can fix bugs, but also gives the upgrade controller continuing power
- **Composability** — contracts calling contracts. It lets applications combine building blocks, but connected failures can spread
- **Reentrancy** — a classic bug class where a called contract calls back before the first finishes. If state is updated too late, an attacker may repeat an action before the balance is corrected; see [Part 5](./part-5-security-and-approvals.md)

## Worked example

A vending machine is the analogy everyone uses. It is worth using carefully,
because the way it *breaks* is the instructive part.

**Where it holds.** Put in the right coins, the machine gives you the item. No
shopkeeper decides whether you deserve it. The rules are visible and identical
for everyone.

**Where it breaks:**

| Vending machine | Smart contract |
|---|---|
| Owner can restock, fix, or unplug it | Its deployed rules may be immutable, or may include upgrade controls |
| Only the person standing there uses it | Anyone who can reach an open function can call it |
| Jam it and you lose a dollar | A flaw can drain everything at once |
| Physical presence limits abuse | **The attacker can be a program, calling a million times** |

::: important The lesson the analogy hides
A vending machine's bugs are bounded by physics. A contract's bugs are bounded by
nothing.

That is why every remaining page this week keeps returning to security — not
because contracts are dangerous to *learn*, but because deploying one is
publishing something that anyone can poke, forever.
:::

::: details Further exploration — optional, not assessed
- [ethereum.org — Introduction to smart contracts](https://ethereum.org/developers/docs/smart-contracts/) — the same ground, more formally
- [ethereum.org — Anatomy of smart contracts](https://ethereum.org/developers/docs/smart-contracts/anatomy/) — state, functions, events and modifiers in detail
- Open any verified contract on Etherscan and skim its **Read Contract** tab. You are not expected to follow it yet — notice that you *can see it at all*
:::

::: details Sources and attribution
- [ethereum.org — Introduction to smart contracts](https://ethereum.org/developers/docs/smart-contracts/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Anatomy of smart contracts](https://ethereum.org/developers/docs/smart-contracts/anatomy/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Dapps](https://ethereum.org/dapps/) — Reuse (CC BY 4.0), adapted
:::
