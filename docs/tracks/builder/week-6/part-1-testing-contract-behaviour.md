---
track: builder
week: 6
day: 1
title: "Testing contract behaviour"
status: drafting
owner: "Education Team"
reading_time: "45 min hands-on"
points: 100
sources:
  - name: "Foundry Book — Writing tests"
    url: "https://getfoundry.sh/forge/tests/overview"
    label: "Link"
  - name: "Foundry Book — Cheatcodes reference"
    url: "https://getfoundry.sh/reference/cheatcodes/overview"
    label: "Link"
  - name: "Foundry Book — Fuzz testing"
    url: "https://getfoundry.sh/forge/fuzz-testing"
    label: "Link"
  - name: "forge-std"
    url: "https://github.com/foundry-rs/forge-std"
    label: "Link"
  - name: "Blockchain@NTU Academy Builder starter"
    url: "https://github.com/Blockchain-NTU-SG/academy-builder-starter"
    label: "Reuse"
---

<!--
Author note (Education team): this Part uses the Builder starter repository's
Registry contract and its existing Foundry tests as the worked example, so W5
and W6 stay in one codebase. The hands-on task asks learners to test the
feature they added in W5 Part 2, which must include a state change, an
access/validation rule, an event and a failure condition. Keep W5 Part 2 and
this task in step if either changes. The model answer and reviewer notes are
kept outside the public handbook.
-->

# Week 6 · Part 1 — Testing contract behaviour

> **Core question — how do I prove my contract does what I think it does, every
> time, without clicking through it by hand?**

In Week 5 you made things work. "It works" meant you ran it once and saw the
right result. That proof disappears the moment you change a line, and in a real
project lines change every day.

This Part turns *"I checked it once"* into checks that run in seconds, every
time the code changes.

In real Web3 engineering, the same habit protects important boundaries. A
lending protocol might use tests to check that only the intended actor can
trigger a liquidation and that collateral or health-factor thresholds behave
as specified. Those tests provide evidence about the behaviours they cover;
they do not prove that the protocol is safe overall.

::: tip Picture a pre-flight checklist
A pilot does not rely on remembering to check the fuel. The same list is run the
same way before every flight. A test suite is that list for your contract.

Where the picture stops: a checklist only covers what someone wrote down. Tests
prove the behaviours you wrote tests for, not that the contract is safe overall.
Finding what nobody thought to test is the job of Part 3, Security engineering.
:::

## The hard skill

**Turn expected behaviour and failure conditions into repeatable, automated
tests with Foundry.**

After this Part you can:

- test the normal path and check the state it leaves behind;
- prove that a bad call fails, with the exact error you expect;
- check that an event was emitted with the right data;
- choose an edge case worth testing, and check the behaviour at that boundary.

You already know what state, reverts and events are from
[Week 3](../../../foundation/week-3/part-2-solidity-minimum.md). This Part does
not re-explain them. It makes you prove them.

## Core / reference material

### The contract under test

