---
week: 0
day: 5
title: "Regulatory awareness: Singapore and global orientation"
status: drafting
owner: "Director of Education"
reading_time: "20 min"
sources:
  - name: "MAS — Guidelines on Licensing for Digital Token Service Providers"
    url: "https://www.mas.gov.sg/regulation/guidelines/guidelines-on-licensing-for-dtsps"
    label: "Link"
  - name: "MAS — Guidelines on Consumer Protection Measures by DPT Service Providers (PS-G03)"
    url: "https://www.mas.gov.sg/regulation/guidelines/ps-g03-guidelines-on-consumer-protection-measures-by-dpt-service-providers"
    label: "Link"
  - name: "MAS — Clarifies Regulatory Regime for Digital Token Service Providers (2025)"
    url: "https://www.mas.gov.sg/news/media-releases/2025/mas-clarifies-regulatory-regime-for-digital-token-service-providers"
    label: "Link"
  - name: "MAS — Expands Scope of Regulated Payment Services (2024)"
    url: "https://www.mas.gov.sg/news/media-releases/2024/mas-expands-scope-of-regulated-payment-services"
    label: "Link"
  - name: "SEC — Crypto Assets and the Federal Securities Laws"
    url: "https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws"
    label: "Link"
  - name: "CFTC — Digital Assets"
    url: "https://www.cftc.gov/LearnandProtect/digitalassets/index.htm"
    label: "Link"
  - name: "European Commission — Crypto-assets (MiCA)"
    url: "https://finance.ec.europa.eu/digital-finance/crypto-assets_en"
    label: "Link"
  - name: "U.S. Treasury — GENIUS Act"
    url: "https://home.treasury.gov/news/press-releases/sb0197"
    label: "Link"
  - name: "U.S. Treasury — GENIUS Act implementation proposal (2026)"
    url: "https://home.treasury.gov/news/press-releases/sb0605"
    label: "Link"
---

# Week 0 · Part 5 — Regulatory awareness: Singapore and global orientation

[Part 4](./safety.md) was about losing things to attackers. This is the
other way people get hurt: assuming that because something is legal and
licensed, it is therefore safe.

::: danger The misunderstanding this page exists to prevent
**A licensed platform is not an endorsed token.**

When MAS licenses a service provider, it regulates **that business** — conduct,
custody, AML controls. It does not review, approve or vouch for the individual
tokens available on it.
:::

You are studying in Singapore, so MAS is the local context. Other jurisdictions
use different frameworks, and the same token or activity may be treated
differently elsewhere.

::: warning Scope
This is **not a law lecture** and is deliberately short. Nothing here is legal
or financial advice.
:::

## Learning objectives

- Explain why regulation attaches to activities rather than to technology
- State plainly why "MAS-licensed" does not mean a token is safe
- Recognise which kinds of activity typically create regulatory obligations
- Find the current official position instead of relying on what you read on X

## Core

### Regulation follows the activity, not the technology

The most useful single idea on this page.

Regulators do not generally ask "is this a blockchain?" They ask **what are you
actually doing, and for whom.** Holding customer assets, running an exchange,
issuing a payment token, moving money across borders — these are recognisable
financial activities, and they attract obligations whether the plumbing is a
database or a distributed ledger.

::: important The question is never "is crypto legal in Singapore?"
It is: **what activity is this, who is it for, and does that activity already
have rules?**
:::

### Activities that typically attract obligations

Recognition level. Not a compliance checklist.

| Activity | Why it attracts attention |
|---|---|
| **Custody** — holding assets for someone else | You have other people's money |
| **Exchange** — matching buyers and sellers | Market conduct, consumer protection |
| **Transmission** — moving value between parties or borders | Money laundering, sanctions |
| **Token issuance and fundraising** | May look like a securities offering |
| **Payment services** | An established regulated category |

In Singapore the main framework is the **Payment Services Act**, administered by
MAS. MAS expanded the scope of regulated payment services in 2024 to cover
custody of digital payment tokens, facilitating transfers and exchanges of them,
and facilitating cross-border transfers. In 2025 it further clarified the regime
for digital token service providers.

