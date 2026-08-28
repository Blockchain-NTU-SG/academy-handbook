import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';

const academyNote = defineNoteConfig({
  dir: '',
  link: '/',
  sidebar: [
    { text: 'Blockchain@NTU Academy', link: '/' },
    {
      text: 'Getting started',
      link: '/getting-started/programme.html',
      collapsed: false,
      items: [
        {
          text: 'Week 0 · Entering safely',
          link: '/getting-started/',
          collapsed: true,
          items: [
            { text: 'Part 1 · Welcome and setup', link: '/getting-started/welcome-and-setup.html' },
            { text: 'Part 2 · Starter glossary', link: '/getting-started/glossary.html' },
            { text: 'Part 3 · Tool map', link: '/getting-started/tools.html' },
            { text: 'Part 4 · Staying safe', link: '/getting-started/safety.html' },
            { text: 'Part 5 · Regulatory awareness', link: '/getting-started/regulatory-awareness.html' },
          ],
        },
      ],
    },
    {
      text: 'Foundation',
      link: '/foundation/',
      collapsed: false,
      items: [
        {
          text: 'Week 1 · First principles',
          link: '/foundation/week-1/',
          collapsed: true,
          items: [
            { text: 'Part 1 · Why blockchain exists', link: '/foundation/week-1/day-1-why-blockchain-exists.html' },
            { text: 'Part 2 · How shared state works', link: '/foundation/week-1/day-2-how-shared-state-works.html' },
            { text: 'Part 3 · Consensus, and how chains agree', link: '/foundation/week-1/day-3-consensus.html' },
            { text: 'Part 4 · Why anyone runs the network', link: '/foundation/week-1/day-4-incentives.html' },
            { text: 'Part 5 · What crypto assets actually are', link: '/foundation/week-1/day-5-crypto-asset-map.html' },
            { text: 'Part 6 · Wallets, accounts and keys', link: '/foundation/week-1/day-6-wallets-and-accounts.html' },
            { text: 'Part 7 · Your first transaction', link: '/foundation/week-1/day-7-your-first-transaction.html' },
            { text: 'Part 8 · How it all connects', link: '/foundation/week-1/day-8-the-user-journey.html' },
            { text: 'Anchor Mission', link: '/foundation/week-1/anchor-mission.html' },
          ],
        },
        {
          text: 'Week 2 · Architectures',
          link: '/foundation/week-2/',
          collapsed: true,
          items: [
            { text: 'Part 1 · Access models', link: '/foundation/week-2/day-1-access-models.html' },
            { text: 'Part 2 · Comparing blockchains', link: '/foundation/week-2/day-2-comparing-blockchains.html' },
            { text: 'Part 3 · Ethereum and the EVM', link: '/foundation/week-2/day-3-why-ethereum-and-evm.html' },
            { text: 'Part 4 · Transactions, state and gas', link: '/foundation/week-2/day-4-transactions-and-gas.html' },
            { text: 'Part 5 · L1, L2 and bridges', link: '/foundation/week-2/day-5-l1-l2-and-bridges.html' },
            { text: 'Part 6 · Trust and risk map', link: '/foundation/week-2/day-6-trust-and-risk-map.html' },
            { text: 'Anchor Mission', link: '/foundation/week-2/anchor-mission.html' },
          ],
        },
        {
          text: 'Week 3 · Smart contracts',
          link: '/foundation/week-3/',
          collapsed: true,
          items: [
            { text: 'Part 1 · What a smart contract is', link: '/foundation/week-3/day-1-what-is-a-smart-contract.html' },
            { text: 'Part 2 · Solidity minimum', link: '/foundation/week-3/day-2-solidity-minimum.html' },
            { text: 'Part 3 · Remix lab', link: '/foundation/week-3/day-3-remix-lab.html' },
            { text: 'Part 4 · Tokens and standards', link: '/foundation/week-3/day-4-tokens-and-standards.html' },
            { text: 'Part 5 · Security and approvals', link: '/foundation/week-3/day-5-security-and-approvals.html' },
            { text: 'Anchor Mission', link: '/foundation/week-3/anchor-mission.html' },
          ],
        },
        {
          text: 'Week 4 · Ecosystem',
          link: '/foundation/week-4/',
          collapsed: true,
          items: [
            { text: 'Part 1 · Industry map', link: '/foundation/week-4/day-1-industry-map.html' },
            { text: 'Part 2 · Who is who', link: '/foundation/week-4/day-2-who-is-who.html' },
            { text: 'Part 3 · Research tool map', link: '/foundation/week-4/day-3-research-tool-map.html' },
            { text: 'Part 4 · GitHub in practice', link: '/foundation/week-4/day-4-github-in-practice.html' },
            { text: 'Part 5 · AI-native building', link: '/foundation/week-4/day-5-ai-native-building.html' },
            { text: 'Part 6 · Choosing your direction', link: '/foundation/week-4/day-6-direction-card.html' },
            { text: 'Anchor Mission', link: '/foundation/week-4/anchor-mission.html' },
          ],
        },
      ],
    },
    {
      text: 'Weeks 5–8 · Proof of Work',
      link: '/foundation/proof-of-work/',
      collapsed: true,
      items: [
        { text: 'Week 5 · Define', link: '/foundation/proof-of-work/week-5-define.html' },
        { text: 'Week 6 · Build V0', link: '/foundation/proof-of-work/week-6-build.html' },
        { text: 'Week 7 · Review and improve', link: '/foundation/proof-of-work/week-7-review.html' },
        { text: 'Week 8 · Ship', link: '/foundation/proof-of-work/week-8-ship.html' },
      ],
    },
    {
      text: 'Tracks',
      link: '/tracks/',
      collapsed: true,
      items: [
        { text: 'Developer', link: '/tracks/developer/' },
        { text: 'Research', link: '/tracks/research/' },
        { text: 'Data', link: '/tracks/data/' },
        { text: 'Product & Ecosystem', link: '/tracks/product-ecosystem/' },
      ],
    },
    { text: 'Resources', link: '/resources/' },
    { text: 'Acknowledgements', link: '/acknowledgements.html' },
  ],
});

export const enNotes = defineNotesConfig({
  dir: '/',
  link: '/',
  notes: [academyNote],
});
