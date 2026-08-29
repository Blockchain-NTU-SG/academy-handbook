---
week: 4
day: 6
title: "Choosing your direction"
status: drafting
owner: "Director of Education"
reading_time: "20 min"
sources:
  - name: "ethereum.org — Developer resources"
    url: "https://ethereum.org/developers/"
    label: "Reuse"
  - name: "Dune"
    url: "https://dune.com/"
    label: "Link"
  - name: "DefiLlama"
    url: "https://defillama.com/"
    label: "Link"
  - name: "Messari Research"
    url: "https://messari.io/research"
    label: "Link"
---

# Week 4 · Part 6 — Choosing your direction

This is the last page of the Foundation. Weeks 5–8 are a build sprint, and this
is where you decide what you are building.

::: important What the sprint actually asks for
**One small thing you can show.** Not a startup, not a finished product, not
something impressive.

The most common failure in Week 5 is scoping too large. Everything on this page
is designed to stop that.
:::

## Learning objectives

- Describe the four directions and what each produces
- Choose one, and say why it fits you
- Scope a four-week project a beginner can actually finish
- Write a definition of done that someone else could check

## Core

### The four directions

Starting points, not restrictions. You may combine them — what is judged is the
quality of the Proof of Work, not category discipline.

:::: tabs
@tab Developer

**You build something that runs.**

| Field | Details |
|---|---|
| Output | Working code, deployed or runnable, with a README |
| Core skills | Solidity, a frontend or script, testnet deployment |
| Tools | Remix, GitHub, a wallet, an explorer, optionally Foundry or Hardhat |
| Good fit if | You enjoyed [Week 3 Part 3](../week-3/day-3-remix-lab.md) and want more |

**Realistic four-week projects:**

- A contract with a real access-control pattern, deployed and verified, with a minimal page that reads and writes it
- A script that watches a contract's events and reports something useful
- A small tool that solves a problem you personally hit during the Foundation

::: warning Scope reality check
"Build a DEX" is not a four-week beginner project. **"Deploy a token with a
capped supply and a page that displays holders"** is.
:::

@tab Research

**You investigate something and write it up.**

| Field | Details |
|---|---|
| Output | A written analysis with evidence and sources |
| Core skills | Source selection, evidence checking, clear writing |
| Tools | Docs, GitHub, Etherscan, Dune, DefiLlama, L2BEAT, Messari |
| Good fit if | [Part 3](./day-3-research-tool-map.md) was the page you enjoyed most |

**Realistic four-week projects:**

- A protocol teardown: what it does, its trust assumptions, on-chain evidence of use, and what would change your view
- A comparison of three protocols in one sector on dimensions you define and defend
- A post-mortem of a past exploit, reconstructed from on-chain evidence and public reports

::: warning Scope reality check
"Analyse DeFi" is not a project. **"Compare how three lending protocols handle
oracle risk, with evidence"** is.
:::

@tab Data

**You find something in on-chain data and show it.**

| Field | Details |
|---|---|
| Output | A dashboard, notebook or dataset, with an explanation of what it shows |
| Core skills | SQL, chain data structure, honest charting |
| Tools | Dune, DefiLlama, block explorers, optionally Python |
| Good fit if | You want to answer questions nobody has asked yet |

**Realistic four-week projects:**

- A Dune dashboard answering one specific question, with written interpretation
- An analysis of activity patterns around a single event — a launch, an upgrade, an exploit
- A reproducible comparison of a metric across chains, with your definitions stated

::: warning Scope reality check
The hard part is **the question**, not the SQL. A dashboard with no question is a
pile of charts. Start from something you genuinely want to know.
:::

@tab Product & Ecosystem

**You examine how something works as a product, or contribute to an ecosystem.**

| Field | Details |
|---|---|
| Output | A teardown, proposal, contribution, or documented community work |
| Core skills | User-journey thinking, clear writing, judgement about trade-offs |
| Tools | The products themselves, governance forums, GitHub, testnets |
| Good fit if | You keep noticing *why is this so hard to use?* |

**Realistic four-week projects:**

- A UX teardown of one Web3 onboarding flow, with specific, evidenced recommendations
- A governance analysis: read a real proposal end to end and assess how the decision was made
- A genuine contribution to an open-source project — documentation counts, and is often the most needed

::: warning Scope reality check
"Improve Web3 UX" is not a project. **"Walk five non-crypto NTU students through
one wallet onboarding flow and document exactly where each got stuck"** is — and
it would be genuinely useful.
:::
::::

### Choosing

