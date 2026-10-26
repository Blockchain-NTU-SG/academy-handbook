---
track: researcher
week: 5
day: 6
title: "System analysis"
status: drafting
owner: "Education Team"
reading_time: "45 min"
points: 100
sources:
  - name: "Lido Docs — Lido Tokens Integration Guide"
    url: "https://docs.lido.fi/guides/lido-tokens-integration-guide/"
    label: "Link"
  - name: "Lido Docs — Withdrawal Queue (WithdrawalQueueERC721)"
    url: "https://docs.lido.fi/contracts/withdrawal-queue-erc721"
    label: "Link"
  - name: "Lido Docs — Protocol levers"
    url: "https://docs.lido.fi/guides/protocol-levers/"
    label: "Link"
  - name: "Lido Docs — Public Risk Disclosure"
    url: "https://docs.lido.fi/prd"
    label: "Link"
  - name: "Lido blog — stETH liquidity during the KelpDAO stress event"
    url: "https://blog.lido.fi/steth-liquidity-held-ground-during-stress-event/"
    label: "Link"
---

<!--
Author note (Education team): the worked example reuses the Uniswap v2
mechanism from Part 3 to show the format. The Lido task is checked by
reviewers against Lido's own documentation. The model answer is kept outside
the public handbook.
-->

# Week 5 · Part 6 — System analysis

> **Core question — how does this system work, why do its participants
> behave the way it hopes, and where could it fail?**

Parts 1 to 5 each took one system apart. This Part asks you to do it without
a guide, on a protocol you have not studied, and to be honest about what you
could and could not confirm.

A real analysis is not a summary. It says how the thing works, who is paid to
do what, where it can break and **who loses when it does**, and which
questions your evidence cannot yet answer.

::: tip Picture a doctor's case note
A good case note does not just list symptoms. It says what the body is doing,
what is driving it, what could go wrong, and what test would settle the
doubt.

Where the picture stops: a patient is one body. A protocol has many parties
whose interests differ, so "what could go wrong" always needs "for whom".
:::

## The hard skill

**Analyse an unfamiliar protocol end to end: mechanism, incentives, risks and
open questions, backed by sources you have graded.**

After this Part you can:

- explain a protocol as a short numbered flow, not a feature list;
- name who gains, who pays and who is tempted, for each main actor;
- state a risk as *what fails → who loses → how you know*;
- separate what you verified from what you were only told.

## Core / reference material

### The four lenses

| Lens | Write | Test it with |
|---|---|---|
| **Mechanism** | The core flow in 4 to 7 numbered steps: what moves, who triggers it | Could a classmate redraw it from your steps? |
| **Incentives** | For each main actor: what they gain, what it costs them, what tempts them to cheat | Does it explain *why* the system keeps working? |
| **Risks** | Each as **what fails → who loses → how you know** | Is a named person or group at the end of the arrow? |
| **Open questions** | Things your sources could not settle, plus what evidence would settle them | Could someone else go and answer it? |

### Grade your sources

Not every source is equal. Label each one you use:

- **Protocol-authored:** the project's own docs or blog. Good for *how it
  works*, weaker for *how well it holds up*.
- **Independent:** a third party with no stake, such as an auditor, a
  researcher, or on-chain data you queried yourself.

An analysis that rests only on protocol-authored sources must say so in its
open questions.

### Worked example: Uniswap v2, on one card

You met this mechanism in [Part 3](./part-3-mechanism-and-market-design.md),
so we use it to show the format.

| Lens | Card |
|---|---|
| **Mechanism** | 1. A pool holds reserves of two tokens. 2. A trader sends in one token and takes out the other, so the product of reserves does not fall. 3. A small fee stays in the pool. 4. Liquidity providers deposit both tokens and receive pool shares. |
| **Incentives** | Liquidity providers earn fees on volume. Arbitrageurs trade the pool back to the market price and keep the gap, which keeps the pool's price honest. Traders pay for instant swaps. |
| **Risks** | *Impermanent loss:* when the price moves, a provider's shares are worth less than simply holding → **providers lose**. Evidence: follows from the pricing rule. Mitigation: the fee income offsets some of it. Residual risk: in a fast-moving market, fees may not cover the loss. |
| **Open question** | How much do providers in a given pool earn after that loss? Needs real data, which Week 6 teaches you to query. |

Note the shape: short steps, a reason for each actor, a risk with a named
loser and what still remains after the protection, and an open question you
could actually chase.

## Hands-on task

Analyse **Lido's stETH liquid staking on Ethereum**. If you prefer another
single-purpose protocol you have not met, name it in your evidence; reviewers
will check it against its own documentation.

Write a **one-page analysis note** with the four lenses:

1. **Mechanism:** a numbered flow of 5 to 7 steps from "I deposit ETH" to "I
   get ETH back".
2. **Incentives:** at least three actors (for Lido: stakers, node operators
   and the DAO or treasury), each with a gain, a cost and a temptation.
3. **Risks:** at least three, each written as *what fails → who loses → how
   you know*. Include at least one that comes from *outside* the protocol. For
   one of them, name the protection that exists today and the risk that
   remains after it.
4. **Open questions:** at least two, each with the evidence that would
   answer it.

Under every source link, label it **protocol-authored** or **independent**.

**Out of scope:** price predictions, comparing yields, investment advice, and
reading smart-contract code.

## Evidence required

- Your one-page analysis note with the four lenses.
- A source list with each source labelled protocol-authored or independent.
- One sentence: which claim in your note are you least sure of, and why?

## Completion and revision

This Part is worth **100 points**. Completed / approved earns the full points;
incomplete or materially incorrect work is returned with specific feedback for
revision. There is no partial-score rubric.

Your work is complete when:

- [ ] the mechanism is a numbered flow, and it is correct against the docs;
- [ ] each main actor has a gain, a cost and a temptation;
- [ ] each risk names *who loses* and *how you know*, and at least one is external to the protocol;
- [ ] one risk has its current protection and remaining risk;
- [ ] each open question names the evidence that would answer it;
- [ ] every source is labelled, and the note says if it rests mostly on protocol-authored sources;
- [ ] you named the claim you are least sure of.

::: details Further exploration — optional, not assessed
- Find an independent assessment of stETH risk (an auditor's or rating
  agency's report) and compare its risk list with yours.
- Pick one open question from your note and sketch the query or dashboard
  that would answer it. You will build queries like this in Week 6.
:::

::: details Sources and attribution
- [Lido Docs — Lido Tokens Integration Guide](https://docs.lido.fi/guides/lido-tokens-integration-guide/) — Link, referenced only
- [Lido Docs — Withdrawal Queue](https://docs.lido.fi/contracts/withdrawal-queue-erc721) — Link, referenced only
- [Lido Docs — Protocol levers](https://docs.lido.fi/guides/protocol-levers/) — Link, referenced only
- [Lido Docs — Public Risk Disclosure](https://docs.lido.fi/prd) — Link, referenced only
- [Lido blog — stETH liquidity during the KelpDAO stress event](https://blog.lido.fi/steth-liquidity-held-ground-during-stress-event/) — Link, referenced only
:::
