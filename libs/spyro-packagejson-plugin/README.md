# Spyrosoft PackageJSON Plugin

[Nx](https://nx.dev) plugin for setting up multiple scripts for running, building and linting a project in your monorepo.

# Requirements

This plugin can only be installed in already existing Nx monorepo. Nx version 16.3.2 or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-packagejson-plugin--save-dev
```
Second, run the `setup` generator and provide a name of your application:
```console
npx nx g @spyrosoft/spyro-packagejson-plugin:setup --appName=spyro-app
```