# Agent instructions for Blockchain@NTU Academy Handbook

## Required references

- Follow [`EDITORIAL_GUIDE.md`](./EDITORIAL_GUIDE.md) for learner-facing writing.
- Follow [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`GOVERNANCE.md`](./GOVERNANCE.md)
  for contribution and decision boundaries.
- Preserve [`SOURCES.md`](./SOURCES.md), page-level attribution and upstream notices.

## Scope and safety

- Work on a branch and deliver changes through a pull request; never push to
  `main` or merge automatically unless explicitly instructed.
- Treat `docs/` as the single learner-facing source of truth. Do not invent
  curriculum architecture, missions, assessment requirements or missing content.
- Preserve frontmatter, status/ownership, Core/Landscape/Further Exploration and
  testnet-only required activities.
- Never add secrets, learner personal data, credentials, API keys or real-money /
  mainnet requirements.
- Do not blindly sync `upstream`; review upstream changes selectively.

## Validation and delivery

- For documentation changes, run `npm ci`, `npm run docs:check-times` and
  `npm run docs:build`; inspect rendered pages when layout changes.
- Use a scoped `type/short-description` branch and
  `type(scope): summary` commit/PR titles.
- Keep one logical objective per PR, inspect the final diff for unrelated files,
  and record validation evidence.
- Preserve the existing VuePress + Plume infrastructure, search, Mermaid support
  and GitHub Pages workflow unless the scoped task requires otherwise.
