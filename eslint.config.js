import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig(
    globalIgnores(['dist/', 'coverage/', 'playwright-report/', 'test-results/', '.cache/']),
    js.configs.recommended,
    ts.configs.strictTypeChecked,
    ts.configs.stylisticTypeChecked,
    svelte.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: ['.svelte'],
            },
        },
    },
    { files: ['src/**'], languageOptions: { globals: globals.browser } },
    {
        files: ['*.config.{ts,js}', 'tests/**'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: { parserOptions: { parser: ts.parser, svelteConfig } },
    },
    prettier,
    svelte.configs.prettier,
);
