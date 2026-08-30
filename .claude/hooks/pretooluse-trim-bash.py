#!/usr/bin/env python3
# PreToolUse/Bash hook: rewrites noisy install/build/test commands to pipe their
# combined output through trim-bash-output.sh before it ever reaches the model.
# PostToolUse hooks can only append additionalContext, not replace tool output,
# so trimming has to happen here by rewriting tool_input (updatedInput) pre-execution.
import json
import os
import re
import sys

data = json.load(sys.stdin)
command = data.get("tool_input", {}).get("command", "")

NOISY = re.compile(
    r"\b(npm|npx|yarn|pnpm)\s+(install|ci|run\s+\S+|test|build|update)\b"
    r"|\bnext\s+(build|lint)\b"
    r"|\btsc\b"
    r"|\bjest\b|\bvitest\b",
    re.IGNORECASE,
)

if not command or not NOISY.search(command):
    print("{}")
    sys.exit(0)

hook_dir = os.path.dirname(os.path.abspath(__file__))
trimmer = os.path.join(hook_dir, "trim-bash-output.sh")

wrapped = f'set -o pipefail; {command} 2>&1 | "{trimmer}"'

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "allow",
        "updatedInput": {"command": wrapped},
    }
}))
