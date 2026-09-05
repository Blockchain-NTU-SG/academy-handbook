# Blockchain@NTU Academy Handbook

Beginner-first, open-source Web3 curriculum.

Learn the systems from first principles, participate safely onchain, understand
smart contracts and industry structure, then specialise by building.

[![CI](https://github.com/Blockchain-NTU-SG/academy-handbook/actions/workflows/check-docs.yml/badge.svg)](https://github.com/Blockchain-NTU-SG/academy-handbook/actions/workflows/check-docs.yml)
[![Live handbook](https://img.shields.io/badge/handbook-live-2f80ed)](https://blockchain-ntu-sg.github.io/academy-handbook/)
[![Code: MIT](https://img.shields.io/badge/code-MIT-2ea44f)](./LICENSE)
[![Content: CC BY-NC 4.0](https://img.shields.io/badge/content-CC%20BY--NC%204.0-2ea44f)](./CONTENT-LICENSE.md)

[Read the Handbook](https://blockchain-ntu-sg.github.io/academy-handbook/) · [Curriculum](./docs/README.md) · [Contribute](./CONTRIBUTING.md)

## What this is

The Blockchain@NTU Academy Handbook is a structured shared foundation for
students entering Web3, including learners with no technical background. It is
the canonical source for the Academy's learning material and Anchor Mission
instructions; the public site is built from the same `docs/` source.

The purpose is not to turn a beginner into a professional developer, smart-
contract auditor, DeFi analyst, protocol researcher or investor. It is to build
enough shared context for a learner to participate safely, reason from first
principles and choose a direction for deeper work.

## What learners should leave with

By the end of the shared Foundation, a learner should be able to:

- explain how the main pieces of a blockchain system fit together from first principles;
- use wallets and testnets safely;
- recognise basic L1/L2, EVM, smart-contract and DApp architecture;
- identify important trust assumptions and trade-offs;
- research projects and communicate using basic industry language.

## Curriculum at a glance

**LEARN → BUILD → PROVE**

| Stage | Focus |
|---|---|
| Week 0 | Enter Web3 safely and learn the basic tools and risks. |
| Weeks 1–4 | Shared Foundation: blockchains, Ethereum, wallets, contracts, industry and research. |
| Weeks 5–8 | A Proof of Work sprint in one chosen direction. |
| Four directions | Developer · Research · Data · Product & Ecosystem. |

The Foundation uses **Core**, **Landscape** and **Further Exploration** to make
depth visible. The Academy follows the principle **richer content, not heavier
assessment**: seeing an advanced idea on a page does not automatically make it
a new requirement. Required blockchain activities are testnet-only, and the
weekly pace is a recommended rhythm rather than a deadline.

## How we teach

- **First principles** — start with the problem before naming the mechanism.
- **Beginner-first** — use intuition and a concrete example before precision.
- **Trade-offs, not hype** — explain what a design gains, gives up and assumes.
- **Learn → Build → Prove** — connect understanding to a small, reviewable output.

See the full writing and review standard in [EDITORIAL_GUIDE.md](./EDITORIAL_GUIDE.md).

## How to use the Handbook

1. Start with the [programme overview](./docs/getting-started/programme.md).
2. Complete [Week 0: Entering Web3 safely](./docs/getting-started/).
3. Follow the [Foundation](./docs/foundation/) from Week 1 through Week 4.
4. Choose a direction and complete the [Proof of Work sprint](./docs/foundation/proof-of-work/).

Anyone can use the Handbook at their own pace. Cohort members follow the same
learning path with a weekly rhythm, missions, peer learning, feedback and review
through the programme platform.

## Repository structure

```text
docs/                 Learner-facing handbook and VuePress source
  getting-started/    Week 0 onboarding
  foundation/         Weeks 1–4 and the Weeks 5–8 sprint framework
  tracks/             Developer, Research, Data, Product & Ecosystem kits
templates/            Page and Anchor Mission authoring formats
reviewers/            Submission and beginner content-review guidance
.github/              CI, CODEOWNERS, PR and Issue templates
AGENTS.md             Agent-specific repository guardrails
EDITORIAL_GUIDE.md    Canonical writing and learner-review standard
GOVERNANCE.md         Decision ownership and feedback routing
SOURCES.md            Reuse, Link and Avoid source classifications
LICENSE               MIT licence for code/site infrastructure
CONTENT-LICENSE.md    CC BY-NC 4.0 statement for original content
UPSTREAM.md           Upstream shell and attribution note
```

There is one Markdown source for each rendered handbook page. Do not create a
second curriculum copy outside `docs/`.

## Contributing

The normal contribution flow is branch → commit → pull request → checks →
review. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before editing and use
[GOVERNANCE.md](./GOVERNANCE.md) when a change may affect curriculum scope or
decision ownership.

## Programme operations boundary

The Handbook is the canonical home for learning material and Anchor Mission
instructions. emerging.builders / WCB handles applications, cohorts,
submissions, review workflow, points, progress and leaderboard data. WCB may
carry a shorter operational copy, but it does not replace the canonical Handbook
page. Never add WCB API keys or private operational data here.

## Sources and attribution

Adapted material, links and permission records are tracked in
[SOURCES.md](./SOURCES.md), while retained upstream shell attribution is recorded
in [UPSTREAM.md](./UPSTREAM.md). Check both before reusing material.

## Licensing

| Material | Licence |
|---|---|
| Code/site infrastructure | [MIT](./LICENSE) |
| Original Blockchain@NTU educational content | [CC BY-NC 4.0](./CONTENT-LICENSE.md) |
| Third-party/adapted material | Original source terms; see [SOURCES.md](./SOURCES.md) |

The package metadata's MIT signal refers to the software/package surface. It is
not a blanket licence for every sentence, image or adapted source in the
repository.

## Upstream relationship

This repository began as a fork of the
[ETHPanda / LXDAO Web3 Internship Handbook](https://github.com/ethpanda-org/Web3-Internship-Handbook).
We retain the VuePress + Plume technical shell and relevant attribution, but the
Academy curriculum and learner-facing navigation are maintained here. Upstream is
a technical/reference remote only; do not blindly sync it.

## Local development

Use Node.js 22 or another version allowed by `package.json`, then run:

```bash
npm ci
npm run docs:dev
```

Build and consistency-check the static site with:

```bash
npm run docs:build
npm run docs:check-times
```

The default GitHub Pages project URL is
[https://blockchain-ntu-sg.github.io/academy-handbook/](https://blockchain-ntu-sg.github.io/academy-handbook/).
