# Editorial Guide

This is the canonical writing and learner-review standard for the Blockchain@NTU
Academy Handbook. It applies to learner-facing pages, examples, visuals and
supporting explanations. See [GOVERNANCE.md](./GOVERNANCE.md) for decision
ownership.

## Who we write for

The primary Foundation learner is a student with little or no prior Web3
knowledge and potentially no technical background. Foundation should move that
learner from outsider to a **Web3-literate beginner** capable of basic industry
conversation, safe participation, first-principles reasoning and choosing a
specialisation.

It does not claim to make a learner a professional developer, smart-contract
auditor, DeFi analyst, protocol researcher or investor.

## What Foundation is trying to achieve

Foundation gives learners a shared map of the systems, vocabulary and risks they
will meet in deeper work. It should connect understanding to a small practical
action without pretending that exposure equals expertise.

## The editorial principles

### One page, one learner question

Every Part should have one dominant question, such as “Why does blockchain
exist?”, “Why do different chains make different choices?” or “Why do L2s and
bridges exist?” Several concepts may appear, but they should serve that question.

### Problem → intuition → precise model → reality

Prefer:

```text
Why should I care?
↓
What problem exists?
↓
Beginner intuition or familiar example
↓
More precise model
↓
Real-world example
↓
Trade-off or boundary
```

Do not begin an important teaching page with dictionary definitions unless it is
genuinely a reference page.

### Beginner intuition first, precision immediately after

Simple explanations are encouraged; incorrect simplifications are not. If an
analogy is used, say what it helps the learner picture and where it stops when
overextension could mislead.

### Relationships before vocabulary

Teach learners what question a term answers. For example:

```text
Security / settlement → L1 / L2 / independently secured chain
Execution environment → EVM-compatible / other runtimes
Purpose → general-purpose / appchain
Participation → public / private / permissioned
Communication → bridge / IBC / cross-chain messaging
```

Avoid flat buzzword taxonomies.

### Concept ownership

Each major concept should have one canonical page that owns its full
explanation. Other pages may preview, recall, reinforce or cross-reference it,
but should not fully re-teach the same explanation. Before adding content, ask:

> Which page already owns this concept?

### Repeat to deepen, not to restate

Good repetition adds a new layer: Week 0 may say not to approve blindly, Week 1
may explain signatures and keys, and Week 3 may show what token approvals change.
Bad repetition copies the same definition into prose, bullets and a table.

> **Repeat to deepen, not to restate.**

### Trade-offs over ideology

For an important design choice, explain what it gains, gives up and assumes.
Operators can be useful; sidechains are not “bad L2s”; decentralised does not
mean trustless; an audit does not mean safe; regulation does not remove asset
risk; and blockchain is not automatically the right solution.

### Evidence before confidence

Claims that can change with ecosystem development should use current primary or
official sources, especially network classifications, architecture,
governance, operator status, L2 maturity, validator design and project/company
relationships. Record the source in [SOURCES.md](./SOURCES.md) and the page's
Sources and attribution section.

### Reality anchors

Important abstract concepts should normally have a concrete example answering
“Where would I actually see this?” Prefer real networks, familiar applications,
wallets, explorers and realistic user flows over invented systems when a useful
real example exists.

## Core / Landscape / Further Exploration

### Core

The learner should be able to explain, use or demonstrate the material after the
page. Core is the material that can support the week's intended learning and
mission; do not assume every sentence on a page is an assessment requirement.

### Landscape

The learner should recognise the term and roughly place it in the map when an
industry participant mentions it. Landscape is not assessed unless that is
explicitly stated elsewhere.

### Further Exploration

Optional depth for curiosity or later specialisation. Advanced topics belong here
when learners do not need them for the Foundation mental model.

> **Richer content, not heavier assessment.**

Adding context, caveats or industry examples does not automatically create a new
learner requirement. Assessment changes require explicit curriculum approval.

## Designing one page

Before writing, identify the dominant learner question, its prerequisites, the
concept owner, the intended learner action and the learning level. A useful page
usually has:

1. a short reason the question matters;
2. one concrete example or problem;
3. an intuitive explanation before formal terms;
4. a precise model and its boundary;
5. one reality anchor and a trade-off;
6. a short sentence saying what to remember.

Connect to the previous and next Part so Foundation reads as one story. Use a
table or diagram when structure, sequence or comparison is easier to see than to
describe; do not add a visual merely to break up prose.

## Examples and analogies

Prefer familiar examples that let a learner answer “where would I see this?”
Keep one analogy focused on one confusion. State what it explains, then state
where it stops if the analogy could be mistaken for the mechanism itself.

## Technical accuracy and simplification

Preserve important distinctions even when the first explanation is short:
validity is not consensus, hashes make tampering obvious but do not create
consensus, an address is not a person, and a contract's risk is not the same as
the network's risk. Introduce a durable beginner model first, then keep useful
nuance in the later Core, Landscape or Further Exploration layer.

## Hands-on walkthroughs

A guided walkthrough is for a learner who is actually performing an action. Each
step should state the action and the observable result. Keep required activities
testnet-only, explain ordinary safety checks, and do not turn optional
troubleshooting into an assessment requirement.

## Screenshots and visuals

Use Mermaid, native diagrams or tables for structure, sequence and comparison.
Use a screenshot when a learner must recognise a real interface or state. Do not
fabricate UI evidence. A screenshot placeholder should state what to capture,
what the learner should notice and include an accessible label. Check desktop,
narrow layouts, dark mode and the deployed base path when a visual changes.

## Sources and freshness

Use primary or official documentation for claims that change. Link-only material
must not be copied as if it were Reuse. Adapted material needs page-level
attribution and a matching record in `SOURCES.md`. Review ecosystem facts before
release rather than preserving a stale classification for consistency.

## Safety

Never add real secrets, learner personal data, API keys or real-money/mainnet
requirements. Wallet, signature, approval, transaction, address and network
examples must make their status clear. Generated code touching funds, keys,
permissions, contracts or network configuration must be explicitly verified and
tested.

## Reviewing learner feedback

**A learner reporting confusion is evidence. Their proposed fix is input, not
automatically the solution.** First determine whether the problem is a missing
prerequisite, unclear definition, missing reality anchor, poor sequencing,
concept-ownership overlap, wording friction or genuinely optional depth. Do not
automatically respond by adding more content.

## What requires curriculum approval

Education leadership approves changes to week structure, learning outcomes,
assessment architecture, Anchor Missions, specialisation structure and new Core
requirements. Maintainers may handle ordinary typos, broken links, clarity
improvements, examples, factual updates, screenshots and source updates when
scope does not materially change. See [GOVERNANCE.md](./GOVERNANCE.md) before
proposing a structural or assessment change.
