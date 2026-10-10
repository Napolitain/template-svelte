# template-svelte

Minimal Svelte 5 frontend with TypeScript, Vite, Tailwind CSS and pnpm. Hooks via
[prek](https://prek.j178.dev), matching the other [templates](https://github.com/Napolitain/templates).

```text
src/App.svelte     UI and Svelte state
src/lib/           reusable TypeScript logic and components
tests/unit/        Vitest examples, including a fast-check property
tests/browser/     Playwright tests against the production build
```

## Optional Nix shell

Installing the tools directly on NixOS (or another OS) remains supported. The
optional shell supports x86_64/aarch64 Linux and Apple Silicon macOS. With Nix
flakes enabled:

```sh
nix develop --command "$SHELL"       # keep your shell, aliases and prompt
# Or: nix develop                   # use Nix's default Bash shell
```

Then run the normal development commands in this README. Each template has its own
`flake.nix` and `flake.lock`, using `github:NixOS/nixpkgs/nixpkgs-unstable`.
To refresh to the latest unstable packages, run `nix flake update nixpkgs`,
then leave and re-enter the shell. Commit the updated lock file with your project.

The shell supplies the latest Node.js package and pnpm; pnpm uses the project
version declared in `package.json`. On Linux it also supplies Chromium and sets
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`, so skip the Playwright browser download.
On macOS, run `pnpm exec playwright install chromium` after installing dependencies.

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
