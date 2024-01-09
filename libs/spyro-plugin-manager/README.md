# Spyrosoft Plugin Manager

[Nx](https://nx.dev) plugin which purpose is to install and run all other plugins made by Spyrosoft. This includes: 
- [Spyrosoft ESlint Plugin](https://www.npmjs.com/package/@spyrosoft/spyro-eslint-plugin)
- [Spyrosoft Husky Plugin](https://www.npmjs.com/package/@spyrosoft/spyro-husky-plugin)
- [Spyrosoft Docker Plugin](https://www.npmjs.com/package/@spyrosoft/spyro-docker-plugin)
- [Spyrosoft PackageJSON Plugin](https://www.npmjs.com/package/@spyrosoft/spyro-packagejson-plugin)

# Requirements

This plugin can only be installed in already existing Nx monorepo. Nx version 16.3.2 or higher is required.

# Usage

First, install this plugin in your monorepo as a dev dependency:
```
npm i @spyrosoft/spyro-plugin-manager --save-dev
```
Second, run the `setup-all` generator and provide all necessary arguments:
- appName - name of your project
- framework - framework used to create your project [angular | react | next]
- extend - extend your ESlint config with our rules, or overwrite it [`true` | `false`]

Example:
```console
npx nx g @spyrosoft/spyro-plugin-manager:setup-all --appName=spyro-app --framework=angular --extend=false
```
