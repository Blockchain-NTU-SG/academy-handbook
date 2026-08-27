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
| 1 | [`week-1/`](./week-1/) | 7 | 100 points | **drafted** |
| 2 | [`week-2/`](./week-2/) | 6 | 100 points | **drafted** |
| 3 | `week-3/` | 5 | 100 points | not started |
| 4 | `week-4/` | 6–7 | 100 points | not started |
| 5–8 | `week-5/` … `week-8/` | 1 each | 400 points total | not started |

## Structural decisions recorded during drafting

These were approved by the Education Director and depart from, or resolve
ambiguity in, the v1.2 page skeleton:

1. **Week 1 is 7 parts, not 6.** The v1.2 §7 keep-list placed blocks,
   transactions, nodes, cryptography intuition, consensus intuition and
   PoW vs PoS on a single page. Consensus and PoW vs PoS were split onto their
   own part so no page exceeds the weight of Week 1 Part 1.
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
that recurs across Week 1 Part 4, Week 1 Part 7 and Week 2 Part 6 as the
Foundation's running motif.

`::: tabs` and `::: steps` containing other containers must use **four colons**
on the outer container, or markdown-it will close the wrong block.

### Screenshot slots

Pages awaiting a real screenshot carry a `<figure class="academy-shot">` with a
`.academy-shot-pending` placeholder, styled in
[`docs/.vuepress/styles/index.scss`](../.vuepress/styles/index.scss). Replace the
inner placeholder `<div>` with an `<img>`; the figure and caption stay as they
are. Three are outstanding — Week 0 Parts 1 and 4, and Week 1 Part 6.

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

## Blocking risk — testnet end-of-life

> **Sepolia has a scheduled end-of-life of approximately 30 September 2026.**

Every hands-on activity in this programme runs on Sepolia: Week 1 Part 6, the
Week 1 Anchor Mission, and all of Week 3's Remix and deployment work. A
successor Ethereum application testnet is expected to launch and run in parallel
during a grace period, and Hoodi — the Holesky replacement — is aimed at
validator and staking testing rather than application development, so it is not
a drop-in substitute.

**Action required before the next cohort:** confirm the current recommended
Ethereum application testnet and, if it has changed, update these together as a
single change, since they share the dependency:

- `week-1/day-5-wallets-and-accounts.md` (mainnet vs testnet section)
- `week-1/day-6-your-first-transaction.md` (the entire walkthrough)
- `week-1/anchor-mission.md` (submission items and reviewer notes)
- all of Week 3 when drafted

Faucet availability is a second, smaller risk. The Alchemy Sepolia faucet
requires a small Ethereum Mainnet balance to qualify, which most Academy
learners will not have — the Google Cloud faucet is listed first in Week 1
Part 6 for that reason. Re-test every faucet before each cohort.

## Open items carried from the v1.2 analysis

These are unresolved and are tracked here so they are not lost:

- The LXDAO permission record covering the Web3 Internship Handbook and the
  MyFirst projects is referenced in `SOURCES.md` but not linked anywhere.
  Three sources are labelled **Reuse** on the strength of it.
- Moledao's Web3 Internship Handbook (v1.2 §29) is not yet classified in
  `SOURCES.md`. It should be added as **Link**, reference only.
- The Semester 1 Materials Plan and Semester 1 Resource List are referenced by
  `docs/resources/README.md` and v1.2 §33 but do not exist in this repository.
- Track kits gate the Week 4 Anchor Mission and the Week 5 Define page. A
  learner cannot scope a four-week Proof of Work against an empty page.
- Three screenshot slots need images captured by a human — Week 0 Parts 1 and 4,
  and Week 1 Part 6. See **Screenshot slots** above.
- Forward links in `week-1/day-7-the-user-journey.md` point at `../week-3/` and
  `../week-4/`, which do not exist in this folder yet. They resolve once those
  weeks are drafted, and resolve to the canonical paths after migration.
