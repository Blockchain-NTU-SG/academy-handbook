---
track: builder
week: 6
day: 3
title: "Security engineering"
status: drafting
owner: "Education Team"
reading_time: "50 min hands-on"
points: 100
sources:
  - name: "Solidity documentation — Security considerations"
    url: "https://docs.soliditylang.org/en/latest/security-considerations.html"
    label: "Link"
  - name: "OpenZeppelin Contracts — ReentrancyGuard"
    url: "https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard"
    label: "Link"
  - name: "OpenZeppelin Contracts — Ownable"
    url: "https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable"
    label: "Link"
  - name: "Foundry Book — deal cheatcode"
    url: "https://getfoundry.sh/reference/cheatcodes/deal"
    label: "Link"
  - name: "Blockchain@NTU Academy Builder starter"
    url: "https://github.com/Blockchain-NTU-SG/academy-builder-starter"
    label: "Reuse"
---

<!--
Author note (Education team): the lab contract lives on the
w6-3-security-lab branch of the Builder starter repository. It contains more
than one planted weakness; learners only need to find, reproduce and fix one.
Do not list the weaknesses on this page. The model answer and reviewer notes
are kept outside the public handbook.
-->

# Week 6 · Part 3 — Security engineering

> **Core question — my tests pass, so how do I find what they never checked,
> and make sure it cannot come back?**

In [Part 1](./part-1-testing-contract-behaviour.md) you proved the behaviour
you wrote tests for. An attacker does not care about those. They look for the
behaviour nobody thought to test.

In [Week 3 Part 5](../../../foundation/week-3/part-5-security-and-approvals.md)
you learned to be careful about what you approve. This Part moves to the
developer's side: finding a weakness in code, proving it is real, fixing it,
and leaving a test behind so it stays fixed.

::: tip Picture a house inspection
Your passing tests are like checking that the front door locks. A burglar
tries the back window. A security review walks around the whole house and asks
"how else could someone get in?"

Where the picture stops: a house has a few doors and windows. A contract has
every function, every caller and every other contract it talks to. You will
not check everything, so you learn which questions catch the most.
:::

## The hard skill

**Find a weakness in a contract, reproduce it with a test, patch it, and keep
the test as a regression check.**

After this Part you can:

- read a contract function by function with a short list of security questions;
- recognise access-control failures and unsafe external calls;
- turn a suspected weakness into a test that fails because of it;
- patch the weakness and show the same test now passes.

This Part does not make you a smart-contract auditor. Professional audits use
specialised tools and experience far beyond one lesson. The aim is that you
stop shipping the most common mistakes yourself.

## Core / reference material

### Five questions for every function

Go through the contract one function at a time and ask:

1. **Who can call this?** Anyone, only the owner, only one account? Is that
   check actually in the code, or only in the comment?
2. **What does it change?** Which state, and whose?
3. **Does it send ETH or call another contract?** If so, what has already
   changed when that call happens, and what has not changed yet?
4. **What does it trust?** An input, a caller, another contract, a price?
5. **What if it runs twice, or in the middle of itself?**

Most beginner-level weaknesses fail one of these questions.

### Common weaknesses

| Weakness | What goes wrong | Usual defence |
|---|---|---|
| Missing access control | A function meant for the owner, or for one account, can be called by anyone | Check `msg.sender` before doing anything; an `Ownable`-style pattern |
| Unsafe external call (reentrancy) | The contract sends ETH or calls out *before* updating its own state, so the receiver can call back in while the old state is still there | Checks-effects-interactions; a reentrancy guard |
| Approval and permission misuse | A contract can move more than the user meant, or keeps a permission after it should end | Approve exact amounts; revoke when done ([Week 3 Part 5](../../../foundation/week-3/part-5-security-and-approvals.md)) |
| Missing input validation | Zero amounts, empty values, the zero address or huge numbers are accepted | Reject bad input at the top of the function |
| Over-powered admin functions | The owner can do far more than users expect, such as move everyone's funds | Keep admin powers small, visible and documented |

