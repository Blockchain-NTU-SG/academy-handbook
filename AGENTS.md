# Agent instructions for Blockchain@NTU Academy Handbook

## Scope

- Work only on a branch and deliver changes through a pull request.
- Treat `docs/` as the single learner-facing source of truth. Do not maintain a
  duplicate curriculum tree elsewhere in the repository.
- Treat the Education Director's Foundation v1.2 architecture as authoritative:
  Week 0, Foundation Weeks 1–4, Weeks 5–8 Proof of Work, and the four directions.
- Do not invent curriculum decisions, missions, assessment requirements or
  missing educational content. Mark missing pages as `stub`, `drafting`, `review`
  or `TODO` instead.

## Content and safety

- Preserve existing writing, frontmatter status/ownership, sources and attribution.
- Keep the Core / Landscape / Further Exploration distinction intact.
- Required activities must be testnet-only. Never add real-money or mainnet
  requirements.
- Do not add student personal data, credentials, API keys or other secrets.
- Check every adapted page against `SOURCES.md`; do not turn the handbook into a
  link directory.

## Engineering and delivery

- Preserve useful VuePress + Plume infrastructure, search, Markdown enhancements,
  Mermaid diagrams and GitHub Pages deployment unless a scoped change requires
  otherwise.
- Do not blindly sync `upstream`. Review upstream changes selectively.
- Run `npm ci` and `npm run docs:build` before proposing a documentation change.
- Do not push directly to `main`; use a branch and pull request.
