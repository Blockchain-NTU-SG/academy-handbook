# Blockchain@NTU Academy Handbook

Open-source handbook and learning materials for Blockchain@NTU Academy.

This repository is both the canonical source of Academy educational material and
the VuePress website built from that material. The learner-facing handbook is in
`docs/`; maintainers' templates, source records and reviewer guidance live at the
repository root.

## Academy shape

Semester 1 follows **Learn → Build → Prove**:

- **Week 0 — Entering Web3 safely**
- **Weeks 1–4 — Foundation**
  - Week 1: Web3, blockchain, crypto assets and wallets
  - Week 2: Blockchain architectures, Ethereum and interoperability
  - Week 3: Smart contracts, tokens and DApps
  - Week 4: Web3 industry, research and contribution
- **Weeks 5–8 — Proof of Work sprint** in one of four directions: Developer,
  Research, Data, or Product & Ecosystem

The Education Director's Foundation v1.2 decisions are authoritative. Pages use
the learning levels **Core**, **Landscape**, and **Further Exploration**. The
rule is richer content, not heavier assessment. Required activities are testnet
only and the weekly pace is recommended rather than a deadline.

## Local development

Use Node.js 22 or another version allowed by `package.json`, then run:

```bash
npm ci
npm run docs:dev
```

Build the static site with:

```bash
npm run docs:build
```

The default GitHub Pages project URL is configured as:
`https://blockchain-ntu-sg.github.io/academy-handbook/`.

## Repository structure

```text
docs/                 Learner-facing handbook and VuePress source
  getting-started/    Week 0 onboarding
  foundation/         Weeks 1–4 and the Weeks 5–8 sprint framework
  tracks/             Developer, Research, Data, Product & Ecosystem kits
templates/            Page and Anchor Mission authoring formats
reviewers/            Reviewer guidance
SOURCES.md            Reuse, link and avoid classifications
UPSTREAM.md           Upstream shell and attribution note
```

There is one Markdown source for each rendered handbook page. Do not create a
second curriculum copy outside `docs/`.

## Contribution flow

Work on a branch, keep curriculum decisions grounded in the source materials,
preserve page metadata and citations, run `npm run docs:build`, and open a pull
request. Never commit secrets, learner personal data, or real-money/mainnet
requirements. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [AGENTS.md](./AGENTS.md).

## Programme operations

The handbook is the canonical home for learning material and Anchor Mission
instructions. emerging.builders / WCB handles programme operations such as
applications, cohorts, submissions, review workflow, points, progress and
leaderboards. WCB may carry a shorter operational copy, but it does not replace
the canonical handbook page.

## Upstream relationship

This repository began as a fork of the
[ETHPanda / LXDAO Web3 Internship Handbook](https://github.com/ethpanda-org/Web3-Internship-Handbook).
We retain the VuePress + Plume technical shell and relevant attribution, but the
Academy curriculum and learner-facing navigation are maintained here. Upstream is
a technical/reference remote only; do not blindly sync it. See [UPSTREAM.md](./UPSTREAM.md)
and [SOURCES.md](./SOURCES.md) before reusing upstream material.

## Licensing note

The package metadata retains the upstream MIT signal for site/software
infrastructure. Educational material has mixed origins and may carry different
reuse terms. The repository's source classifications and attribution notes are
the working record; where the upstream evidence is ambiguous, do not make a
broader legal claim without review.