### Checks, effects, interactions

A function that sends ETH or calls another contract should do things in this
order:

1. **Checks:** validate the caller and the inputs.
2. **Effects:** update your own state.
3. **Interactions:** only then send ETH or call another contract.

Why the order matters: sending ETH to a contract runs that contract's code.
If your state is not updated yet, that code can call your function again, and
your function still sees the old state. This is called **reentrancy**.

Picture a cash machine that hands out the money first and only then updates
your balance. If you could press "withdraw" again while the notes are still
coming out, it would pay you again from the same balance. Where that picture
stops: a person cannot do this at a real machine, but a contract can call back
within the same transaction, in a fraction of a second.

### Assumptions are not guarantees

A comment saying `/// only the owner can call this` is an assumption. A line
that reverts when `msg.sender != owner` is a guarantee. Reviewers trust the
second, not the first. The same goes for "users will only send small amounts"
or "nobody will call this from a contract".

### Reproducing a weakness in Foundry

You already have everything you need from Part 1. A reproduction is a test
that describes the **safe** behaviour, so it fails while the weakness exists:

- For an access-control weakness: `vm.prank` an outsider, then
  `vm.expectRevert(...)` the error the contract should give.
- For a weakness involving ETH: use `vm.deal(addr, amount)` to give accounts
  test ETH, then check balances afterwards.
- For reentrancy: write a small attacker contract inside your test file. Its
  `receive()` function runs whenever it is sent ETH, which is where a callback
  would happen.

Once the patch is in, the same test passes. You keep it, and it becomes the
**regression test**: if anyone undoes the fix later, it fails again.

### Worked example

Suppose a teammate adds an owner-only moderation function to the starter's
`Registry`, so the owner can write a record on someone's behalf:

```solidity title="contracts/src/Registry.sol (teammate's addition)"
/// @notice Owner-only moderation: write a record on someone's behalf.
function setRecordFor(address account, string calldata value) external {
    if (bytes(value).length == 0) revert EmptyRecord();
    if (bytes(value).length > 140) revert RecordTooLong();
    records[account] = value;
    emit RecordUpdated(account, value);
}
```

**Find.** Question 1, "who can call this?" The comment says owner-only, but no
line checks the caller. Anyone can overwrite anyone's record.

**Reproduce.** Write a test that describes the safe behaviour:

```solidity title="contracts/test/SetRecordFor.t.sol"
// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test} from "forge-std/Test.sol";
import {Registry} from "../src/Registry.sol";

contract SetRecordForTest is Test {
    Registry registry;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public { registry = new Registry(); }

    function test_RevertWhen_NonOwnerWritesForSomeoneElse() public {
        vm.expectRevert(Registry.NotOwner.selector);
        vm.prank(alice);
        registry.setRecordFor(bob, "not really bob");

        assertEq(registry.records(bob), "");
    }
}
```

*Run it and it fails, which proves the weakness is real:*

```text
Ran 1 test for contracts/test/SetRecordFor.t.sol:SetRecordForTest
[FAIL: next call did not revert as expected] test_RevertWhen_NonOwnerWritesForSomeoneElse() (gas: 38000)
Suite result: FAILED. 0 passed; 1 failed; 0 skipped
```

**Fix.** Add the check the comment promised, as the first line:

```solidity
function setRecordFor(address account, string calldata value) external {
    if (msg.sender != owner) revert NotOwner();
    // ...rest unchanged
}
```

**Regression.** Run `forge test` again. The same test now passes, and the
starter's six still pass:

```text
Ran 1 test for contracts/test/SetRecordFor.t.sol:SetRecordForTest
[PASS] test_RevertWhen_NonOwnerWritesForSomeoneElse() (gas: 18113)
Suite result: ok. 1 passed; 0 failed; 0 skipped
```

