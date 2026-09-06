# Governance

This document records who decides what in the Blockchain@NTU Academy Handbook.
It is intentionally lightweight: the aim is to make committee handovers and
contributor decisions clear, not to create a legal process.

## Decision ownership

### Curriculum architecture

Blockchain@NTU Academy Education leadership owns:

- week structure and learning outcomes;
- assessment and Anchor Mission architecture;
- the shared Foundation and specialisation structure.

Changes to these areas require Education approval.

### Ordinary content maintenance

Maintainers may approve typo fixes, clarity improvements, examples, factual
updates, broken links, screenshots and source updates when the curriculum scope
does not materially change.

### New Core content or assessment

New Core requirements, learning objectives or assessment expectations require
explicit Education approval. A richer explanation or Landscape example does not
automatically create a new requirement.

### Engineering and site changes

Maintainers approve VuePress, theme, scripts, workflows and other site or
engineering changes. Changes should preserve the canonical `docs/` source and
the existing validation workflow.

### Sources and licensing

Source, attribution and licence changes require explicit source/licence review.
Keep page-level attribution and the repository [SOURCES.md](./SOURCES.md) record
in agreement.

## Learner feedback flow

Use this lightweight path:

```text
feedback → triage → fix now / backlog / further exploration / decline
```

Learner confusion is evidence, not an automatic instruction to add more
material. Record the page, section, learner background and exact point of
confusion before deciding on a fix. The [content-review guide](./reviewers/content-review.md)
defines the categories used for beginner read-through.

## Contribution decisions

All changes use the normal branch and pull-request workflow. The PR should make
the intended scope, sources and validation visible. For curriculum changes,
contributors should identify the concept owner and whether the change is Core,
Landscape or Further Exploration.

When a decision is not clear, pause the scope change and ask Education leadership
or the relevant maintainer rather than inferring a new curriculum rule from one
page.
