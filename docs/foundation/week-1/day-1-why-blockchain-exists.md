---
week: 1
day: 1
title: "Why blockchain exists"
status: review
owner: "Director of Education"
reading_time: "15 min"
sources:
  - name: "ethereum.org — Web3"
    url: "https://ethereum.org/web3/"
    label: "Reuse"
  - name: "ethereum.org — What is Ethereum"
    url: "https://ethereum.org/what-is-ethereum/"
    label: "Reuse"
  - name: "ethereum.org — Intro to Ethereum"
    url: "https://ethereum.org/developers/docs/intro-to-ethereum/"
    label: "Reuse"
  - name: "Bitcoin whitepaper"
    url: "https://bitcoin.org/bitcoin.pdf"
    label: "Link"
---

# Week 1 · Day 1 — Why blockchain exists

## Why this matters

Most people meet blockchain through prices, tokens and hype, which is a bad
introduction because it skips the actual problem the technology was built to
solve. If you don't understand that problem, everything afterwards — wallets,
gas, contracts — is arbitrary rules to memorise.

Today is the only day with no software to install. It's the day that makes the
rest of the programme make sense.

## Learning objectives

By the end of this page you should be able to:

- Explain what problem blockchains were designed to solve, without using the word "crypto"
- Describe the difference between a system with an operator and one without
- Give one example where removing the operator genuinely helps, and one where it doesn't

## Core

### Every online system you use has an operator

When you send someone money through a bank app, you don't transfer anything. You
ask your bank to update its records. The bank owns the ledger, decides whether the
update happens, and can reverse it.

That arrangement works well. Operators are efficient, and they can fix mistakes.
Most of the time you want one.

The catch is that everyone in the system has to trust the operator — to stay
solvent, stay honest, stay online, and keep serving you. Usually reasonable. Not
always.

### The problem: agreeing without an operator

Say you want a shared record of who owns what, where no single party controls it.
Now you have a genuinely hard problem. If everyone keeps their own copy, whose
copy is right when they disagree?

Copying a file is free, so nothing stops someone spending the same money twice by
telling two different people two different things. With an operator this is easy —
they check their records. Without one, it went unsolved for decades.

### The idea

A blockchain is a shared record that many independent computers maintain
together, with rules that let them agree on what is true without any of them being
in charge.

Three things make it work:

| Element | What it does |
|---|---|
| **Shared ledger** | Everyone holds the same record, and anyone can read it |
| **Rules everyone checks** | A change is only valid if it follows the rules, and every participant verifies this independently |
| **Agreement mechanism** | A way to settle what gets added next, even when participants don't trust each other |

That third element is **consensus**, and it's Day 2.

### What it costs

This is where most introductions stop, and it's the part worth being honest about.

Removing the operator is expensive. Thousands of computers redoing the same work
is slower and costlier than one company running one database. Nobody can reverse a
mistake for you. Nobody can restore your access if you lose your keys.

So the useful question is never "should this be on a blockchain?" — it's **is the
operator actually a problem here?**

- Your university's exam records? The operator is fine. NTU is trusted, accountable, and reversing an error is a feature.
- Sending money to someone in another country through four intermediaries who each take a fee and a day? The operator is more of a problem.

You'll meet plenty of projects that got this question wrong. Being able to ask it
is most of what separates someone who understands this space from someone
repeating what they heard.

## Landscape

You'll hear these words in the same breath as blockchain. You don't need to be
able to build any of them — just place them on the map.

- **Bitcoin** — the first working example of this idea, built for payments only
- **Ethereum** — the same idea, but the shared record can also run programs
- **Consensus** — the agreement mechanism above. Tomorrow's topic
- **Crypto assets** — what gets tracked on these records. Day 3

## Worked example

Two people agree Ann pays Ben $50.

**With an operator.** Ann's bank reduces her balance, increases Ben's, and records
it. If the bank goes down, nothing happens. If it makes an error, it can fix it.
Both trust the bank.

**Without one.** Ann announces to a network that she's sending 50 to Ben, signed
with a key only she holds. Participants check she has 50 and hasn't already spent
it. They agree to add it to the shared record. It's now permanent, visible to
anyone, and reversible by no one — including Ann, and including whoever wrote the
software.

Notice what got harder: no help if Ann sent it to the wrong address. And what got
easier: Ben needs no permission from anyone to receive it, and no third party can
freeze it.

## Further exploration

Optional depth. No points, not assessed.

- [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) — the original 2008 proposal. Nine pages. Section 1 alone is worth reading, and states the double-spend problem more plainly than most modern explanations.
- [ethereum.org — Web3](https://ethereum.org/web3/) — how the same idea extends beyond payments.

## Sources and attribution

- [ethereum.org — Web3](https://ethereum.org/web3/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — What is Ethereum](https://ethereum.org/what-is-ethereum/) — Reuse (CC BY 4.0), adapted
- [ethereum.org — Intro to Ethereum](https://ethereum.org/developers/docs/intro-to-ethereum/) — Reuse (CC BY 4.0), adapted
- [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) — Link, referenced only
