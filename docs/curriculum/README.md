# Curriculum drafting area

This folder is the Education Director's authoring workspace for Semester 1
lesson content. Pages here are drafted, reviewed and approved **before** being
migrated into the canonical handbook paths (`docs/getting-started/` and
`docs/foundation/`).

Nothing in this folder is published. `docs/.vuepress/config.ts` excludes
`curriculum/**` from `pagePatterns`, so drafts do not appear on the live site,
in the sidebar, or in site search until they are migrated.

## Authority

Content here is written against the **Education Director's Foundation v1.2
Consolidated Update Notes**. The 4+4 architecture is not reopened: Week 0
onboarding, Weeks 1–4 shared Foundation, Weeks 5–8 Proof of Work sprint, four
directions, one Anchor Mission per week at 100 points, 800 points total.

The governing principle throughout:

> **Richer content ≠ heavier assessment.**

## Structure

Each week is a folder containing a `README.md` index, one Markdown page per
part, and — from Week 1 onward — an `anchor-mission.md`.

| Week | Folder | Parts | Anchor Mission | Status |
|---|---|---|---|---|
| 0 | [`week-0/`](./week-0/) | 5 | None (no points) | **drafted** |
| 1 | [`week-1/`](./week-1/) | 8 | 100 points | **drafted** |
| 2 | [`week-2/`](./week-2/) | 6 | 100 points | **drafted** |
| 3 | `week-3/` | 5 | 100 points | not started |
| 4 | `week-4/` | 6–7 | 100 points | not started |
| 5–8 | `week-5/` … `week-8/` | 1 each | 400 points total | not started |

## Structural decisions recorded during drafting

These were approved by the Education Director and depart from, or resolve
ambiguity in, the v1.2 page skeleton:

1. **Week 1 is 8 parts, not 6.** Two splits. The v1.2 §7 keep-list placed
   blocks, transactions, nodes, cryptography intuition, consensus intuition and
   PoW vs PoS on one page — consensus and PoW/PoS moved to Part 3. A new Part 4
   then covers network incentives (v1.2 revision brief §5.11–5.12), because
   folding it into Part 3 would have made Part 3 the heaviest page in the week.
2. **Week 2 Parts 3/4/5 boundary is fixed.** Part 3 covers why EVM, Ethereum as
   a state machine, and EOA vs contract. Part 4 covers the transaction
   lifecycle, gas, RPC, read vs write, and events/logs at recognition level.
   Part 5 covers L1, L2, sidechains, appchains and bridges. Events and logs are
   introduced in Week 2 and deepened in Week 3 alongside the ABI.
3. **Week 1's closing user journey is an explicit preview.** It reproduces the
   v1.2 §8 diagram in full, but every step not yet taught is labelled and links
   forward to the week that covers it.

## Visual system

Pages use a consistent set of components so emphasis actually means something.
Applied inconsistently, none of it works.

| Content type | Treatment |
|---|---|
| Safety, irreversible loss, the two Academy rules | `::: danger` |
| Common beginner mistake, caveats, maintainer notes | `::: warning` |
| The key idea of a section | `::: important` |
| Useful aside | `::: tip` |
| Further Exploration, Sources, optional depth | `::: details` (collapsed) |
| Parallel material — categories, chains, scenarios | `::: tabs` |
| Hands-on walkthroughs | `::: steps` |
| Reading levels, mission metadata | `<Badge>` |
| Chain and tool identity | `<Icon name="simple-icons:…" />` |

Diagrams are **Mermaid**. The trust-and-risk stack is a hand-authored inline SVG
that recurs across Week 1 Part 5, Week 1 Part 8 and Week 2 Part 6 as the
Foundation's running motif.

`::: tabs` and `::: steps` containing other containers must use **four colons**
on the outer container, or markdown-it will close the wrong block.

### Screenshot slots

Pages awaiting a real screenshot carry a `<figure class="academy-shot">` with a
`.academy-shot-pending` placeholder, styled in
[`docs/.vuepress/styles/index.scss`](../.vuepress/styles/index.scss). Replace the
inner placeholder `<div>` with an `<img>`; the figure and caption stay as they
are. Fifteen are outstanding — Week 0 Parts 1 and 4, and 13 across the Week 1
Part 7 walkthrough.

## Authoring rules

- Follow [`templates/day-page.md`](../../templates/day-page.md) section order
  exactly. Frontmatter is required and is the single source of truth for status.
- Every page separates **Core**, **Landscape** and **Further Exploration**.
- Required activities are **testnet only**. Never introduce a real-money or
  mainnet requirement.
- Never ask a learner for a seed phrase, private key or any credential.
- Every page ends with a Sources and attribution section, and every source is
  classified against [`SOURCES.md`](../../SOURCES.md).
- Prefer a diagram or table over three paragraphs. Mermaid renders natively.

## Maintainer check — testnet and faucets

Every hands-on activity depends on an Ethereum application-development testnet:
Week 1 Part 7, the Week 1 Anchor Mission, and Week 3's deployment work.

**Before each cohort:**

1. Verify the currently recommended Ethereum application-development testnet.
2. Retest every faucet link in `week-1/day-7-your-first-transaction.md`.
3. If the recommended testnet has changed, update these **together** — they
   share the dependency:
   - `week-1/day-6-wallets-and-accounts.md` (mainnet vs testnet section)
   - `week-1/day-7-your-first-transaction.md` (the walkthrough and Chain ID)
   - `week-1/anchor-mission.md` (evidence items and reviewer notes)
   - Week 3 deployment instructions, once written

Testnet plans and faucet eligibility rules both change. **Do not hard-code a
retirement date into learner-facing pages** — check the current position
instead. Sepolia stays the default while it remains the recommended
application-development testnet.

Faucet note: the Alchemy Sepolia faucet requires an Ethereum Mainnet balance to
qualify, which most Academy learners will not have. Google Cloud is listed first
for that reason, with Coinbase CDP as backup and the ethereum.org directory as
the fallback.

## Open items carried from the v1.2 analysis

These are unresolved and are tracked here so they are not lost:

- The LXDAO permission record covering the Web3 Internship Handbook and the
  MyFirst projects is referenced in `SOURCES.md` but not linked anywhere.
  Three sources are labelled **Reuse** on the strength of it.
- Moledao's Web3 Internship Handbook (v1.2 §29) is not yet classified in
  `SOURCES.md`. It should be added as **Link**, reference only.
- The SMU Blockchain "Lesson 1 — Blockchain Basics" deck was used as a
  **coverage reference only**. No text or image from it has been reproduced, and
  no permission has been sought. Do not reuse its visuals without permission and
  a `SOURCES.md` entry.
- web3intern.xyz is cleared for reuse per the revision brief, but is not yet
  recorded in `SOURCES.md`. Add it before adapting any of its visuals.
- The Semester 1 Materials Plan and Semester 1 Resource List are referenced by
  `docs/resources/README.md` and v1.2 §33 but do not exist in this repository.
- Track kits gate the Week 4 Anchor Mission and the Week 5 Define page. A
  learner cannot scope a four-week Proof of Work against an empty page.
- Three screenshot slots need images captured by a human — Week 0 Parts 1 and 4,
  and Week 1 Part 7. See **Screenshot slots** above.
- Forward links in `week-1/day-8-the-user-journey.md` point at `../week-3/` and
  `../week-4/`, which do not exist in this folder yet. They resolve once those
  weeks are drafted, and resolve to the canonical paths after migration.
