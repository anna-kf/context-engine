# Context Engine

An open-source toolkit for indexing a codebase, retrieving relevant repository context, and using that context for code review. It is designed to work across repositories and providers; MovieBuddy is planned as the first evaluation project.

> **Status:** early development. The first milestone is a local, reusable Context Engine. GitHub Actions, hosted storage, and automated PR comments are later milestones.

## MVP architecture

Start with one TypeScript package. Keep the first release easy to run locally, and separate responsibilities with small interfaces rather than creating a monorepo before there are independently released packages.

- **Context Engine:** walks a repository, filters files, chunks source, indexes it, and retrieves context for a diff.
- **Provider interfaces:** embeddings, vector storage, language models, and repository access are replaceable adapters.
- **Review Engine:** later coordinates agents and combines their findings; it does not own indexing.
- **GitHub integration:** later invokes the review flow in Actions and updates the index only after merge.

For the first working slice, use deterministic local chunking and a local vector-store implementation. Add semantic embeddings behind an interface once retrieval can be exercised independently. Store the indexed commit SHA and replace chunks by file path when updating, so PR changes remain outside the base index until merged.

## Development

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run build
npm test
```

## Planned MVP issues

1. **Bootstrap the TypeScript project** — npm scripts, strict compiler settings, test runner, and a minimal CI workflow.
2. **Repository file collection and filtering** — honor `.gitignore`, skip binary/generated/dependency files, and make exclusions configurable.
3. **Code chunking** — produce stable chunks with path and line metadata; test boundaries and unsupported files.
4. **Index and update contracts** — define embedding and vector-store interfaces, record commit SHA, and replace changed/deleted file chunks without duplicates.
5. **Local retrieval and context building** — retrieve relevant chunks for changed files/diff and inspect the result without an LLM.
6. **Review orchestration and finding schema** — define agent contracts and run agents concurrently against a prepared context.
7. **Security and pattern agents, then aggregation** — add findings, deduplication, severity/confidence, and a consolidated report.
8. **GitHub Actions integration** — review PR diffs and update the base index only after merge.
9. **MovieBuddy evaluation** — measure retrieval quality and false positives against real changes.

## Design decisions to revisit

- Pick an embedding model and local persistence format after measuring retrieval on the initial chunk set.
- Choose a hosted vector store only when a shared or durable index is needed.
- Define the GitHub permissions and comment format when the local review flow is stable.

See [LICENSE](LICENSE) for license terms.
