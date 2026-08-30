#!/usr/bin/env bash
# Claude Code statusLine: model | context % | session cost
# Reads the statusline JSON payload on stdin (see code.claude.com/docs/en/statusline).
input=$(cat)

model=$(jq -r '.model.display_name // .model.id // "?"' <<<"$input")
ctx_pct=$(jq -r '.context_window.used_percentage // empty' <<<"$input")
cost=$(jq -r '.cost.total_cost_usd // empty' <<<"$input")

ctx_display="ctx ?%"
if [ -n "$ctx_pct" ]; then
  ctx_display=$(printf 'ctx %.0f%%' "$ctx_pct")
fi

cost_display="\$?"
if [ -n "$cost" ]; then
  cost_display=$(printf '$%.4f' "$cost")
fi

printf '%s | %s | %s\n' "$model" "$ctx_display" "$cost_display"
