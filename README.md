# template-svelte

Minimal Svelte 5 frontend with TypeScript, Vite, Tailwind CSS and pnpm. Hooks via
[prek](https://prek.j178.dev), matching the other [templates](https://github.com/Napolitain/templates).

```text
src/App.svelte     UI and Svelte state
src/lib/           reusable TypeScript logic and components
tests/unit/        Vitest examples, including a fast-check property
tests/browser/     Playwright tests against the production build
```

## Start

Install Node.js 24+, the pnpm version in `package.json`, and prek.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
prek install                       # pre-commit + pre-push hooks
pnpm dev
```

On Linux, Playwright may also need system libraries: `pnpm exec playwright install --with-deps chromium`.
On NixOS, optionally point `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` at a compatible system Chromium.

## Checks

```sh
pnpm verify                        # formatting, lint, types, coverage, build, browser
pnpm test:watch                     # unit tests during development
prek run -a                        # autofix formatting/lint, then check types
prek run -a --hook-stage pre-push   # types, coverage, build, browser
```

- TypeScript: strict mode, checked indexed access, exact optional properties, unused-code checks,
  and checked JavaScript. App/unit files and Node tooling/browser tests have separate configurations.
- ESLint: strict type-aware TypeScript rules and the official Svelte recommended rules; autofixes
  run before Prettier. Svelte compiler warnings fail the type check, including accessibility warnings.
- Complexity: ESLint `complexity` limits cyclomatic complexity to 10; SonarJS
  `cognitive-complexity` limits cognitive complexity to 15. Both are errors in `pnpm lint`,
  pre-commit hooks and CI, including TypeScript inside Svelte scripts, tests and tooling.
  Limits live in `eslint.config.js`; refactor violations manually. These measure functions,
  not Svelte template markup. Only the SonarJS complexity rule is enabled.
- TypeScript stays on 6.0 while `svelte-check` and `typescript-eslint` require that API. Prettier
  owns JSON formatting as well, avoiding conflicts with prek's generic JSON formatter.
- Coverage: V8, minimum 80% each for statements, branches, functions and lines in `src/lib/**/*.ts`,
  including untested files. The report is in `coverage/index.html`. This measures TypeScript logic;
  UI behavior is exercised separately by Playwright.
- CI: frozen dependency install and the same pre-commit/pre-push hooks on GitHub Actions.

Use `pnpm build` to generate `dist/` and `pnpm preview` to inspect it locally. Run `pnpm build`
before invoking `pnpm test:browser` directly. This is a client-rendered frontend; configure your
static host to serve `dist/`. Add routing, server APIs or deployment configuration when needed.

The starter uses Svelte 5 `$state`/`$derived`, a labeled input and a live greeting. Replace the
example and its tests when starting your project. No environment variables are required;
Vite variables prefixed with `VITE_` are public browser values and must not contain secrets.
