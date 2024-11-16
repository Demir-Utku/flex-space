/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: true,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'drizzle', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@stylistic/recommended-extends'
    // 'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'plugin:@eslint-react/recommended-type-checked-legacy' // <-- Requires type information
      ],
      plugins: ['react-refresh'],
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowExportNames: [
              'dynamic',
              'dynamicParams',
              'revalidate',
              'fetchCache',
              'runtime',
              'preferredRegion',
              'maxDuration',
              'config',
              'generateStaticParams',
              'metadata',
              'generateMetadata',
              'viewport',
              'generateViewport'
            ]
          }
        ]
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^.+\\.s?css$'],
              ['^\\u0000'],
              ['^node:'],
              ['^react'],
              ['^next'],
              ['^@?\\w'],
              ['@/(.*)'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$']
            ]
          }
        ]
      }
    }
  ],
  rules: {
    // 'prettier/prettier': 'error',

    // best-practices
    'complexity': ['error', 15],
    'eqeqeq': ['error', 'smart'],
    'no-alert': 'error',
    'no-useless-escape': 'error',
    'require-await': 'error',
    'no-return-assign': 'error',
    'no-use-before-define': ['error', { functions: false, classes: false }],

    'no-warning-comments': 'off',

    // TypeScript
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^ignored'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports'
      }
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ],

    // drizzle
    'drizzle/enforce-delete-with-where': [
      'error',
      {
        drizzleObjectName: ['db', 'ctx.db']
      }
    ],
    'drizzle/enforce-update-with-where': [
      'error',
      {
        drizzleObjectName: ['db', 'ctx.db']
      }
    ],

    // Stylistic
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/indent': ['error', 2],
    '@stylistic/indent-binary-ops': ['error', 2],
    '@stylistic/max-len': [
      'error',
      { code: 120, tabWidth: 2, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }
    ],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/multiline-ternary': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    '@stylistic/jsx-indent-props': ['error', 2],
    '@stylistic/jsx-newline': ['error', { prevent: false }],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // import
    // Disabled for simple-import-sort plugin
    'import/order': 'off',
    'sort-imports': 'off',
    'import/no-unresolved': 'warn',
    'import/no-absolute-path': 'error',
    'import/extensions': ['error', 'never', { css: 'always', json: 'always' }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // rect
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        map: [['@', './src']]
      }
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs', '.cts', '.mts']
  }
}

module.exports = config
