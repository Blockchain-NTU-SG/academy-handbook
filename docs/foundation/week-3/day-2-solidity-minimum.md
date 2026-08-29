---
week: 3
day: 2
title: "The minimum Solidity you need"
status: drafting
owner: "Director of Education"
reading_time: "18 min"
sources:
  - name: "Solidity documentation"
    url: "https://docs.soliditylang.org/"
    label: "Link"
  - name: "Solidity by Example"
    url: "https://solidity-by-example.org/"
    label: "Link"
  - name: "ethereum.org — Anatomy of smart contracts"
    url: "https://ethereum.org/developers/docs/smart-contracts/anatomy/"
    label: "Reuse"
  - name: "OpenZeppelin Contracts"
    url: "https://github.com/OpenZeppelin/openzeppelin-contracts"
    label: "Reuse"
---

# Week 3 · Part 2 — The minimum Solidity you need

::: important This is not a programming course
The goal is **enough Solidity to read a simple contract and deploy one** — not
to make you a developer. If you have never written code, you can still complete
this week. Everything you need is on this page.

If you already program, this will feel slow. [Part 3](./day-3-remix-lab.md) is
where it gets hands-on.
:::

## Learning objectives

- Read a short Solidity contract and say what it does
- Identify state variables, functions, events and visibility
- Explain what `view` means and why it is free
- Explain what an ABI is and why applications need one

## Core

### One contract, fully explained

Here is a complete, working contract. Twenty lines. We will take it apart.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Guestbook {
    string public message;
    address public lastVisitor;
    uint256 public visitCount;

    event MessageChanged(address indexed visitor, string newMessage);

    constructor() {
        message = "Hello from Blockchain@NTU";
    }

    function setMessage(string calldata newMessage) external {
        message = newMessage;
        lastVisitor = msg.sender;
        visitCount = visitCount + 1;
        emit MessageChanged(msg.sender, newMessage);
    }

    function getMessage() external view returns (string memory) {
        return message;
    }
}
```

That is the contract you will deploy tomorrow. Read it once more now that you
know it is real.

### Taken apart

:::: tabs
@tab The header

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
```

**`SPDX-License-Identifier`** declares the licence. The compiler warns if it is
missing. `MIT` is a permissive open-source licence — the same one the Academy
handbook's tooling uses.

**`pragma solidity ^0.8.20`** says which compiler versions this code accepts.
The `^` means "0.8.20 or any later 0.8.x". Version matters more here than in
most languages, because compiler behaviour has changed in ways that affect
safety.

@tab State

```solidity
string public message;
address public lastVisitor;
uint256 public visitCount;
```

These are **state variables** — what the contract remembers, stored on-chain,
persisting between calls.

| Type | Holds |
|---|---|
| `string` | Text |
| `address` | A `0x` address, 20 bytes |
| `uint256` | A whole number, zero or positive |
| `bool` | True or false |
| `mapping(address => uint256)` | A lookup table — this is how token balances are stored |

**`public`** does something genuinely useful: Solidity automatically creates a
free read function for it. Declaring `message` public means anyone can call
`message()` and get the value, without you writing that function.

@tab Events

```solidity
event MessageChanged(address indexed visitor, string newMessage);
```

An **event** is an announcement written to the transaction log. The contract
cannot read it back — it exists for applications watching from outside.

**`indexed`** makes a field searchable. Applications can ask "every
`MessageChanged` where visitor was `0xABC…`" cheaply. You get up to three indexed
fields.

Events are emitted with `emit`, and they are far cheaper than storing the same
data in state.

@tab Functions

```solidity
function setMessage(string calldata newMessage) external {
    message = newMessage;
    lastVisitor = msg.sender;
    visitCount = visitCount + 1;
    emit MessageChanged(msg.sender, newMessage);
}
```

A **write** function. It changes state, so it costs gas and needs a signed
transaction.

**`msg.sender`** is the address that called this function. It is one of the most
important things in Solidity — it is how a contract knows *who* is asking, and
it is the basis of every permission check you will ever read.

```solidity
function getMessage() external view returns (string memory) {
    return message;
}
```

A **read** function. **`view`** promises it does not change state — so a normal
read through Remix or a wallet does not create an on-chain transaction or pay a
transaction fee. It may still depend on a node response, as
[Week 2 Part 4](../week-2/day-4-transactions-and-gas.md) described.

