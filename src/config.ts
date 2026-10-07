/** Facts about the project that appear on more than one page. Change them here only. */
export const REPO = 'https://github.com/Jonbj/claimstone';
export const REPO_BLOB = `${REPO}/blob/main`;
export const LICENCE = 'Apache-2.0';

export const links = {
  repo: REPO,
  issues: `${REPO}/issues`,
  readme: `${REPO_BLOB}/README.md`,
  readmeIt: `${REPO_BLOB}/README.it.md`,
  contributing: `${REPO_BLOB}/CONTRIBUTING.md`,
  citation: `${REPO_BLOB}/CITATION.cff`,
  licence: `${REPO_BLOB}/LICENSE`,
  docsMap: `${REPO_BLOB}/docs/README.md`,
  guide: `${REPO_BLOB}/docs/GUIDE.md`,
  guideIt: `${REPO_BLOB}/docs/GUIDE.it.md`,
  decisions: `${REPO_BLOB}/docs/DESIGN_DECISIONS.md`,
  handoff: `${REPO_BLOB}/docs/HANDOFF.md`,
  contracts: `${REPO}/tree/main/docs/contracts`,
  example: `${REPO}/tree/main/projects/example-news-and-returns`,
} as const;
