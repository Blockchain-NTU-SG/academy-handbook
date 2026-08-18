# Contributing to Blockchain@NTU Academy Handbook

Thank you for helping build the Academy's open learning material.

## Before you edit

Read the relevant page in `docs/`, the matching file in `templates/`, and the
source classifications in `SOURCES.md`. The Education Director's Foundation v1.2
architecture is not reopened in ordinary content pull requests.

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
```

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
- validation performed, including `npm run docs:build`.

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
