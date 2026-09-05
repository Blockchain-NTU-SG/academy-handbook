# Contributing to Blockchain@NTU Academy Handbook

Thank you for helping build the Academy's open learning material.

## Before changing curriculum

Read the [Editorial Guide](./EDITORIAL_GUIDE.md) and [Governance](./GOVERNANCE.md)
before changing learner-facing content. Before opening a curriculum PR:

1. Identify which page owns the concept.
2. Decide whether the change is Core, Landscape or Further Exploration.
3. Explain the learner gap being addressed.
4. Do not expand assessment merely because the prose expands.
5. Use current primary or official sources when ecosystem facts may change.

Ordinary typo, broken-link and factual corrections do not require a full
pedagogical proposal.

## Before you edit a page

Read the relevant page in `docs/`, the matching file in `templates/`, and the
source classifications in `SOURCES.md`. The Education Director's Foundation v1.2
architecture is not reopened in ordinary content pull requests.

## Contribution types

Learner-content corrections, learner-content proposals, visual or screenshot
changes, site/engineering changes, and source/attribution changes all use the
same branch → pull request workflow. State the type and intended scope clearly
so the appropriate reviewer can respond.

## Local setup

```bash
git clone https://github.com/Blockchain-NTU-SG/academy-handbook.git
cd academy-handbook
npm ci
npm run docs:dev
```

Use Node.js 22 where possible. The production check is:

```bash
npm run docs:build
npm run docs:check-times
```

## Branches, commits and pull requests

Use a lightweight branch name in the form `type/short-description`, for
example `feat/academy-theme-refresh`, `docs/week-2-interoperability` or
`fix/mobile-navigation`. Existing sensible branch names do not need to be
renamed solely to comply.

Use a concise Conventional-Commit-style title for commits and pull requests:
`type(scope): summary`. Use lowercase types and scopes. The recommended types
are `feat`, `fix`, `docs` and `chore`; useful scopes include `theme`,
`foundation`, `track`, `resources`, `curriculum`, `repo` and `deps`. Keep the
summary specific, concise and without a trailing period.

Each pull request should have one clear logical objective. Its body should
explain the Objective, Scope, Changes and Validation. Visual changes should
include rendered-page or local-preview review notes. Curriculum changes need
appropriate maintainer review, and source/attribution rules remain unchanged.
For learner-facing curriculum changes, complete the curriculum checks in the PR
template.
Before pushing, squash local iterative commits when appropriate. After review,
use GitHub's Squash and merge for changes going into `main` so the shared
history remains concise.

Pull requests targeting `main` automatically run `npm ci`,
`npm run docs:build` and `npm run docs:check-times` on Node.js 22 through the
documentation build check. These checks validate the handbook only; they do not
deploy Pages.

## Content workflow

1. Create a branch from the current default branch.
2. Edit the one canonical Markdown page in `docs/`.
3. Preserve frontmatter, status/owner metadata and the page's sources.
4. Keep required activities testnet-only and avoid learner personal data.
5. For a new page, start from the appropriate template and mark it `stub`,
   `drafting`, `review` or `done` honestly.
6. Run the build and inspect the rendered page when the layout changes.
7. Open a pull request using the repository template.

## Pull requests

Please describe:

- what changed and which Academy section it affects;
- whether the change is original, adapted, or link-only material;
- source and attribution updates;
- validation performed, including `npm run docs:build` and
  `npm run docs:check-times` for relevant Foundation changes.

Curriculum changes should include the Education Director or the relevant
maintainer as a reviewer. The repository's CODEOWNERS file records the default
maintainer group.

## Operations boundary

The handbook contains canonical learning and Anchor Mission instructions.
emerging.builders / WCB handles applications, cohort operations, submissions,
review, points, progress and leaderboard data. Do not add WCB API keys or private
operational data to this repository.

## Upstream

The `upstream` remote points to the original Web3 Internship Handbook for
technical/reference comparison. Do not blindly merge or sync it, and do not
reintroduce its learner-facing Chinese/Traditional Chinese curriculum into the
Academy navigation. Preserve relevant attribution; see `UPSTREAM.md`.
