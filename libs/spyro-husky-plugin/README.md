# Spyrosoft Husky Plugin

[Nx](https://nx.dev) plugin for installing [Husky](https://www.npmjs.com/package/husky) in your monorepo, and setting up basic configuration for pre-commit hook, which will run linter and prettier on all staged files.

# Requirements

This plugin can only be installed in already existing Nx monorepo. Nx version 16.3.2 or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-husky-plugin--save-dev
```
Second, run the `setup` generator:
```console
npx nx g @spyrosoft/spyro-husky-plugin:setup
```