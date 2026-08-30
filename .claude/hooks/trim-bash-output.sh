#!/usr/bin/env bash
# Reads command output on stdin, prints:
#   - any earlier line that looks like an error (deduped by keeping them once, near the top)
#   - the last 30 lines of output
# Used by pretooluse-trim-bash.py to keep noisy install/build/test output out of context.
awk '
  tolower($0) ~ /error|exception|fail|fatal|traceback|panic/ { err[NR] = $0 }
  { line[NR] = $0; last = NR }
  END {
    keep_from = (last > 30) ? last - 29 : 1
    for (i = 1; i < keep_from; i++) {
      if (i in err) print "[earlier error] " err[i]
    }
    if (keep_from > 1) print "... (" (keep_from - 1) " lines omitted) ..."
    for (i = keep_from; i <= last; i++) print line[i]
  }
'
