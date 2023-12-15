module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    "react/self-closing-comp": [
      "error", {
        "component": true,
        "html": true
      }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
      }
    ],
    "react-hooks/exhaustive-deps": "error",
    "react/prefer-stateless-function": "error",
    "react/button-has-type": "error",
    "react/no-unused-prop-types": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-no-script-url": "error",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/jsx-fragments": "error",
    "react/destructuring-assignment": [
      "error",
      "always",
      { destructureInSignature: "always" },
    ],
    "react/jsx-max-depth": ["error", { max: 5 }],
    "react/function-component-definition": [
      "warn",
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/no-deprecated': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-render-return-value': 2,
    'react/no-string-refs': 2,
    'react/no-unescaped-entities': 2,
    'react/no-unknown-property': 2,
    'react/no-unsafe': 0,
    'react/prop-types': 2,
    'react/require-render-return': 2,
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/no-typos": "warn",
    "react/display-name": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prefer-read-only-props": "error",
    "semi": "warn"
  },
}