::: tip Choose by the work, not by prestige
None of the four directions is a higher tier. Choose the kind of work you want
to spend four weeks doing and the evidence you want to produce.
:::

Three questions that usually settle it:

1. **Which Foundation page did you enjoy most?** That is a real signal.
2. **What do you want to be able to show at the end of the sprint?**
3. **What will you still want to work on in week 7**, when it stops being novel?

### Scoping so you can actually finish

Beginners often overestimate what fits in four weeks.

::: important The scoping test
Say your project in one sentence with one core question or deliverable.
Supporting pieces are fine when they serve that same output.

- "Build a token, analyse stablecoin regulation, **and** create a trading dashboard" → three independent projects
- "Build a small dashboard **and** add a short explanation of what the chart shows" → one deliverable with a supporting explanation

Avoid joining multiple independent projects under one broad sentence; keep one
core question or deliverable.
:::

The four-week shape:

| Week | What happens |
|---|---|
| **5 · Define** | Problem, scope, repo, plan, definition of done |
| **6 · Build V0** | Something reviewable. Rough is fine |
| **7 · Review & improve** | Peer review, validate assumptions, document limits |
| **8 · Ship** | Final output, README, demo, AI disclosure, next steps |

Notice V0 is due in week 6. Build something reviewable early, then use the
remaining time for review, improvement and shipping.

### Definition of done

The single most useful thing on your Direction Card.

::: warning Vague vs checkable
**Vague:** "A working dashboard about stablecoins."

**Checkable:** "A Dune dashboard with three charts showing daily USDC transfer
volume on Base for the last 90 days, plus 300 words explaining what the pattern
suggests and what it does not prove."

The second one you can finish. You will know when you have.
:::

Write it so **someone else** could look at your output and say yes or no.

## Landscape

- **Scope creep** — the main cause of unfinished sprints. Your definition of done is the defence
- **V0** — the first version that does the thing badly. Ship it in week 6
- **Peer review** — week 7. Someone else will find what you cannot see
- **Proof of Work** — the point of the sprint. Something real you can show someone

::: tip Track kits
The Developer, Research, Data and Product & Ecosystem kits will add deeper
playbooks and examples. **This page has enough to write your Direction Card and
scope a real project** — do not wait for them.
:::

## Worked example

The same interest, scoped three ways. Only one finishes.

> *"I'm interested in stablecoins."*

| Version | Verdict |
|---|---|
| "Research stablecoins" | **Not a project.** No question, no output, no end |
| "Build a stablecoin, analyse the whole market, and write a report on regulation" | **Three projects**, none finishable. It contains three independent deliverables |
| "Compare how USDC and USDT differ in what a holder has to trust — reserves, freezing, chain deployment — with on-chain evidence for each claim" | **One project.** Clear question, defined scope, checkable output |

The third version, as a Direction Card:

| Field | Answer |
|---|---|
| **Direction** | Research |
| **Problem** | People treat stablecoins as interchangeable dollars. They carry different trust assumptions |
| **Audience** | Academy members and anyone holding stablecoins without thinking about it |
| **Why blockchain matters** | The differences are visible on-chain and in contract code — checkable, not opinion |
| **Four-week PoW** | A written comparison with evidence, published in a GitHub repo |
| **Tools** | Circle and Tether docs, Etherscan contract code, DefiLlama, Dune |
| **Alternatives** | Could be a Dune dashboard instead — written form suits the trust-assumption question better |
| **Knowledge gaps** | How attestations actually work; what the freeze functions can and cannot do |
| **Biggest risk** | Drifting into "which is better" instead of "what do you trust" |
| **Definition of done** | 1,500 words, both contracts' freeze mechanisms documented with links, at least three on-chain data points, one section on what I could not verify |

::: important Why this one works
It is **specific, evidence-based, achievable in four weeks, and it names what it
will not do.**

That last row is the difference between finishing and drifting. Write yours
before you start, not after.
:::

::: details Further exploration — optional, not assessed
- Look at previous cohorts' Proof of Work, when available, for a realistic sense of scope
- Read one Messari report and one good Dune dashboard. Notice how narrow the best ones are
- Ask in the Telegram group. Describing your idea to someone is the fastest way to find out it is too big
:::

::: details Sources and attribution
- [ethereum.org — Developer resources](https://ethereum.org/developers/) — Reuse (CC BY 4.0), adapted
- [Dune](https://dune.com/) — Link, referenced only
- [DefiLlama](https://defillama.com/) — Link, referenced only
- [Messari Research](https://messari.io/research) — Link, referenced only
:::
