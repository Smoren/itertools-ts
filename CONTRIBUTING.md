# Contributing to IterTools for TypeScript

Thank you for your interest in contributing to IterTools! This document describes the process and conventions for contributing to the project.

## Project Overview

IterTools (`itertools-ts`) is an extended port of Python's `itertools` for TypeScript and JavaScript. It provides loop iteration tools, stream iteration tools, and pipe iteration tools for working with iterable collections — including full async support. The codebase is zero-dependency at runtime, targets ES6, and maintains 100% test coverage. Before contributing, please read the [README](README.md) to understand the core concepts: single/multi iteration, streams, pipes, combinatorics, set operations, and the sync/async API conventions.

## Prerequisites

- **Node.js** 18+ (tested on 18–26 in CI)
- **npm** (installed via nvm or otherwise)
- TypeScript 6, Jest 30, ts-jest 29, ESLint 9 (all listed in `devDependencies` — `npm install` handles them)

## Setup

```bash
git clone https://github.com/Smoren/itertools-ts.git
cd itertools-ts
npm install
```

## Common Commands

| Command              | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| `npm run build`      | Build CommonJS (`lib/`) and ESM (`es/`) outputs via `tsc`                |
| `npm run test`       | Run the full test suite with coverage (`jest --coverage`)                |
| `npm run typecheck`  | Type-check `src/` and `tests/` (`tsc -p tests/tsconfig.json`)            |
| `npm run lint`       | Lint `src/` with ESLint (flat config)                                    |
| `npm run lint-tests` | Lint `tests/` with ESLint (flat config)                                  |

## Code Standards

### TypeScript

- `strict: true` — no implicit `any`, no implicit `undefined`, strict null checks
- `isolatedModules: true` — each file must be independently compilable
- Target: ES6, module: Node16, moduleResolution: Node
- JSDoc on all exported entities: describe parameters, return types, and behavior
- `@deprecated` tag on deprecated APIs with a pointer to the replacement

### ESLint

Flat config in `eslint.config.mts` (TypeScript-eslint recommended). Notable rule overrides:
- `@typescript-eslint/no-explicit-any`: off — `any` is used in internal generic machinery where a precise type is inexpressible: tuple manipulations in `ZipTuple`/`Pipe`/`PipeOperationSequence`, variadic iterable handling in `createMultipleIterator`, and the overload chain in `createPipe`. These are compile-time constructs that never degrade inference at call sites. Explicit `any` should not appear in the signatures of public API beyond what the type system requires.

### Formatting

Code style is enforced by ESLint (flat config in `eslint.config.mts`, powered by `typescript-eslint`). There is no separate formatter script — follow the conventions in `.editorconfig` and the surrounding code. Run `npm run lint` / `npm run lint-tests` to verify.

### EditorConfig

2 spaces, LF line endings, UTF-8, trim trailing whitespace, final newline. See `.editorconfig`.

### Testing

- **100% coverage** is required for all source files (statements, branches, functions, lines).
- Tests use Jest + ts-jest, `testEnvironment: node`.
- Test files mirror `src/` structure under `tests/` (e.g., `src/single.ts` → `tests/single/`, `src/stream.ts` → `tests/stream/`). Tests are organized by module.
- Every sync function must have an async counterpart, and both must be tested.
- Example/use-case tests in `tests/examples/` must stay in sync with README code samples.

## Pull Request Process

1. **Open an issue first** for new features or significant changes — discuss the approach before writing code.
2. **Fork the repository** and create a branch from `dev` (not `master`).
3. **Write code and tests** — every new code path must have test coverage, including async variants.
4. **Run all checks locally** before submitting:
   ```bash
   npm run lint
   npm run lint-tests
   npm run typecheck
   npm run build
   npm run test
   ```
5. **Update documentation** — if your change adds or modifies public API, update the README, JSDoc, and relevant test examples.
6. **Keep changes focused** — one PR per feature/fix; avoid unrelated refactoring in the same PR.
7. **Write clear commit messages** — describe what changed and why.

### What we look for in PRs

- Zero runtime dependencies.
- Lazy evaluation via generators (`function*`) — avoid materializing collections unless the operation is inherently terminal.
- Consistent sync/async API: every public sync function should have an `Async`-suffixed counterpart with matching semantics.
- Backward compatibility within the current major line (no breaking API changes without a major version bump).
- Consistent style with existing code.

## Reporting Bugs

Open a [GitHub issue](https://github.com/Smoren/itertools-ts/issues) with:
- IterTools version
- Node.js version
- Minimal reproduction (code snippet or test case)
- Expected vs actual behavior

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