You keep working in the
[Builder starter repository](https://github.com/Blockchain-NTU-SG/academy-builder-starter)
you set up in [Week 5](../week-5/README.md). Its contract is
`contracts/src/Registry.sol`: every account keeps one short record, and the
deployer (the owner) can clear any record.

This assumes the Foundry project and `forge-std` setup from Builder W5 are
already available; it does not add a separate installation tutorial.

```solidity title="contracts/src/Registry.sol"
// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

/// @notice Each account manages its own short record; the owner can remove one.
contract Registry {
    error EmptyRecord();
    error RecordTooLong();
    error NotOwner();

    address public immutable owner;
    mapping(address => string) public records;
    event RecordUpdated(address indexed account, string value);

    constructor() {
        owner = msg.sender;
        records[msg.sender] = "Hello from NTU Blockchain Builder Lab";
        emit RecordUpdated(msg.sender, records[msg.sender]);
    }

    function setRecord(string calldata value) external {
        if (bytes(value).length == 0) revert EmptyRecord();
        if (bytes(value).length > 140) revert RecordTooLong();
        records[msg.sender] = value;
        emit RecordUpdated(msg.sender, value);
    }

    function clearRecord(address account) external {
        if (msg.sender != owner) revert NotOwner();
        delete records[account];
        emit RecordUpdated(account, "");
    }
}
```

The 140 limit counts `bytes(value).length`, so it measures encoded bytes rather
than visible characters. A non-ASCII character can occupy multiple UTF-8
bytes, so a string that looks short on screen can still be closer to the limit
than expected.

Read the contract as a list of promises. Each one is something a test can
check:

| Rule | What should happen |
|---|---|
| An account sets its record | Only that account's record changes, and `RecordUpdated` is emitted |
| The record is empty | The call fails with `EmptyRecord` and nothing changes |
| The record is over 140 bytes | The call fails with `RecordTooLong` |
| Someone other than the owner clears a record | The call fails with `NotOwner` |
| The owner clears a record | The record is deleted, and `RecordUpdated` is emitted with an empty value |

Your own copy also has the feature you added in
[Week 5 Part 2](../week-5/README.md). That feature has promises of its own, and
nothing checks them yet. That is your task.

### How a Foundry test is laid out

- Test files live in `contracts/test/` in this project and end in `.t.sol`.
- A test contract inherits `Test` from `forge-std`, Foundry's standard library.
- `setUp()` runs before **every** test, so each test starts from a fresh contract.
- Every function whose name starts with `test` is a test. `forge test`, run
  from the repository root, runs them all.
- **Cheatcodes** on `vm` let a test do things a normal user cannot:

| Cheatcode | What it does |
|---|---|
| `vm.prank(addr)` | The next call comes from `addr` instead of the test contract |
| `vm.expectRevert(...)` | The next call **must** fail, with this error |
| `vm.expectEmit(...)` | The next call **must** emit an event matching the one you emit after it |

### The four kinds of test

| Kind | The question it answers | Main tool |
|---|---|---|
| Normal path | Does normal use change state correctly? | `assertEq` |
| Failure path | Does a bad call fail, with the right error? | `vm.expectRevert` |
| Event | Is the outside world told what happened? | `vm.expectEmit` |
| Edge case | Does it behave correctly right at a boundary? | A focused boundary test |

Event tests matter more than they look. In
[Week 5](../week-5/README.md) your app read history from `RecordUpdated`
events. If an event silently stops firing, the contract still "works", but
every app built on it shows the wrong history.

### Worked example

The starter already ships six tests in `contracts/test/Registry.t.sol`. They
cover all four kinds, so read them as the worked example:

| Test | Kind |
|---|---|
| `testWriteEmitsEventAndOnlyChangesCallersRecord` | Normal path and event |
| `testEmptyRecordReverts` | Failure path |
| `testNonOwnerCannotClear` | Failure path (access rule) |
| `testByteBoundaries` | Edge case |
| `testInitialOwnerAndRecord`, `testOwnerCanClearWithEvent` | Starting state; owner path and event |

Here are three of them:

```solidity title="contracts/test/Registry.t.sol (excerpt)"
contract RegistryTest is Test {
    Registry registry;
    address alice = address(0xA11CE);
    address bob = address(0xB0B);
    event RecordUpdated(address indexed account, string value);

    function setUp() public { registry = new Registry(); }

    function testWriteEmitsEventAndOnlyChangesCallersRecord() public {
        vm.expectEmit(true, false, false, true, address(registry));
        emit RecordUpdated(alice, "Hello");
        vm.prank(alice);
        registry.setRecord("Hello");
        vm.prank(bob);
        registry.setRecord("Bob's record");
        assertEq(registry.records(alice), "Hello");
        assertEq(registry.records(bob), "Bob's record");
    }

    function testEmptyRecordReverts() public {
        vm.expectRevert(Registry.EmptyRecord.selector);
        registry.setRecord("");
        assertEq(registry.records(address(this)), "Hello from NTU Blockchain Builder Lab");
    }

    function testByteBoundaries() public {
        registry.setRecord(string(new bytes(140)));
        assertEq(bytes(registry.records(address(this))).length, 140);
        vm.expectRevert(Registry.RecordTooLong.selector);
        registry.setRecord(string(new bytes(141)));
    }
}
```

Why each part is there:

1. **`setUp()` deploys a new `Registry`.** Every test starts from the same
   clean state, so one test can never pass or fail because of another. The
   test contract deploys it, so the test contract is the owner.
2. **The test declares `event RecordUpdated(...)` itself.** That lets it
   `emit` the event it expects. `vm.expectEmit(true, false, false, true, ...)`
   then compares the first indexed field (the account) and the data (the
   value) against the next real event, from the registry's address.
3. **`vm.prank(alice)`, then `vm.prank(bob)`.** Two different callers prove
   the promise "only the caller's record changes". With one caller, a bug that
   wrote every record at once would still pass.
4. **`vm.expectRevert` comes *before* the call.** It sets up the expectation
   for the very next call. Passing the error's `selector` means the test only
   passes if the call fails for *this* reason, not for any reason. The
   `assertEq` afterwards checks that the failed call changed nothing.
5. **140 passes, 141 fails.** An edge-case test checks both sides of the line.
   A bug that wrote `>=` instead of `>` would break the 140 case.

Run them from the repository root:

```bash
forge test
```

*You should see all six pass:*

```text
Ran 6 tests for contracts/test/Registry.t.sol:RegistryTest
[PASS] testByteBoundaries() (gas: 29408)
[PASS] testEmptyRecordReverts() (gas: 17628)
[PASS] testInitialOwnerAndRecord() (gas: 17668)
[PASS] testNonOwnerCannotClear() (gas: 20082)
[PASS] testOwnerCanClearWithEvent() (gas: 30723)
[PASS] testWriteEmitsEventAndOnlyChangesCallersRecord() (gas: 72146)
Suite result: ok. 6 passed; 0 failed; 0 skipped
```

Your gas numbers may differ slightly, and once you have added your Week 5
feature they will change. That is fine.

::: important Make the protected rule fail on purpose
A passing test is useful. Deliberately making the protected rule fail gives
stronger evidence that the test is checking what you intended. This is not
proof that the contract is safe overall; it is a focused check that this test
guards this particular rule.

Delete the `if (bytes(value).length == 0) revert EmptyRecord();` line from
`Registry.sol` and run `forge test` again. `testEmptyRecordReverts` should now
fail with `next call did not revert as expected`. Put the line back.

==If deliberately breaking the rule does not break the test, inspect the test:
it may not be checking the intended behaviour.== Professional developers do
this on purpose to check their own tests.
:::

::: details Landscape — fuzz testing
A normal test checks one input you chose. A **fuzz test** takes inputs as
parameters and Foundry runs it many times with random values (256 runs in
this project). `bound` keeps the random value inside a range you care about:

```solidity
function testFuzz_SetRecord_AnyValidLength(uint256 length) public {
    length = bound(length, 1, 140);
    registry.setRecord(string(new bytes(length)));
    assertEq(bytes(registry.records(address(this))).length, length);
}
```

Fuzzing is good at finding the inputs you would never think to try. It is not
required for this Part. See the
[Foundry fuzz testing guide](https://getfoundry.sh/forge/fuzz-testing).
:::

## Hands-on task

The starter's six tests cover the original Registry. Nothing yet covers the
feature **you** added in Week 5 Part 2. Write those tests.

Create a new file in `contracts/test/` (for example
`contracts/test/MyFeature.t.sol`) and build a suite for your feature that
covers:

1. **One normal path.** Use your feature the intended way and check the state
   it leaves behind.
2. **Two distinct failure paths.** Your feature has an access or validation
   rule and a failure condition. Test both, each with the exact error you
   expect.
3. **One event or state assertion** beyond the normal path. For example, check
   that your feature's event carries the right values.
4. **One edge case.** Pick a boundary in your feature and check the behaviour
   at it.

Then run `forge test` until every test passes, including the starter's six.

**Out of scope:** testing your Week 5 scripts or frontend, coverage
percentages, gas optimisation and invariant testing.

::: tip Use AI as a pair, not a replacement
An AI assistant can draft tests quickly. Before you keep one, check that it
asserts the behaviour you actually care about. Then use the "make it fail on
purpose" check above to confirm it really guards that rule.
:::

## Evidence required

- One line naming the feature you added in Week 5 Part 2.
- Your new test file (a link to the commit, or the file itself).
- The output of `forge test` showing every test passing.
- One sentence per new test: the behaviour it protects, and the bug it would
  catch.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

::: details Further exploration — optional, not assessed
- Run `forge coverage` to see which lines your tests never reach. See the
  [forge coverage reference](https://getfoundry.sh/forge/reference/forge-coverage).
- Write an **invariant test**: a property that must hold after any sequence of
  calls, such as "a record never grows past 140 bytes". See
  [invariant testing](https://getfoundry.sh/forge/invariant-testing).
- Run `forge test --gas-report` and compare the cost of a short and a long
  record. See [gas reports](https://getfoundry.sh/forge/gas-reports).
:::

::: details Sources and attribution
- [Foundry Book — Writing tests](https://getfoundry.sh/forge/tests/overview) — Link, referenced only
- [Foundry Book — Cheatcodes reference](https://getfoundry.sh/reference/cheatcodes/overview) — Link, referenced only
- [Foundry Book — Fuzz testing](https://getfoundry.sh/forge/fuzz-testing) — Link, referenced only
- [forge-std](https://github.com/foundry-rs/forge-std) — Link, referenced only
- [Blockchain@NTU Academy Builder starter](https://github.com/Blockchain-NTU-SG/academy-builder-starter) — Reuse (MIT), the `Registry` contract and tests are quoted from it
:::
