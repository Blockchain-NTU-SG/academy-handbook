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
---

<!--
Author note (Education team): this is the example Part for the W5–W6 Deep Dive.
The contract under test is a stand-in: the Week 3 Guestbook with three added
rules. When the Builder starter repository is ready, decide whether to keep this
contract or switch the Part to the starter contract, and update the code, the
rules table and the worked example together. The model answer and reviewer notes
are kept outside the public handbook.
-->

# Week 6 · Part 1 — Testing contract behaviour

> **Core question — how do I prove my contract does what I think it does, every
> time, without clicking through it by hand?**

In Week 5 you made things work. "It works" meant you ran it once and saw the
right result. That proof disappears the moment you change a line, and in a real
project lines change every day.

This Part turns *"I checked it once"* into checks that run in seconds, every
time the code changes.

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
- choose an edge case worth testing, and test both sides of it.

You already know what state, reverts and events are from
[Week 3](../../../foundation/week-3/part-2-solidity-minimum.md). This Part does
not re-explain them. It makes you prove them.

## Core / reference material

### The contract under test

Everyone tests the same contract: the Week 3 `Guestbook`, extended with three
rules. Put it in your Foundry project from
[Week 5 Part 1](../week-5/README.md) as `src/Guestbook.sol`.

```solidity title="src/Guestbook.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Guestbook {
    error EmptyMessage();
    error MessageTooLong(uint256 length, uint256 maxLength);
    error NotOwner(address caller);

    uint256 public constant MAX_LENGTH = 140;

    address public immutable owner;
    string public message;
    address public lastVisitor;
    uint256 public visitCount;

    event MessageChanged(address indexed visitor, string newMessage);
    event MessageCleared(address indexed by);

    constructor(string memory initialMessage) {
        owner = msg.sender;
        message = initialMessage;
    }

    function setMessage(string calldata newMessage) external {
        uint256 length = bytes(newMessage).length;
        if (length == 0) revert EmptyMessage();
        if (length > MAX_LENGTH) revert MessageTooLong(length, MAX_LENGTH);

        message = newMessage;
        lastVisitor = msg.sender;
        visitCount += 1;
        emit MessageChanged(msg.sender, newMessage);
    }

    function clearMessage() external {
        if (msg.sender != owner) revert NotOwner(msg.sender);
        delete message;
        emit MessageCleared(msg.sender);
    }
}
```

Read it as a list of promises. Each one is something a test can check:

| Rule | What should happen |
|---|---|
| A visitor sets a message | `message`, `lastVisitor` and `visitCount` all update, and `MessageChanged` is emitted |
| The message is empty | The call fails with `EmptyMessage` and nothing changes |
| The message is over 140 bytes | The call fails with `MessageTooLong` |
| Someone other than the owner clears the message | The call fails with `NotOwner` |

### How a Foundry test is laid out

- Test files live in `test/` and end in `.t.sol`.
- A test contract inherits `Test` from `forge-std`, Foundry's standard library.
- `setUp()` runs before **every** test, so each test starts from a fresh contract.
- Every function whose name starts with `test` is a test. `forge test` runs them all.
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
| Edge case | Does it behave correctly right at a boundary? | One test each side of the line |

Event tests matter more than they look. In
[Week 5](../week-5/README.md) your app read history from events. If an
event silently stops firing, the contract still "works", but every app built on
it shows the wrong history.

### Worked example

Create `test/Guestbook.t.sol`:

```solidity title="test/Guestbook.t.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Guestbook} from "../src/Guestbook.sol";

contract GuestbookTest is Test {
    Guestbook internal guestbook;
    address internal alice = makeAddr("alice");

    function setUp() public {
        guestbook = new Guestbook("Hello from Blockchain@NTU");
    }

    function test_SetMessage_UpdatesState() public {
        vm.prank(alice);
        guestbook.setMessage("gm");

        assertEq(guestbook.message(), "gm");
        assertEq(guestbook.lastVisitor(), alice);
        assertEq(guestbook.visitCount(), 1);
    }

    function test_RevertWhen_MessageIsEmpty() public {
        vm.expectRevert(Guestbook.EmptyMessage.selector);
        guestbook.setMessage("");
    }
}
```

Why each line is there:

1. **`setUp()` deploys a new `Guestbook`.** Every test starts from the same
   clean state, so one test can never pass or fail because of another.
