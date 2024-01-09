# Spyrosoft ESlint Config
A set of rules selected by Spyrosoft's engineers as a company standard for frontend projects.

# Table of Contents
- [Installation](#installation)
- [List of rules](#list-of-rules)
  - [General rules](#general-rules)
  - [Tests rules](#tests-rules)
  - [Naming convention](#naming-convention)
    - [File naming convention](#file-naming-convention)
  - [Member declaration order](#member-declaration-order)
    - [Access modifier order](#access-modifier-order)
    - [Member type order](#member-type-order)
  - [Additonal rules](#additonal-rules)

# Installation

In order to use this set of rules in your project, install this package as a dev dependency:
```
npm i --save-dev @spyrosoft/eslint-config-spyro
```
Then, set it in your `.eslintrc.json` file:
```json
{
  "extends": ["@spyrosoft/eslint-config-spyro"]
}
```
And that's all, your ESlint rules are now set and ready to go.

# List of rules
## General rules
- [ESlint recommended](https://eslint.org/docs/latest/rules/)
- [Typescript-eslint recommended](https://typescript-eslint.io/rules/?supported-rules=recommended&extension-rules=recommended)
- [Unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)
- [React](https://www.npmjs.com/package/eslint-plugin-react#list-of-supported-rules)
- [React Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)

## Tests rules
[Jest recommended](https://www.npmjs.com/package/eslint-plugin-jest#rules), extended by:

| Rule                            | Description                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------|
| jest/consistent-test-it         | forces all top-level tests to use `test` and all tests nested within `describe` to use `it` |
| jest/max-nested-describe        | enforces a maximum depth to nested `describe()` calls to `3`                                |
| jest/no-alias-methods           | disallow alias methods                                                                      |
| jest/no-duplicate-hooks         | disallow duplicate setup and teardown hooks                                                 |
| jest/no-hooks                   | allow only `afterAll` and `beforeEach` hooks                                                |
| jest/no-if                      | disallow conditional logic                                                                  |
| jest/no-test-return-statement   | disallow explicitly returning from tests                                                    |
| jest/require-top-level-describe | require test cases and hooks to be inside a `describe` block                                |
| jest/expect-expect              | ensure that there is at least one `expect` call made in a test                              |

## Naming convention
- interfaces - `PascalCase`, starting with `I`
- type aliases - `PascalCase`, starting with `T`
- variables - `CamelCase`, `PascalCase` or `UPPER_CASE`, consecutive capitals are not allowed
- enums - `UPPER_CASE`

No trailing or leading underscores allowed in any of the above.

### File naming convention
All file names should be in `kebab-case`.

## Member declaration order

### Access modifier order

1. `public`
2. `protected`
3. `private`


### Member type order
1. `static field`
2. `instance field`
3. `static method`
4. `constructor`
5. `instance method`


## Additonal rules
| Rule                                      | Description                                                                                          |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|
| @typescript-eslint/member-delimiter-style | each member should be delimited with a semicolon                                                     |
| no-else-return                            | disallow `else` blocks after `return` statements in `if` statements                                  |
| unicorn/new-for-builtins                  | enforce the use of new for all builtins, except `String`, `Number`, `Boolean`, `Symbol` and `BigInt` |
| unicorn/prefer-switch                     | prefer switch over multiple else-if                                                                  |
| react/jsx-no-useless-fragment             | disallow unnecessary fragments                                                                       |
| react-hooks/exhaustive-deps               | validate dependencies of custom Hooks                                   