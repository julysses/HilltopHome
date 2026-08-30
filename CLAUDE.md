# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Token efficiency

- Be concise. Don't narrate steps you're about to take or re-explain what the
  code already shows through good naming — say what changed and why only
  when it isn't obvious.
- Route purely mechanical work — renames, reformatting, boilerplate
  generation, summarizing/scraping text, straightforward data transforms —
  to a Haiku sub-agent via the Agent tool instead of doing it inline on a
  larger model.
- Never suggest `/clear` or `/compact` as a cost-saving move. If context is
  genuinely full, say so plainly and let the user decide; don't frame
  compaction as an optimization.

## Project

Next.js 14 (App Router) + TypeScript + Tailwind site. Key scripts:
`npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.
