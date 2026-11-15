# Working on Context Engine

## Project purpose

Context Engine is an independent, reusable TypeScript/Node.js tool for indexing repository context and using it in multi-agent code review. MovieBuddy is a future evaluation target; it is not part of this repository or a runtime dependency.

The repository is in early development. Read `README.md` before making changes and inspect the current source before assuming a planned feature already exists. The README describes future work as well as implemented work.

## Architecture boundaries

- Keep repository indexing and context retrieval independent from code review orchestration.
- Keep the project as one npm package until a real release or dependency boundary justifies a monorepo.
- Prefer small TypeScript interfaces at provider boundaries when implementing a feature that needs them. Do not add speculative abstractions or infrastructure.
- Keep the first implementation local and usable without a server or cloud account.
- PR changes must not enter the base-branch index until they are merged. Indexes should record the commit they represent and updates should replace stale data rather than duplicate it.
- Review agents should be independently addable and return a shared finding format; aggregation should treat agreement as a confidence signal, not proof.

## Implementation conventions

- Use TypeScript, Node.js 20+, ESM, and the strict settings in `tsconfig.json`.
- Keep source under `src/` and tests under `tests/`. Source imports should use explicit `.js` extensions for direct Node.js ESM compatibility. Bundler-style TypeScript resolution also permits extensionless imports in tests, such as `../src`.
- Keep dependencies lean. Add a package only when an implemented feature needs it, and explain the choice in the change or documentation.
- Avoid coupling the library to GitHub Actions, OpenAI, MovieBuddy, or a specific vector store. Integrations belong behind adapters or in a later integration package when warranted.
- Never commit API keys, repository secrets, or sensitive code in fixtures, logs, or review findings. Keep `.env` files out of version control; document required settings with placeholders only.
- Handle external API and GitHub errors at the integration boundary. Do not silently discard failures that affect correctness.
- Add focused tests for meaningful behavior and edge cases. Do not claim a build or test passed unless it was run.
- Keep documentation aligned with what exists today; label planned features as planned.

## Local commands

```sh
npm install
npm run build
npm test
```

CI runs the build and test commands on pushes and pull requests.
