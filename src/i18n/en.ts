/**
 * English is the source dictionary. `it.ts` is typed as `Dictionary`, so a key missing from
 * (or extra in) the Italian file fails `npm run check`.
 */
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
    eyebrow: 'Why it works this way',
    h2: 'Built around one failure it will not commit.',
    lede: 'Reporting “we found no evidence” as “there is no effect.” Everything unusual about the design follows from that.',
    items: [
      {
        h: 'A claim without a verified quote is discarded.',
        p: 'The quote is checked in code to be an exact substring of the source text, and every number in the claim must appear in it. What fails goes to a rejection ledger, which is the denominator: you cannot read the acceptance rate without seeing what was rejected.',
      },
      {
        h: 'A corpus that did not obtain what it found produces nothing.',
        p: 'Below its declared floor, a round reports <code>INSUFFICIENT_ACQUISITION</code> and writes no conclusions. There is no flag to override it. A corpus read at 42% that certifies itself complete is worse than none.',
      },
      {
        h: 'No verdict is automatic.',
        p: 'The engine produces an evidence profile: the results, the direction count labelled as a count, the coverage, the rejections, and what a second reader refused to pass. A person reads it and signs against the hash of what they were shown.',
      },
      {
        h: 'Every figure names the instrument that made it.',
        p: 'Parsers, gates and thresholds carry version numbers. A tool refuses to pass when one changes without being recorded, and the design record holds the measurement that decided each choice.',
      },
    ],
  },
  stages: {
    eyebrow: 'The pipeline',
    h2: 'Six stages, one append-only file between each.',
    lede: 'Nothing holds state in memory. A crash is resumable and every figure is greppable.',
    items: [
      { name: 'discover', p: 'Two independent channels, keyword search and citations, find the candidates.', writes: 'candidates.jsonl' },
      { name: 'acquire', p: 'Obtains the best legal copy and records every attempt and why it failed.', writes: 'acquisitions.jsonl · raw/' },
      { name: 'normalize', p: 'PDFs and HTML become one document shape, then chunks.', writes: 'documents.jsonl · chunks.jsonl' },
      { name: 'extract', p: 'A model proposes claims. A gate verifies each one against its quote.', writes: 'claims.jsonl · rejections.jsonl' },
      { name: 'review', p: 'A different model reads each claim against its whole passage.', writes: 'reviews.jsonl' },
      { name: 'synthesize', p: 'An evidence profile per question. No model, no network, no statistics.', writes: 'profiles.jsonl' },
    ],
    signName: 'adjudicate',
    sign: 'A person records the verdict and signs it. If the evidence later changes, the signature is marked stale instead of quietly kept.',
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
