# Spyrosoft ESlint Plugin

[Nx](https://nx.dev) plugin for setting up [ESlint](https://www.npmjs.com/package/eslint) & [Prettier](https://www.npmjs.com/package/prettier) in your monorepo.

# Table of Contents
- [Requirements](#requirements)
- [Usage](#usage)
- [ESlint rules](#eslint-rules)
- [Prettier rules](#prettier-rules)

# Requirements

This plugin can only be installed in an already existing `Nx` monorepo. `Nx` version `16.3.2` or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-eslint-plugin --save-dev
```
Then, run the `setup` generator:
```
nx g @spyrosoft/spyro-eslint-plugin:setup
```
A couple of questions will be prompted to you. Once you answer all of them, the plugin will setup our eslint config in your monorepo.

If you wish to run the generator without having to answer prompted question, you can provide all necessary information as a command line arguments:

- extend - extend your ESlint config with our rules, or overwrite it [`true` | `false`]

If `true`, it will simply add our config package to an already existing config, e.g.
```
{
  ...some other config,
  "extends": [...some other packages, "@spyrosoft/eslint-config-spyro"]
}
```

If `false`, it will replace the entire `.eslintrc.json` file content so that our config is the only source of rules:
```
{
  "extends": ["@spyrosoft/eslint-config-spyro"]
}
```

- appName - name of your project (optional)
- framework - framework used to create your project [`angular` | `react` | `next`] (optional)

The `appName` and `framework` parameters are used for overwriting files generated by `Nx` which are not compliant with our `ESlint` rules and not autofixable by linters. If you want to install this plugin in an already existing and modified workspace, it is not recommendend to use those arguments as your current work might be lost.

Example
```console
npx nx g @spyrosoft/spyro-eslint-plugin:setup --appName=spyro-app --framework=angular --extend=false
```

# ESlint rules
All ESlint rules are maintained in the form of `npm` package, you can find a full list [here](https://www.npmjs.com/package/@spyrosoft/eslint-config-spyro).

# Prettier rules
A full list of applied `prettier` rules:

| Rule              | Description                                           |
|-------------------|-------------------------------------------------------|
| printWidth        | line length that the printer will wrap on, set to 120 |
| semi              | print semicolons at the ends of statements            |
| singleQuote       | use single quotes instead of double quotes            |
| jsxSingleQuote    | use single quotes instead of double quotes in JSX     |
| trailingComma     | trailing commas where valid in ES5                    |
| useTabs           | false, indent lines with spaces instead of tabs       |
| tabWidth          | number of spaces per indentation-level, set to 2      |
| bracketSpacing    | print spaces between brackets in object literals      |
|                   |                                                       |