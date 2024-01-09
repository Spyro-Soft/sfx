# Spyrosoft Husky Plugin

[Nx](https://nx.dev) plugin for setting up [Docker](https://www.docker.com/) in your monorepo.

# Requirements

This plugin can only be installed in already existing Nx monorepo. Nx version 16.3.2 or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-docker-plugin--save-dev
```
Second, run the `setup` generator and choose the framework used in your project [angular | react]:
```console
npx nx g @spyrosoft/spyro-docker-plugin:setup
```