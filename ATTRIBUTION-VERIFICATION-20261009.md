# October 9 attribution update

First landing campaign tags are retained in this browser tab across navigation and reload. Only utm_source, utm_medium and utm_campaign are stored; bounded strings exclude unrelated query parameters. Direct first landings remain direct. Storage errors do not block inquiry submission.

Saved inquiry recovery freezes the original attribution with its immutable request. The proxy forwards those tags to CRM. Jays inquiry intent remains independent; older saved inquiries without attribution keep their prior routing defaults. Hilltop consent source uses the form path without URL query or fragment.

Regression tests cover navigation/reload/later campaigns, direct entry, invalid or oversized tags, unavailable/corrupt storage, saved request recovery and proxy forwarding. Existing consent and CRM receipt tests pass. Production builds and lint/type checks pass. React review: browser storage is accessed in effects/events only, no server shared mutable state or new network waterfall; capture component has no visible UI.

Production deployment and live campaign-to-CRM evidence are tracked in the central CRM tasks/final-launch-verification-20261008.md checkpoint. Meta conversion installation and event deduplication remain a separate open gate; this update does not send advertising events.
