---
week: 4
day: 3
title: "Which tool answers which question"
status: drafting
owner: "Director of Education"
reading_time: "25 min"
sources:
  - name: "Messari Research"
    url: "https://messari.io/research"
    label: "Link"
  - name: "Dune"
    url: "https://dune.com/"
    label: "Link"
  - name: "DefiLlama"
    url: "https://defillama.com/"
    label: "Link"
  - name: "L2BEAT"
    url: "https://l2beat.com/"
    label: "Link"
  - name: "Etherscan"
    url: "https://etherscan.io/"
    label: "Link"
  - name: "Snapshot"
    url: "https://snapshot.org/"
    label: "Link"
---

# Week 4 · Part 3 — Which tool answers which question

::: important The most transferable page in this handbook
Every specific fact in Weeks 1–3 will eventually age. Chains change, protocols
die, standards get superseded.

**This does not.** If you leave the Academy with one thing, make it the ability
to investigate something you have never heard of and reach a defensible view.
:::

[Week 0 Part 3](../../getting-started/tools.md) introduced the tools. This is the
**workflow** — which source fits which question, and how to cross-check.

## Learning objectives

- Match a question type to the right class of source
- Apply the five-source model to an unfamiliar protocol
- Explain what each source can show, and what it still cannot tell you
- Recognise when you have enough to conclude, and when you do not

## Core

### Five source types

Week 0 introduced a five-part model. Week 4 turns it into a workflow. Start with
the source that fits the question, then cross-check before concluding.

| Source type | Examples | Best for | Limits |
|---|---|---|---|
| **Primary sources** | Docs, GitHub, governance forums | Intended design, code and proposals | May describe plans rather than current practice |
| **Direct chain records** | Explorers, transactions and state | What happened on-chain | Usually cannot explain intent |
| **Derived analytics** | Dune, DefiLlama | Interpreted activity and comparisons | Definitions, queries and labels shape the result |
| **Independent research** | L2BEAT, Messari, audits | Risk analysis and comparison | Scope, authorship and incentives matter |
| **Current discussion** | X, Discord, Telegram, news | Discovery and context | Useful leads, not final proof |

::: warning Beginners often start with current discussion and stop there
Because it is the loudest, fastest and most confident-sounding layer. It is also
the least verified.

**Use social media for discovery, not as final evidence for an important claim.**
X is excellent for finding out that something happened. It is a poor place to
confirm it happened the way someone says.
:::

### Question → source

The practical version. Match the question type, not the tool's popularity.

| Your question | Go to | Not to |
|---|---|---|
| What does it claim to do? | Official docs | X threads |
| How is it actually built? | <span class="academy-brand-label"><Icon name="simple-icons:github" /><strong>GitHub</strong></span> | Marketing site |
| Who can change or upgrade it? | Docs, governance forum, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/l2beat.png" alt="" aria-hidden="true" /><strong>L2BEAT</strong></span> for L2s | Assumptions |
| Did this transaction happen? | <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/etherscan.svg" alt="" aria-hidden="true" /><strong>Etherscan</strong></span> | Anyone's screenshot |
| Is the contract verified? | <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/etherscan.svg" alt="" aria-hidden="true" /><strong>Etherscan</strong></span> Contract tab | The team's word |
| How much value is in it? | <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/defillama.jpg" alt="" aria-hidden="true" /><strong>DefiLlama</strong></span> | The project's own dashboard |
| Is anyone actually using it? | <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/dune.png" alt="" aria-hidden="true" /><strong>Dune</strong></span> | Follower counts |
| How does it compare to peers? | <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/defillama.jpg" alt="" aria-hidden="true" /><strong>DefiLlama</strong></span>, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/messari.jpg" alt="" aria-hidden="true" /><strong>Messari</strong></span> | A comparison the project made |
| What was decided, and by whom? | Governance forum, <span class="academy-brand-label"><img class="academy-brand-icon" src="/brand/icons/snapshot.png" alt="" aria-hidden="true" /><strong>Snapshot</strong></span> | A summary tweet |
| What is happening right now? | <span class="academy-brand-label"><Icon name="simple-icons:x" /><strong>X</strong></span>, <span class="academy-brand-label"><Icon name="simple-icons:discord" /><strong>Discord</strong></span> | — this is the one place it wins |

::: tip The single most useful habit
When someone makes a claim about a protocol, ask yourself: **which row of that
table would settle this?**

Usually one would, in under five minutes. Most disagreements online are between
people who have not opened it.
:::

### What each source type can and cannot tell you

:::: tabs
@tab Primary sources

**Docs, GitHub, governance forums, the protocol's own writing.**

**Can tell you:** the intended design, how upgrades work, who holds admin keys,
what the team is actually building, what has been proposed and argued.

**Cannot tell you:** whether any of it is true in practice, or whether anyone
uses it.

::: tip GitHub is underrated as a research tool
Commit frequency, open issues, and who is contributing tell you more about a
project's health than any announcement. A protocol whose repository has been
quiet for eight months is telling you something.
:::

@tab Direct chain records

**Etherscan and other block explorers.**

**Can tell you:** what actually happened on-chain. Transactions, state, whether a
contract is verified, and who deployed it.

