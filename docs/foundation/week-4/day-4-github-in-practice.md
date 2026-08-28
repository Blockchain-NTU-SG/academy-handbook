---
week: 4
day: 4
title: "GitHub in practice"
status: drafting
owner: "Director of Education"
reading_time: "14 min"
sources:
  - name: "GitHub Docs — About repositories"
    url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories"
    label: "Reuse"
  - name: "GitHub Docs — About pull requests"
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"
    label: "Reuse"
  - name: "GitHub Docs — About READMEs"
    url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
    label: "Reuse"
  - name: "Choose a License"
    url: "https://choosealicense.com/"
    label: "Link"
---

# Week 4 · Part 4 — GitHub in practice

You made an account and pushed one commit in
[Week 0 Part 1](../../getting-started/welcome-and-setup.md). This is the working
knowledge you need for Weeks 5–8, where your Proof of Work lives on GitHub.

::: important GitHub is not only for developers
**For the Academy, GitHub is the default home for your Proof of Work.**
Developers can store code there; researchers can publish analysis; data learners
can publish queries or notebooks; Product learners can publish a teardown or
documented proposal.
:::

## Learning objectives

- Use repositories, commits, branches, issues and pull requests appropriately
- Write a README someone can actually follow
- Explain why a licence matters, and choose one
- Explain how to credit sources and AI assistance honestly

## Core

### The vocabulary, in working order

| Term | What it is | When you use it |
|---|---|---|
| **Repository** | A project folder with full history | One per project |
| **Commit** | One saved change, with a message | Every meaningful step |
| **Branch** | A separate line of work used to make changes without immediately changing the main version | Developing a feature or fix without changing the main line |
| **Pull request** | A proposed change, opened for review | Contributing, or reviewing your own work |
| **Issue** | A tracked task, bug or question | Planning, and inviting help |
| **Fork** | Your own copy of someone else's repo | Contributing to a project you cannot push to |
| **README** | The front page | The first page people usually read |

::: tip Commit messages are documentation
`fix stuff` tells a future reader nothing. `fix: handle empty response from
faucet API` tells them what changed and why.

You will read your own history in Week 8 when writing up your Proof of Work.
Write for that person.
:::

### The README is the deliverable

Most people spend weeks building and ten minutes on the README. Reviewers,
employers and collaborators read the README and often nothing else.

::: important A README that works
```markdown
# Project name

One sentence: what this is and who it is for.

## The problem

Two or three sentences. What is broken or missing?

## What this does

What it actually does today — not what you plan.

## How to view, reproduce or use it

Where can someone see the output, reproduce it, or try it?

## How to run it

Numbered steps someone else can follow on a clean machine.

## What I learned

The part reviewers actually care about.

## Limitations and next steps

What does not work yet, and what you would do next.

## Sources and AI assistance

What you used, and where it came from.
```
:::

Two sections carry disproportionate weight.

**Limitations** signals judgement. A project claiming no weaknesses reads as
either dishonest or unexamined. Naming yours is the strongest signal in the
document.

**How to run it** is where most fail. Steps that work on your machine because of
something you set up months ago and forgot are not steps. Test them somewhere
clean.

### Licences

::: warning No licence means "all rights reserved"
Public code with no licence is **not** open source. Legally, nobody may use,
modify or distribute it. Most people assume the opposite.
:::

| Licence | Roughly |
|---|---|
| **MIT** | A common permissive software licence; reuse is allowed if the notice is kept |
| **Apache 2.0** | Like MIT, plus explicit patent terms |
| **GPL-3.0** | Derivatives must also be GPL |
| **CC BY 4.0** | For writing and documentation, not code |

For Academy work, **MIT is a sensible default** unless you have a reason
otherwise. [choosealicense.com](https://choosealicense.com/) walks you through it
in two minutes.

Note the split this handbook itself uses — code under one licence, written
content under another. [Week 0 Part 3](../../getting-started/tools.md) touched on
this: a repository badge saying MIT usually refers to the *code*, not the
articles.

### Attribution, honestly

You will build on other people's work. That is normal and expected. What matters
is being straightforward about it.

| Situation | What to do |
|---|---|
| Used a library | Standard — respect its licence |
| Adapted someone's code | Credit them and link the source |
| Followed a tutorial | Say so. Nobody minds |
| Forked and modified | GitHub shows this automatically. Explain what you changed |
| Used AI substantially | Say what it produced — see [Part 5](./day-5-ai-native-building.md) |

::: important The Academy's position
**Using AI, tutorials and other people's code is expected, not penalised.**

The reviewer standard is not "did you write every line". It is
[*"can you explain what a piece of your submission does, and what would break if
it changed?"*](../week-3/anchor-mission.md)

Copying without understanding fails that test. Copying with understanding, and
saying so, is just how software gets built.
:::

## Landscape

- **`.gitignore`** — files git should never track. Keep secrets out of history
- **GitHub Actions** — automation on push or PR. This handbook uses it to check every PR builds
- **GitHub Pages** — free static hosting. Useful for a project site
- **Releases and tags** — marking a version
- **Gist** — a single-file snippet, for sharing something small
- **Stars, forks, watchers** — weak popularity signals. Commit history says more
- **CODEOWNERS** — who must review changes to which files

::: danger Never commit secrets
Private keys, API keys, `.env` files, recovery phrases.

Deleting a secret in a later commit does not make it safe. Copies may already
exist in earlier history or clones. Assume anything committed to a public repo
is public.

If it happens: rotate the key immediately. Treat it as compromised, because it is.
:::

## Worked example

Two repositories from the same eight-week sprint. Same amount of work.

::: tabs
@tab The one nobody can use

```text
web3-project/
  main.py
  test.py
  notes.txt
```

- README: none, or one line
- Commits: `update`, `update`, `fix`, `asdf`
- Licence: none
- No indication of what it does or how to run it

A reviewer cannot tell what it is, whether it works, or what the member learned.
**The work may be excellent — it is unreadable, so it cannot count for anything.**

@tab The one that works

```text
sepolia-gas-tracker/
  README.md
  LICENSE
  .gitignore
  src/
  data/
  docs/screenshots/
```

- README: problem, what it does, how to run it, what was learned, limitations, sources
- Commits: `feat: add gas price fetcher`, `docs: add setup steps`, `fix: handle API timeout`
- Licence: MIT
- Screenshots showing it running

A reviewer understands it in two minutes without asking a question. So does
anyone else who finds it later.
:::

::: important The difference is about an hour of work
And it is the difference between something that counts as Proof of Work and
something that does not.

Your GitHub profile is the most durable thing you take out of this programme.
Week 8 will ask you to ship the second version — start building the habits now.
:::

::: details Further exploration — optional, not assessed
- [GitHub Skills](https://skills.github.com/) — short interactive courses; "Introduction to GitHub" takes about 20 minutes
- [Choose a License](https://choosealicense.com/) — two minutes, and settles the question
- Find a Web3 project you use and read its repository. Notice the README structure, the issue templates, and how contributions are reviewed
:::

::: details Sources and attribution
- [GitHub Docs — About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories) — Reuse (CC BY 4.0), adapted
- [GitHub Docs — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) — Reuse (CC BY 4.0), adapted
- [GitHub Docs — About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — Reuse (CC BY 4.0), adapted
- [Choose a License](https://choosealicense.com/) — Link, referenced only
:::
