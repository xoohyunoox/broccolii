# Agent Logs

These files are the shared memory of Team C — the four agents that build Broccolii.

The **product-owner-orchestrator** writes to these files during every autonomous work session. You read them when you check in.

## Files

| File | What's in it | When to read |
|---|---|---|
| `progress_log.md` | What got built/changed in each session | When you want to see what happened |
| `decisions_log.md` | Decisions the orchestrator made autonomously (reversible, two-way-door choices) | When something feels "off" and you want to know why a choice was made |
| `questions_queue.md` | Questions the orchestrator queued for you | **Read this every time you check in — these block forward progress** |
| `blockers.md` | Hard blockers — work that cannot continue at all | Only when the orchestrator says all tracks are stuck |

## How to use

1. **When you return** from being away, ask the orchestrator: "Session summary?"
2. **Review** `questions_queue.md` first — answer in batch
3. **Skim** `decisions_log.md` to catch any decision you disagree with — push back early, before it compounds
4. **Tell the orchestrator** to start the next session with your answers

## Decision policy reminder

The orchestrator follows this rule:

- **Decide and log** if the choice is reversible (code style, file names, internal data shapes, minor copy variants)
- **Queue for you** if the choice is irreversible (brand voice, product scope, legal interpretation, strategic copy, anything that changes the PRD)
- **Default to queue when uncertain**

If you find the orchestrator deciding things you wanted to decide, tighten the policy in `.claude/agents/product-owner-orchestrator.md`. If it's queuing too much, loosen it. Tune over the first 2–3 sessions.