2. **`makeAddr("alice")` creates a labelled test address.** Failure messages
   then say `alice` instead of a long hex string.
3. **`vm.prank(alice)` before `setMessage`.** Without it, the caller would be
   the test contract, and you could not tell whether `lastVisitor` records the
   real caller.
4. **Three `assertEq` lines, not one.** The rule promises three state changes,
   so the test checks all three.
5. **`vm.expectRevert` comes *before* the call.** It sets up the expectation
   for the very next call. Passing the error's `selector` means the test only
   passes if the call fails for *this* reason, not for any reason.

Run it:

```bash
forge test
```

*You should see both tests pass:*

```text
Ran 2 tests for test/Guestbook.t.sol:GuestbookTest
[PASS] test_RevertWhen_MessageIsEmpty() (gas: 30304)
[PASS] test_SetMessage_UpdatesState() (gas: 110964)
Suite result: ok. 2 passed; 0 failed; 0 skipped
```

Your gas numbers may differ slightly. That is fine.

::: important A test you have never seen fail proves nothing
Delete the `if (length == 0) revert EmptyMessage();` line from the contract and
run `forge test` again. `test_RevertWhen_MessageIsEmpty` should now fail. Put
the line back.

==If breaking the rule does not break a test, that test was not checking the
rule.== Professional developers do this on purpose to check their own tests.
:::

::: details Landscape — fuzz testing
A normal test checks one input you chose. A **fuzz test** takes inputs as
parameters and Foundry runs it many times with random values (256 by default).
`bound` keeps the random value inside a range you care about:

```solidity
function testFuzz_SetMessage_AnyValidLength(uint256 length) public {
    length = bound(length, 1, guestbook.MAX_LENGTH());
    // build a string of `length` bytes, call setMessage, assert it was accepted
}
```

Fuzzing is good at finding the inputs you would never think to try. It is not
required for this Part. See the
[Foundry fuzz testing guide](https://getfoundry.sh/forge/fuzz-testing).
:::

## Hands-on task

In `test/Guestbook.t.sol`, build a test suite that covers:

1. **One normal path.** The worked example's `test_SetMessage_UpdatesState`
   counts.
2. **Two distinct failure paths.** The worked example gives you one. Add a
   second that fails for a *different* rule.
3. **One event or state assertion** beyond the normal path. For example, check
   that `MessageChanged` carries the right visitor and message. Hint: declare
   the same `event MessageChanged(...)` line inside your test contract, so you
   can `emit` the expected event straight after `vm.expectEmit`.
4. **One edge case.** Pick a boundary in the rules and test what happens at it.

Then run `forge test` until every test passes.

**Out of scope:** testing your Week 5 scripts or frontend, coverage
percentages, gas optimisation and invariant testing.

::: tip Use AI as a pair, not a replacement
An AI assistant can draft tests quickly. Before you keep one, check that it
asserts the behaviour you actually care about. Then use the "make it fail on
purpose" check above to confirm it really guards that rule.
:::

## Evidence required

- Your `test/Guestbook.t.sol` file (a link to the commit, or the file itself).
- The output of `forge test` showing every test passing.
- One sentence per test: the behaviour it protects, and the bug it would catch.

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

::: details Further exploration — optional, not assessed
- Run `forge coverage` to see which lines your tests never reach. See the
  [forge coverage reference](https://getfoundry.sh/forge/reference/forge-coverage).
- Write an **invariant test**: a property that must hold after any sequence of
  calls, such as "`visitCount` never decreases". See
  [invariant testing](https://getfoundry.sh/forge/invariant-testing).
- Run `forge test --gas-report` and compare the cost of a short and a long
  message. See [gas reports](https://getfoundry.sh/forge/gas-reports).
:::

::: details Sources and attribution
- [Foundry Book — Writing tests](https://getfoundry.sh/forge/tests/overview) — Link, referenced only
- [Foundry Book — Cheatcodes reference](https://getfoundry.sh/reference/cheatcodes/overview) — Link, referenced only
- [Foundry Book — Fuzz testing](https://getfoundry.sh/forge/fuzz-testing) — Link, referenced only
- [forge-std](https://github.com/foundry-rs/forge-std) — Link, referenced only
- `Guestbook` contract extended from the Academy's own [Week 3 Part 3](../../../foundation/week-3/part-3-remix-lab.md) lab — original Academy material
:::
