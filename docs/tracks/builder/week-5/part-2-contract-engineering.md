---
track: builder
week: 5
day: 2
title: "Contract engineering"
status: drafting
owner: "Education Team"
reading_time: "50 min hands-on"
points: 100
sources:
  - name: "Solidity docs — Mapping types"
    url: "https://docs.soliditylang.org/en/latest/types.html#mapping-types"
    label: "Link"
  - name: "Solidity docs — Function modifiers"
    url: "https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers"
    label: "Link"
  - name: "Solidity docs — Custom errors"
    url: "https://docs.soliditylang.org/en/latest/contracts.html#custom-errors"
    label: "Link"
  - name: "Solidity docs — Interfaces"
    url: "https://docs.soliditylang.org/en/latest/contracts.html#interfaces"
    label: "Link"
  - name: "Blockchain@NTU Academy Builder starter"
    url: "https://github.com/Blockchain-NTU-SG/academy-builder-starter"
    label: "Reuse"
---

<!--
Author note (Education team): the feature learners add here is tested in
Week 6 Part 1, so the four requirements (state relationship, rule, event,
failure) must stay. The worked example (endorsements) was compiled and checked
against the starter. The model answer and reviewer notes are kept outside the
public handbook.
-->

# Week 5 · Part 2 — Contract engineering

> **Core question — how do I add a real feature to a contract without breaking
> what it already promises?**

In [Week 3 Part 2](../../../foundation/week-3/part-2-solidity-minimum.md) you
read a small contract and changed a line or two. Now you change a real one:
the starter's `Registry`, which every later Part builds on.

A feature is more than a new function. It is new state, rules about who can
change it, a way for apps to notice the change, and a clear failure when
someone tries something they should not.

::: tip Picture adding a room to a house
Adding a room is not just putting up walls. You connect it to the wiring and
plumbing, decide who gets a key, and make sure the old rooms still work.

Where the picture stops: builders can inspect a house after the work is done.
A deployed contract cannot be changed, so you design the rules before it goes
live, not after.
:::

## The hard skill

**Extend a real contract with a feature that adds new state, enforces a rule,
announces changes with an event and fails clearly when misused.**

After this Part you can:

- model a relationship between accounts with a mapping;
- move a repeated check into a modifier;
- reject bad calls with named custom errors;
- design an event for the apps that will read it;
- state the rule your feature must always keep.

## Core / reference material

### Read the contract first

Open `contracts/src/Registry.sol`. It is about 30 lines. Before you add
anything, write down what it already promises:

- each account can set only its own record;
- empty records and records over 140 bytes are rejected;
- only the owner can clear a record;
- every write and clear emits `RecordUpdated`.

Your feature must keep all of these true. The six existing tests check them,
so they must still pass when you finish.

### The tools for this Part

Week 3 skipped these on purpose. Each solves one specific problem.

| Tool | What it solves | Example |
|---|---|---|
| `mapping` | Look up a value by key | `mapping(address => string) public records;` |
| Nested `mapping` | Store a fact about a *pair* of keys | `mapping(address => mapping(address => bool)) public follows;` |
| `struct` | Group several values under one key | `struct Profile { string name; uint64 updatedAt; }` |
| `modifier` | Reuse a check across functions | `modifier onlyOwner() { if (msg.sender != owner) revert NotOwner(); _; }` |
| Custom `error` | Name a failure, cheaply | `error NotOwner();` then `revert NotOwner();` |
| `event` | Tell apps what changed | `event RecordUpdated(address indexed account, string value);` |
| `interface` | Call another contract by its function signatures | `interface IRegistry { function records(address) external view returns (string memory); }` |

Two things worth knowing about mappings: every key exists and starts at zero
(`false`, `0`, `""`), and you cannot loop over a mapping. If you need a list
or a count, you store it yourself.

### Design before you code

For any feature, answer four questions on paper first:

1. **State.** What new facts does the contract need to remember, and keyed by
   what?
2. **Rule.** Who may change those facts, and under what conditions?
3. **Event.** What would an app want to know when they change?
4. **Failure.** What should be rejected, and with which error?

Then write one sentence that must always be true afterwards, called an
**invariant**. For example: *a record is never empty unless the owner cleared
it.* Invariants are what you will test in Week 6.

### Worked example: endorsements

**Feature:** any account can endorse another account's record, once.

**Design:**

