import pluginJs from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: eslintImport,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/await-thenable': 0,
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/extensions': [
        'off',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-filename-extension': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      'react/display-name': 'off',
      'react-refresh/only-export-components': 'off',
      'jest/no-disabled-tests': 'off',
      'no-console': ['warn', { allow: ['error'] }],
      'import/no-unresolved': [
        0,
        {
          caseSensitive: false,
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-case-declarations': 0,
      'react/no-children-prop': 0,
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/helpers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/hooks',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/layout/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/routes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/schemas/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/types/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.scss',
              group: 'index',
              position: 'after',
            },
            {
              pattern: '**/*.scss',
              group: 'index',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          warnOnUnassignedImports: true, // SCSS yanlış yerdeyse uyarı verir
          distinctGroup: true, // SCSS için ayrı grup ayırır
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'const', next: 'export' },
        { blankLine: 'always', prev: 'import', next: 'const' },
      ],
      'react/jsx-tag-spacing': [
        'error',
        {
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'react/jsx-no-useless-fragment': 'error', // Gereksiz Fragment'leri engeller
    },
  },
];
