/**
 * English is the source dictionary. `it.ts` is typed as `Dictionary`, so a key missing from
 * (or extra in) the Italian file fails `npm run check`.
 */
export interface StageItem {
  title: string;
  name: string;
  p: string;
  writes: string;
  extra?: { badge: string; text: string };
}

export const en = {
  meta: {
    siteName: 'Claimstone',
    tagline: 'A reading machine that refuses to overstate what it read.',
    description:
      'Claimstone finds and reads the literature on your topics and returns, per question, the evidence bound to verbatim quotes, with the coverage it rests on. Open source, Apache-2.0.',
  },
  a11y: { skip: 'Skip to content', menu: 'Menu', mainNav: 'Main', footerNav: 'Footer', language: 'Language' },
  nav: {
    how: 'How it works',
    docs: 'Docs',
    community: 'Community',
    github: 'GitHub',
  },
  footer: {
    licence: 'Apache-2.0',
    repository: 'Repository',
    readme: 'README',
    docsMap: 'Docs map',
    cite: 'Cite',
    contributing: 'Contributing',
    note: 'Claimstone is an open source research tool. It does not give investment, medical or legal advice.',
  },
  home: {
    title: 'Claimstone',
    eyebrow: 'Open source · Apache-2.0',
    h1: 'A reading machine that <em>refuses to overstate</em> what it read.',
    lede: 'Give it topics and a frozen list of questions. It finds the literature, obtains what it legally can, and reads every source. You get, per question, the evidence <strong>bound to verbatim quotes</strong>, with the coverage that evidence rests on.',
    ctaPrimary: 'Star on GitHub',
    ctaSecondary: 'Read the guide',
    facts: ['every claim has a quote', 'no pooling', 'a person signs'],
    card: {
      label: 'Illustrative example of the quote gate',
      accepted: 'accepted',
      rejected: 'rejected → ledger',
      chunk: 'chunk c-0412',
      source:
        '… in the pooled sample, the twelve-month return after a negative headline was <mark>0.8 percentage points lower (p &lt; 0.05)</mark> than after a neutral one, and the gap was not visible at shorter horizons …',
      claimOk: 'Negative headlines are followed by 0.8 pp lower twelve-month returns (p < 0.05).',
      claimBad: 'Negative headlines are followed by 1.2 pp lower twelve-month returns.',
      checksOk: [
        'quote is an exact substring of the chunk',
        'every number and inequality appears in the quote',
      ],
      checksBad: ['“1.2” does not appear in the quote'],
      note: 'Illustrative example, not a result from a real source.',
    },
  },
  why: {
    eyebrow: 'What it is for',
    h2: 'Ask the literature. Check the answer.',
    lede: 'When you read the literature there are two mistakes to avoid: claiming more than the sources say, and concluding that an effect doesn’t exist just because no evidence turned up. Claimstone is for when you can’t afford either.',
    items: [
      {
        problem: 'There are hundreds of papers on your topic and no time to read them.',
        answer: 'It finds candidates through two independent routes, keyword search and citations, gets the legal copy of every paper it can, and reads them one by one.',
      },
      {
        problem: 'AI summaries sound sure of themselves, but you can’t tell what the paper actually says.',
        answer: 'Every claim comes with a quote copied word for word from the paper. The code checks that the quote is really there and that every number in the claim appears in it. What fails is thrown out, and the list of rejections stays visible.',
      },
      {
        problem: '“I found nothing” could mean there is nothing, or that the papers couldn’t be obtained.',
        answer: 'It measures how much of what it found it actually obtained, against a threshold declared in advance. Below it, it stops and draws no conclusions. And it keeps three easily confused cases apart: the sources don’t answer, the sources say the opposite, the sources disagree with each other.',
      },
      {
        problem: 'You need an answer you can defend, not a black box.',
        answer: 'For each question it prepares an evidence profile: every result, how many sources point each way, what was rejected and how much was read. A person reads it and signs. Every step writes plain text files you can open and search.',
      },
    ],
    closing: 'And it isn’t tied to one field. Topics, questions and kinds of source are input files; nothing in the engine is specific to finance or biology.',
  },
  stages: {
    eyebrow: 'How it works',
    h2: 'From your questions to an answer you can check, in six steps.',
    lede: 'You provide the topics and the questions. Claimstone does the rest, one step at a time, and leaves a file at every step that you can open and check.',
    inputLabel: 'You provide',
    input: 'the topics, a fixed list of numbered questions, and the kinds of source you accept. They are three plain files.',
    outputLabel: 'You get',
    output: 'an evidence profile for each question. A person reads it, decides, and signs.',
    writesLabel: 'writes',
    items: [
      { title: 'Finds', name: 'discover', p: 'Searches for papers on your topics in two independent ways: by keywords and by following citations. You get the list of candidates, each marked with what kind of source it is, such as a peer-reviewed paper or a blog post.', writes: 'candidates.jsonl' },
      {
        title: 'Obtains', name: 'acquire',
        p: 'Gets the best legal copy of each paper, preferring open access, and never goes through pirate libraries. It records every attempt and why it failed, so you know how much it could really read.',
        writes: 'acquisitions.jsonl · raw/',
        extra: { badge: 'In development', text: 'Papers behind a paywall can’t be fetched. You will be able to add a copy you got yourself, from a library or by purchase. It goes through the same identity and full-text checks, and is reported on its own line, so it never quietly inflates how much was read.' },
      },
      { title: 'Prepares', name: 'normalize', p: 'Turns PDFs and web pages into clean text and splits it into passages, so every quote can be traced back to an exact place.', writes: 'documents.jsonl · chunks.jsonl' },
      { title: 'Extracts', name: 'extract', p: 'A model proposes the claims it finds in each paper. The code then checks every claim against its quote. The ones that fail are rejected and listed.', writes: 'claims.jsonl · rejections.jsonl' },
      { title: 'Rechecks', name: 'review', p: 'A second, different model rereads each claim in its whole passage, to check it still holds in context.', writes: 'reviews.jsonl' },
      { title: 'Summarizes', name: 'synthesize', p: 'For each question it assembles an evidence profile from what was accepted: the results, how many sources point each way, what was rejected and how much was read. No model, no network, no statistics at this step: it only organizes and counts.', writes: 'profiles.jsonl' },
    ] as StageItem[],
  },
  verdicts: {
    eyebrow: 'The verdict contract',
    h2: 'Five states. None collapses into another.',
    lede: '“We found no evidence” and “there is no effect” are different sentences, and so is “the literature disagrees.”',
    items: [
      { name: 'SUPPORTED', p: 'The evidence points one way, with the coverage to say so.' },
      { name: 'CONTRADICTED', p: 'The evidence points the other way.' },
      { name: 'CONTESTED_IN_LITERATURE', p: 'Sources disagree, and the disagreement is the finding.' },
      { name: 'UNANSWERED_IN_LITERATURE', p: 'The sources read do not answer it. That is not “no effect.”' },
      { name: 'NEVER_ASKED', p: 'The question was not in the frozen list for that round.' },
    ],
    fine: 'Questions are numbered and frozen. Changing the list is a dated version bump, enforced by a digest of every question’s id, text and kind.',
  },
  status: {
    eyebrow: 'Where it stands',
    h2: 'One round has run end to end. No verdict exists yet.',
    lede: 'All six stages are implemented. The first round ran on literature deposited in PubMed Central, and it cleared its floor.',
    items: [
      { value: '37 / 40', label: 'sources confirmed, against a floor of 0.80' },
      { value: '1,721', label: 'accepted annotations' },
      { value: '271', label: 'rejections, kept in the ledger' },
      { value: '0', label: 'verdicts. The only command that writes one takes a person’s signature.', zero: true },
    ],
  },
  join: {
    eyebrow: 'Join in',
    h2: 'Bring a field, a doubt, or a reading.',
    lede: 'The engine holds no domain knowledge. Topics, questions and source classes are input data, so a project in an unrelated field fits without touching the package.',
    items: [
      { h: 'Run it on a new field', p: 'Write the three input files for a topic you know, from public literature, and see what the gate rejects.', cta: 'Follow the guide →', href: 'guide' },
      { h: 'Challenge a decision', p: 'Every design decision is recorded with the measurement that decided it. Read the entry, then bring a better measurement.', cta: 'Read the decisions →', href: 'decisions' },
      { h: 'Report what broke', p: 'A swallowed failure inflates an acquisition rate. If you find one, or a gate that lets something through, open an issue.', cta: 'Open an issue →', href: 'issues' },
    ],
    star: 'Star on GitHub',
    contribute: 'How to contribute',
  },
  howPage: {
    title: 'How it works',
    description: 'The six stages, the quote gate, the acquisition floor and the five verdict states that make up Claimstone.',
    eyebrow: 'How it works',
    h1: 'From a list of questions to an evidence profile.',
    lede: 'Claimstone is six stages that talk through append-only files, and one person who signs at the end.',
    invariantsH2: 'Rules the engine does not bend',
    invariants: [
      { h: 'No claim without a verified quote', p: 'The quote must be an exact substring of its chunk, and every number and inequality in the claim must appear in it. Failures go to the rejection ledger.' },
      { h: 'Five verdict states', p: 'None collapses into another. A question of kind operational receives no verdict at all rather than a sixth state.' },
      { h: 'The acquisition floor gates verdicts', p: 'A round that obtained less than its floor of what it found is INSUFFICIENT_ACQUISITION. There is no override.' },
      { h: 'The engine holds no domain knowledge', p: 'Topics, questions and source classes are input data under projects/.' },
      { h: 'A question change is a dated bump', p: 'A digest of ids, texts and kinds makes a silent change refuse to run.' },
      { h: 'Source class travels with every item', p: 'A blog post and a refereed paper never share a pool without it being recorded which is which.' },
      { h: 'Vote counting is not synthesis', p: 'Stage 6 emits an evidence profile and no verdict. There is no pooling.' },
    ],
    readMore: 'Read the full walkthrough',
  },
  docsPage: {
    title: 'Documentation',
    description: 'Where to read about Claimstone: the guide, the design decisions, the data contracts and the current handoff.',
    eyebrow: 'Documentation',
    h1: 'Where to read more.',
    lede: 'The documentation lives in the repository, next to the code it describes. This page is the map.',
    items: [
      { h: 'Guide', p: 'A walkthrough of a whole round, stage by stage, with what each number means. Start here if you want to run one.', href: 'guide', hrefIt: 'guideIt' },
      { h: 'Design decisions', p: 'Dated decisions, each with the measurement that decided it. Read the entry before arguing with the choice.', href: 'decisions' },
      { h: 'Data contracts', p: 'The exact shape of every file the stages exchange, and the verdict contract.', href: 'contracts' },
      { h: 'Handoff', p: 'What is running now, what is pending, and which decisions belong to a person rather than to the engine.', href: 'handoff' },
      { h: 'Worked example', p: 'A complete project instance built from public literature: topics, questions and sources.', href: 'example' },
      { h: 'Documentation map', p: 'Which file answers which question.', href: 'docsMap' },
    ],
    open: 'Open on GitHub →',
  },
  communityPage: {
    title: 'Community',
    description: 'How to take part in Claimstone: run it on a new field, challenge a decision, report what broke.',
    eyebrow: 'Community',
    h1: 'Claimstone is built in the open.',
    lede: 'Contributions are welcome, and a few rules are not negotiable.',
    waysH2: 'Ways to take part',
    ruleH2: 'The one rule that is not negotiable',
    rule: 'No claim enters the evidence base without a verbatim quote that is verified, in code, to be an exact substring of the source text it is attributed to. A pull request that weakens, bypasses or makes optional this gate will be declined, however convenient the output looks.',
    ruleNote: 'The full list of rules is in the contributing guide.',
    channelsH2: 'Where to talk',
    channels: [
      { h: 'Issues', p: 'Bugs, gates that let something through, and proposals.', href: 'issues', cta: 'Open an issue →' },
      { h: 'Repository', p: 'Read the code, fork it, send a pull request.', href: 'repo', cta: 'Open the repository →' },
      { h: 'Contributing guide', p: 'The rules, and how to add a question, a source class or a project.', href: 'contributing', cta: 'Read the guide →' },
    ],
  },
  notFound: {
    title: 'Page not found',
    h1: 'There is no page here.',
    p: 'The address may be mistyped, or the page may have moved.',
    home: 'Back to the home page',
  },
};

export type Dictionary = typeof en;