**Cannot tell you:** *why*. On-chain data has no intent. A spike in addresses may
be adoption or one person with a script.

::: important Use the source that fits the claim
If a project claims growth and the chain records a different pattern, the direct
record is an important check on the claim. Derived analytics are useful for
patterns, but their definitions and queries still need checking.
:::

@tab Derived analytics

**Dune and DefiLlama.**

**Can tell you:** useful interpretations of on-chain activity, such as trends,
flows, protocol comparisons and dashboards.

**Cannot tell you:** a definition-free version of the truth. Check the query,
schema, labels and methodology behind the number.

@tab Structured research

**Messari, L2BEAT, institutional research.**

**Can tell you:** a considered analysis by someone who spent longer than you,
with framing and comparison you would take hours to build.

**Cannot tell you:** anything you should accept unexamined. Research has authors,
audiences and sometimes sponsors. **Check what is being compared and how terms
are defined** — "TVL" means different things on different sites.

@tab Current discussion

**X, Discord, Telegram, news.**

**Can tell you:** that something is happening, what the current narrative is,
what critics are saying, where to look next.

**Cannot tell you:** whether any of it is accurate.

::: warning Two specific traps
**"FUD"** is the standard reply to inconvenient evidence. Notice when criticism
is being dismissed rather than answered.

**"DYOR" and "NFA"** cluster around the claims that deserve the most scrutiny —
[Week 0 Part 2](../../getting-started/glossary.md) flagged this. They are disclaimers,
not evidence.
:::
::::

### When have you done enough?

You do not need certainty. You need a **defensible** view.

::: important A reasonable stopping point
1. You can state what it does **in your own words**
2. You have cross-checked the key claim with another source type that actually fits the question
3. You can name **one thing that would change your mind**
4. You can say **what you still do not know**

Points 3 and 4 are what separate research from advocacy. Anyone can accumulate
supporting evidence.
:::

## Landscape

- **Dune dashboards** — mostly community-built. Check the query before trusting the chart
- **TVL definitions** — differ by site; double-counting is common
- **Token unlock schedules** — future supply hitting the market. Frequently omitted
- **Nansen, Arkham** — wallet labelling and entity attribution
- **Etherscan Token Approvals** — audit your own permissions
- **Governance forums** — often the most honest writing about a protocol's problems
- **Audit reports** — usually public. Read the findings, not just the fact of an audit

## Worked example

> **"This new lending protocol has $400M TVL and is completely safe."**

Two claims. Both checkable in about ten minutes.

::: steps
1. **Does the $400M exist?**

   [DefiLlama](https://defillama.com/) — find the protocol, check TVL and its
   trend. A number that appeared last week behaves differently from one built
   over a year.

2. **Where did it come from?**

   [Dune](https://dune.com/) — how many unique depositors? $400M from 30
   addresses is a very different fact from $400M from 30,000, and both round to
   "$400M TVL".

3. **What can go wrong?**

   Docs and GitHub — is it audited, and by whom? Which oracle does it use? Who
   can upgrade the contracts? [Week 3 Part 5](../week-3/part-5-security-and-approvals.md)
   gave you the vocabulary for all three.

4. **Who controls it?**

   Governance forum and the contract's admin functions on Etherscan. **A
   multisig that can upgrade the contracts is the single most important fact
   most people never check.**

5. **What are people saying?**

   X and Discord — **last**, for context and for critics you had not thought of.
:::

::: important On "completely safe"
[Week 2 Part 6](../week-2/part-6-trust-and-risk-map.md) already answered this.
Nothing with contracts, an oracle and an upgrade key is "completely safe" — the
useful question is **what has to hold, and who has to behave.**

If someone cannot answer that about their own protocol, that is itself a finding.
:::

**A defensible conclusion sounds like this:**

> "TVL is real and roughly $400M, but 60% sits with eight addresses, so it is
> concentrated. Audited by one firm in March; the oracle is Chainlink; a 3-of-5
> multisig can upgrade the contracts, which is the main risk I would want to
> understand better. I have not verified who holds those keys."

Note what it does: **names the evidence, quantifies where it can, states the
main risk, and admits what is unknown.** That is what Week 5–8 research work
looks like, and it is what the [Anchor Mission](./anchor-mission.md) is asking
you to start doing.

::: details Further exploration — optional, not assessed
- [Messari Research](https://messari.io/research) — read one report and notice its structure. Professional research has a shape worth copying
- [L2BEAT](https://l2beat.com/) — the clearest public writing on trust assumptions anywhere
- [Dune](https://dune.com/) — open a dashboard and read the SQL. You will never trust a chart the same way again
- Pick a protocol you already like and try to build the *bear* case using only primary sources
:::

::: details Sources and attribution
- [Messari Research](https://messari.io/research) — Link, referenced only
- [Dune](https://dune.com/) — Link, referenced only
- [DefiLlama](https://defillama.com/) — Link, referenced only
- [L2BEAT](https://l2beat.com/) — Link, referenced only
- [Etherscan](https://etherscan.io/) — Link, referenced only
- [Snapshot](https://snapshot.org/) — Link, referenced only
:::