::: warning Two things matter more than those details
**The rules change.** The paragraph above will age. Check the current MAS
position rather than trusting a summary — including this one.

**Structure determines treatment.** Two superficially similar tokens can be
treated completely differently depending on what rights they carry and how they
were sold.
:::

### KYC is normal

When a centralised exchange asks for identity documents, that is standard
anti-money-laundering practice applied to a regulated financial business. The
same reason a bank asks.

You will meet a cultural argument that KYC is contrary to the spirit of crypto.
Whatever you make of it, it does not change the legal position for a regulated
intermediary — and refusing to understand the distinction mostly leads people
toward unregulated venues with fewer protections.

The genuine trade-off is worth naming:

| Aspect | Regulated intermediary | Self-custody |
|---|---|---|
| Recourse and support | Yes | None |
| Someone accountable | Yes | You |
| Custody of your assets | Them | You |
| Privacy | Low — KYC | Higher |
| Permission needed | Yes | No |

Week 1 returns to this properly.

### Regulated does not mean safe

A token can be listed on a fully licensed, compliant exchange and still be
worthless, poorly designed, or fail entirely. **Nothing about the platform's
licence transfers to the assets it lists.**

MAS has been notably direct here. Its consumer protection guidelines for digital
payment token service providers require providers to *discourage* retail
speculation — including not offering trading incentives, credit-card funding, or
leverage to retail customers.

::: important Read that as what it is
**A regulator that permits the activity while actively warning about the risk.**
Both halves are true at once, and holding both is the mark of someone who
understands this space.
:::

### Rules differ by jurisdiction

Singapore's treatment is not the world's. The same token, protocol and activity
can be regulated differently in the EU, the US, Japan or Hong Kong — and a
protocol's users span all of them simultaneously.

You do not need to learn other regimes. You need to notice when a claim like
"this is regulated" or "this is banned" has quietly dropped the words *where*
and *for what activity*.

### A global regulatory map

You do not need to memorise every rule. Start by knowing which question each
framework helps answer:

| Framework | What it helps you understand |
|---|---|
| **SEC (United States)** | Whether a crypto asset or transaction may fall within US federal securities laws; the answer depends on its structure and the activity involved |
| **CFTC (United States)** | Oversight of certain commodity derivatives and anti-fraud or manipulation concerns in relevant digital-asset markets; it is not a blanket regulator for every crypto activity |
| **MiCA (European Union)** | A harmonised framework for issuing crypto-assets and providing related services that are not covered by other EU financial-services laws |
| **GENIUS Act (United States)** | A federal framework for payment stablecoins, including issuer, reserve and compliance requirements. Implementation rules and effective dates are being phased in; check current Treasury guidance. It does not regulate every crypto asset |

These frameworks are orientation points, not a legal checklist. Check the
current regulator or legislative source for the jurisdiction, asset and activity
you are actually asking about.

Across current frameworks, the recurring questions are simple: who may provide
the service, how customer assets or stablecoin reserves are protected, how
AML/CFT and sanctions risks are handled, and what users are told. The labels and
thresholds differ, so use these questions to read new rules rather than treating
one framework as universal.

## Landscape

| Term | Meaning |
|---|---|
| **MAS** | Monetary Authority of Singapore — central bank and integrated financial regulator |
| **Payment Services Act (PSA)** | The main Singapore framework for payment and DPT services |
| **DPT** | Digital Payment Token — the PSA's term for a cryptocurrency |
| **DTSP** | Digital Token Service Provider — the category clarified by MAS in 2025 |
| **AML / CFT** | Anti-money-laundering and countering the financing of terrorism |
| **Travel Rule** | Passing originator and beneficiary information alongside certain transfers |
| **Securities treatment** | Some tokens may be regulated as capital markets products |

## Where the Academy sits

::: tip Stated plainly, so there is no ambiguity
- Required Academy activities are designed as **educational, testnet-only exercises** and do not involve handling real customer assets or offering real financial services.
- Academy content is **not financial advice** and **not legal advice**.
- We do not endorse any token, protocol, exchange or project. Named examples throughout the handbook are **illustrative** — chosen because they are recognisable, not because they are recommended.
- If you go on to do something real — issuing a token, holding others' assets, taking money from users — that is the point to get actual professional advice. This handbook is not it.
:::

