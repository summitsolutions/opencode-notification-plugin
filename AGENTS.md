# AGENTS.md - The Operating Manual

This document defines the strict workflow for all development in this repository. Every task MUST follow this workflow.

## THE EXECUTION HARNESS

### 1. Analysis & Planning
Before executing any major task:
1.  Analyze the request against the current state.
2.  Populate the CLI Todo list using `todowrite`.
3.  Present the plan to the user and obtain approval.

### 2. The Task Loop
For every task in the Todo list:
1.  **Assume Work**: Mark exactly *one* task as `in_progress`.
2.  **Execute**: Perform the necessary code changes or shell operations.
3.  **Verify (The Quality Gate)**: Before marking a task `completed`, you must run a specific test, check, or script (`bun test` or `bun lint`) to prove it works.
4.  **Update Progress**: Update the CLI Todo list.

### 3. Decisions & Deviations
If an architectural choice is made or a significant pivot occurs:
1.  Stop the current loop.
2.  Document the "Why" in `DECISIONS.md`.
3.  Update the Todo list to reflect the new path.

---

## CURRENT ACTIVE MISSION
**MISSION:** Development & Maintenance  
**STATUS:** ACTIVE

---

## ARCHIVE (Master Plan History)
- Initial migration and scaffold complete.
- Implemented Port/Adapter pattern with Lazy loading.
- Established bun:test Quality Gates.
