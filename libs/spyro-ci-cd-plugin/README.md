# Spyrosoft PackageJSON Plugin

[Nx](https://nx.dev) plugin for setting up basic ci-cd pipelines config file in your monorepo.

# Requirements

This plugin can only be installed in already existing Nx monorepo. Nx version 16.3.2 or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-ci-cd-plugin--save-dev
```
Second, run the `setup` generator and provide a name of your application:
```console
npx nx g @spyrosoft/spyro-ci-cd-plugin:setup --appName=spyro-app
```