## Worked example

> **"Is this token safe? It's on a MAS-licensed exchange."**

Take the sentence apart.

| Claim | What it actually supports |
|---|---|
| The exchange holds a MAS licence | That **business** meets requirements on conduct, custody and AML |
| Therefore the token is safe | **Does not follow.** MAS regulates the provider, not the merits of listed assets |
| Therefore I can't lose money | **Does not follow.** Consumer protections reduce specific harms; they do not remove market risk |

A more useful reframing:

> "The exchange is regulated, so there are rules about how it handles my assets
> and identifies its customers. That tells me something real about *counterparty*
> risk. It tells me nothing about whether this token is well designed, actually
> used, or worth anything — and those are separate questions I have to answer
> myself."

Week 4 teaches you how to answer that second half.

::: details Official sources — go here rather than to a summary
Including instead of this page, if the two ever disagree.

- [MAS — Guidelines on Licensing for Digital Token Service Providers](https://www.mas.gov.sg/regulation/guidelines/guidelines-on-licensing-for-dtsps)
- [MAS — Consumer Protection Measures by DPT Service Providers (PS-G03)](https://www.mas.gov.sg/regulation/guidelines/ps-g03-guidelines-on-consumer-protection-measures-by-dpt-service-providers)
- [MAS — Clarifies Regulatory Regime for Digital Token Service Providers (2025)](https://www.mas.gov.sg/news/media-releases/2025/mas-clarifies-regulatory-regime-for-digital-token-service-providers)
- [MAS — Expands Scope of Regulated Payment Services (2024)](https://www.mas.gov.sg/news/media-releases/2024/mas-expands-scope-of-regulated-payment-services)
- [SEC — Crypto Assets and the Federal Securities Laws](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws)
- [CFTC — Digital Assets](https://www.cftc.gov/LearnandProtect/digitalassets/index.htm)
- [European Commission — Crypto-assets (MiCA)](https://finance.ec.europa.eu/digital-finance/crypto-assets_en)
- [U.S. Treasury — Statement on enactment of the GENIUS Act](https://home.treasury.gov/news/press-releases/sb0197)
- [U.S. Treasury — GENIUS Act implementation proposal (2026)](https://home.treasury.gov/news/press-releases/sb0605)
:::

::: warning Maintainer note
Regulatory pages date faster than any other content in this handbook. Re-check
these links and the summary above at the start of each cohort, and treat the MAS
site as authoritative over this page.

Last reviewed: August 2026
:::

::: details Sources and attribution
All MAS references are **Link**, referenced only:

- [Guidelines on Licensing for DTSPs](https://www.mas.gov.sg/regulation/guidelines/guidelines-on-licensing-for-dtsps)
- [Consumer Protection Measures by DPT Service Providers (PS-G03)](https://www.mas.gov.sg/regulation/guidelines/ps-g03-guidelines-on-consumer-protection-measures-by-dpt-service-providers)
- [MAS Clarifies Regulatory Regime for DTSPs (2025)](https://www.mas.gov.sg/news/media-releases/2025/mas-clarifies-regulatory-regime-for-digital-token-service-providers)
- [MAS Expands Scope of Regulated Payment Services (2024)](https://www.mas.gov.sg/news/media-releases/2024/mas-expands-scope-of-regulated-payment-services)
- [SEC — Crypto Assets and the Federal Securities Laws](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws) — Link, referenced only
- [CFTC — Digital Assets](https://www.cftc.gov/LearnandProtect/digitalassets/index.htm) — Link, referenced only
- [European Commission — Crypto-assets (MiCA)](https://finance.ec.europa.eu/digital-finance/crypto-assets_en) — Link, referenced only
- [U.S. Treasury — Statement on enactment of the GENIUS Act](https://home.treasury.gov/news/press-releases/sb0197) — Link, referenced only
- [U.S. Treasury — GENIUS Act implementation proposal (2026)](https://home.treasury.gov/news/press-releases/sb0605) — Link, referenced only

*This page is educational. It is not legal or financial advice.*
:::