@tab Visibility

Who is allowed to call a function.

| Keyword | Callable by |
|---|---|
| `public` | Anyone, inside or outside |
| `external` | Designed to be called from outside the contract |
| `internal` | Only this contract and ones inheriting it |
| `private` | Only this contract |

::: danger `private` does not mean secret
It restricts which *code* can call it. **All contract data is publicly readable
on-chain regardless.** Anyone can read a `private` variable's storage directly.

Never put a secret in a contract. There is no such thing.
:::
::::

### The ABI

When Solidity compiles, it produces two things:

| Output | What it is |
|---|---|
| **Bytecode** | The actual program the EVM runs. Unreadable |
| **ABI** | A JSON description of the functions and events — their names, inputs and outputs |

The **ABI (Application Binary Interface)** is how anything outside knows how to
talk to your contract. Your wallet, a website, Etherscan — they all need the ABI
to turn "call `setMessage` with this text" into the bytes a transaction carries.

::: tip This is why "verified source code" matters
Publishing verified source lets Etherscan show human-readable code and a
convenient **Read/Write Contract** interface matched against the deployed
bytecode. Without verified source, the bytecode is still public, but the
original human-readable code and interface are harder to inspect.
:::

### What you can safely skip for now

Real contracts contain more than this. You do not need it this week:

- **Modifiers** — reusable permission checks like `onlyOwner`
- **Inheritance** — building on contracts like OpenZeppelin's
- **`require` / custom errors** — rejecting invalid calls
- **`payable`** — functions that receive ETH
- **Libraries, interfaces, structs, enums**

You will meet `require` and `onlyOwner` when you read a real token in
[Part 4](./day-4-tokens-and-standards.md). That is soon enough.

## Landscape

- **OpenZeppelin** — audited standard implementations. Real projects inherit from these rather than writing tokens from scratch
- **`require` / `revert`** — reject a call and undo everything, refunding unused gas
- **`onlyOwner`** — the most common permission pattern, and a trust assumption worth noticing
- **Reentrancy guard** — protection against a called contract calling back mid-execution
- **`payable` / `receive`** — how a contract accepts ETH
- **Storage vs memory vs calldata** — where data lives during a call. Affects gas
- **Foundry / Hardhat** — professional toolkits. Not needed for Foundation

## Worked example

Read this contract and answer three questions before scrolling.

```solidity
contract Vault {
    address public owner;
    mapping(address => uint256) public deposits;

    constructor() { owner = msg.sender; }

    function deposit() external payable {
        deposits[msg.sender] = deposits[msg.sender] + msg.value;
    }

    function drain() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
```

1. What does it remember?
2. Who can call `drain()`?
3. What is wrong with it?

:::: details Answers
**1.** Two things: `owner`, set once at deployment to whoever deployed it, and
`deposits`, a table of how much each address has put in.

**2. Anyone.** `drain()` is `external` with **no permission check at all**. There
is no `require(msg.sender == owner)`. The name says "owner", the code does not.

**3.** Anyone can call `drain()` and send the entire balance to the caller.
Worse, depositors cannot withdraw — there is no withdraw function, so their
funds are stuck and `deposits` records balances the contract will never honour.

::: important Two lessons in one twenty-line contract
**A variable called `owner` does not create a permission.** Only a check does.
Reading contracts means reading what the code *does*, never what the names
suggest.

And **a missing function is a bug too.** Nothing in this contract is technically
broken — it compiles and runs. It simply cannot do the thing its users assume.
:::
::::

::: details Further exploration — optional, not assessed
- [Solidity by Example](https://solidity-by-example.org/) — short annotated contracts, the fastest way to build fluency
- [Solidity documentation](https://docs.soliditylang.org/) — the reference. Dense; use it to look things up, not to read through
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) — read `ERC20.sol`. It is the most-copied contract in the industry and it is genuinely readable
:::

::: details Sources and attribution
- [Solidity documentation](https://docs.soliditylang.org/) — Link, referenced only
- [Solidity by Example](https://solidity-by-example.org/) — Link, referenced only
- [ethereum.org — Anatomy of smart contracts](https://ethereum.org/developers/docs/smart-contracts/anatomy/) — Reuse (CC BY 4.0), adapted
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) — Reuse (MIT), referenced
:::