| Question | Answer |
|---|---|
| State | Who has endorsed whom (a pair of addresses), and each author's total |
| Rule | Only records that exist can be endorsed. No endorsing yourself. Once per pair |
| Event | `Endorsed(endorser, author, total)`, with both addresses indexed so apps can filter by either |
| Failure | `RecordNotFound`, `CannotEndorseSelf`, `AlreadyEndorsed` |
| Invariant | `endorsements[a]` always equals the number of accounts with `hasEndorsed[x][a] == true` |

**The change** to `contracts/src/Registry.sol`:

```solidity
    error RecordNotFound();
    error CannotEndorseSelf();
    error AlreadyEndorsed();

    /// endorser => author => has this endorser endorsed this author?
    mapping(address => mapping(address => bool)) public hasEndorsed;
    /// author => number of endorsements received
    mapping(address => uint256) public endorsements;
    event Endorsed(address indexed endorser, address indexed author, uint256 total);

    modifier hasRecord(address account) {
        if (bytes(records[account]).length == 0) revert RecordNotFound();
        _;
    }

    function endorse(address author) external hasRecord(author) {
        if (author == msg.sender) revert CannotEndorseSelf();
        if (hasEndorsed[msg.sender][author]) revert AlreadyEndorsed();
        hasEndorsed[msg.sender][author] = true;
        endorsements[author] += 1;
        emit Endorsed(msg.sender, author, endorsements[author]);
    }
```

Notice the order inside `endorse`: all the checks first, then the state
changes, then the event. If any check fails, nothing changes.

**Compile and check nothing broke:**

```bash
npm run compile
forge test
```

```text
Compiler run successful!
Exported shared/contract.ts (chain, address, Foundry ABI).
…
6 tests passed, 0 failed, 0 skipped (6 total tests)
```

`npm run compile` also copied the new ABI into `shared/contract.ts`, so the
scripts and the frontend can now call `endorse` and read `endorsements`.

**What should now be observable:** after Bob endorses Alice, `endorsements(Alice)`
reads `1`, `hasEndorsed(Bob, Alice)` reads `true`, and an `Endorsed` event
with both addresses is in the transaction's logs. Bob endorsing Alice again
reverts with `AlreadyEndorsed`, and nothing changes.

**An open question worth noticing:** if the owner clears Alice's record, her
endorsements stay. Is that right? There is no single answer, but a good
feature makes that choice on purpose and says so.

## Hands-on task

Add **your own** feature to `Registry.sol`. Not endorsements: pick something
else. Your feature must include all four of:

1. **A new state relationship**, such as a mapping, a nested mapping or a struct.
2. **An access or validation rule** that decides who may change it, and when.
3. **An event** that tells an app what changed.
4. **At least one failure condition**, using a custom error.

Ideas if you are stuck: let an account appoint an editor who may update its
record; let accounts follow each other; lock a record so it cannot change for
a set time; count how many times each account has updated its record and cap
it per day.

Keep two things unchanged so later Parts still work: the constructor takes
**no arguments**, and `owner` stays. Run `npm run compile` and `forge test`
when you are done.

You will write proper tests for this feature in
[Week 6 Part 1](../week-6/part-1-testing-contract-behaviour.md). For now, the
existing six tests must still pass.

**Out of scope:** deploying (Part 3 does that), changing the frontend, and
using external libraries such as OpenZeppelin.

::: tip Use AI as a pair, not a replacement
An assistant can suggest syntax. The design table is yours: you must be able to
say why each rule exists and what each error protects against.
:::

## Evidence required

- A link to your diff or commit.
- Output of `npm run compile` and `forge test`, all passing.
- Your design table (state, rule, event, failure, invariant) and two or three
  sentences on what should now be observable on-chain.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

::: details Further exploration — optional, not assessed
- Rewrite one of your checks as a modifier, or one modifier as an inline check,
  and decide which reads better.
- Look at the gas column in `forge test --gas-report` before and after your
  change.
- Write a small interface for your extended Registry and imagine another
  contract calling it. Which of your functions would it need?
:::

::: details Sources and attribution
- [Solidity docs — Mapping types](https://docs.soliditylang.org/en/latest/types.html#mapping-types) — Link, referenced only
- [Solidity docs — Function modifiers](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) — Link, referenced only
- [Solidity docs — Custom errors](https://docs.soliditylang.org/en/latest/contracts.html#custom-errors) — Link, referenced only
- [Solidity docs — Interfaces](https://docs.soliditylang.org/en/latest/contracts.html#interfaces) — Link, referenced only
- [Blockchain@NTU Academy Builder starter](https://github.com/Blockchain-NTU-SG/academy-builder-starter) — Reuse (MIT), the `Registry` contract extended in the worked example
:::