That is the whole loop: **find, reproduce, fix, keep the test.** You did not
need to deploy anything or spend any test ETH.

::: details Landscape — tools and libraries you will hear about
- **Static analysers** such as [Slither](https://github.com/crytic/slither)
  scan code for known weakness patterns automatically. They find candidates;
  a person still has to check each one.
- **OpenZeppelin Contracts** provides tested building blocks, such as
  [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable)
  for owner checks and
  [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard)
  for blocking callbacks. Using them is common practice. Understanding what
  they protect against is what this Part is about.
- **Audit contests**, where many reviewers search one codebase for bugs for
  rewards, are where many security researchers start.
:::

## Hands-on task

The lab is on the `w6-3-security-lab` branch of your starter repository. It
adds `TipRegistry`: the Registry, plus tipping. Anyone can send test ETH to
thank the author of a record, and authors withdraw what they have received.

::: danger Local tests only
==`TipRegistry` is deliberately unsafe. Run it only in local Foundry tests.
Never deploy it, and never send it real funds.==
:::

1. **Get the lab.** From your starter repository:

   ```bash
   git fetch origin
   git checkout w6-3-security-lab
   forge test --match-contract TipRegistryTest
   ```

   *All six tests pass.* That does not mean the contract is safe.

2. **Find one weakness.** Read `contracts/src/TipRegistry.sol` with the five
   questions. The contract has more than one weakness; you need one. Write two
   or three sentences: what the weakness is, who could exploit it, and what
   they would gain or break.
3. **Reproduce it.** Add a test in `contracts/test/` that fails because of the
   weakness. Run it and keep the failing output.
4. **Fix it.** Change `TipRegistry.sol` so the weakness is gone, with the
   smallest change that does the job.
5. **Prove the fix.** Run `forge test`. Your new test must pass, and every
   test that passed before your change (the six `TipRegistry` tests and the
   starter's six `Registry` tests) must still pass.

::: details Hint: a test that needs to receive ETH
If your weakness involves sending ETH, your test may need its own small
contract that can receive it:

```solidity
contract Attacker {
    // keep a reference to the target contract here

    receive() external payable {
        // this runs every time the contract is sent ETH:
        // what could it call from here?
    }
}
```

Give accounts test ETH with `vm.deal(addr, 10 ether)`, and check
`address(...).balance` before and after.
:::

**Out of scope:** running audit tools, fixing every weakness in the contract,
gas optimisation, and deploying anything.

::: tip Use AI as a pair, not a replacement
An AI assistant can suggest likely weaknesses. Do not submit one you cannot
reproduce. The failing test is your evidence that the weakness is real, and
the passing test is your evidence that the fix works.
:::

## Evidence required

- Two or three sentences describing the weakness: what it is, who could
  exploit it and what they would gain or break.
- Your test file, and the `forge test` output showing it **failing** before
  the fix.
- Your patch (the diff, or a link to the commit).
- The `forge test` output showing every test **passing** after the fix.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

::: details Further exploration — optional, not assessed
- Find and fix a second weakness in `TipRegistry`, with its own regression
  test.
- Replace your hand-written fix with OpenZeppelin's `ReentrancyGuard` or
  `Ownable`, and check your regression test still passes.
- Read the
  [Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html),
  which cover reentrancy and checks-effects-interactions in more depth.
:::

::: details Sources and attribution
- [Solidity documentation — Security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html) — Link, referenced only
- [OpenZeppelin Contracts — ReentrancyGuard](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard) — Link, referenced only
- [OpenZeppelin Contracts — Ownable](https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable) — Link, referenced only
- [Foundry Book — deal cheatcode](https://getfoundry.sh/reference/cheatcodes/deal) — Link, referenced only
- [Blockchain@NTU Academy Builder starter](https://github.com/Blockchain-NTU-SG/academy-builder-starter) — Reuse (MIT), the `Registry` and the `TipRegistry` lab contract
:::
