# Spyrosoft Frontend Extensions

A command line tool for creating new projects with integrated monorepos, using Spyrosoft's best practices and guidelines. Based on [Nx](#working-with-nx).

# Table of Contents

- [Requirements](#requirements)
- [Creating new project](#creating-new-project)
  - [Available options](#available-options)
  - [Supported frameworks](#supported-frameworks)
  - [Framework-specific options](#framework-specific-options)
    - [Angular](#angular)
  - [Final step](#final-step)
- [Updating existing workspace](#updating-existing-workspace)
  - [Updating Nx version](#updating-nx-version)
  - [Updating additional config](#updating-additional-config)
- [Additional configuration](#additional-configuration)
  - [ESlint \& Prettier](#eslint--prettier)
  - [Husky](#husky)
  - [Docker](#docker)
  - [Scripts](#scripts)
  - [Ci-Cd](#cicd)
- [Naming convention](#naming-convention)
  - [File naming convention](#file-naming-convention)
  - [Commit naming convention](#commit-naming-convention)
- [Testing](#testing)
  - [Unit tests](#unit-tests)
  - [E2E tests](#e2e-tests)
- [Updating dependencies](#updating-dependencies)
- [Working with Nx](#working-with-nx)
  - [Features](#features)
    - [Monorepo Approach](#monorepo-approach)
    - [Code Generation](#code-generation)
    - [Dependency Graph](#dependency-graph)
    - [Advanced Testing](#advanced-testing)
    - [Extensibility](#extensibility)
  - [Workspace structure](#workspace-structure)
    - [Mental model](#mental-model)
    - [Misconception](#misconception)
  - [Development workflow](#development-workflow)
  - [Tags](#tags)
  - [Additional Resources](#additional-resources)

# Requirements
In order to work properly, `Node.js` in version `16.16.0` or higher, and `git`  are required.

# Creating new project
To setup a new project, open a command line in your desired directory, and run:

```
npx @spyrosoft/sfx create
```

## Available options
Multiple questions will be asked during the setup, allowing you to choose:
- Name of your monorepo
- Framework
- Bundler - we currently support `vite` and `webpack`
- Name of your application

## Supported frameworks
`SFX` currently offers 2 frameworks to choose from: `Angular` and `React`. We are working on adding `Next.js` to the list, and it will be available soon. More frameworks will be added in the future.

## Framework-specific options
Some frameworks might have more options available during the project setup:

### Angular
- Include routing
- Use standalone components

## Final step
After answering all of the questions, all you have to do is wait. `SFX` will now make a new monorepo, create a project using chosen framework, install dependencies and perform all necessary configurations. When it's done, your new project is ready and you can start developing it!

# Updating existing workspace

SFX offers functionalities for alredy existing workspaces. The workspace should be a valid Nx monorepo containing a `package.json` and `nx.json` files at the bare minimum.

In order to start the process of updating your workspace, simply run:
```
npx @spyrosoft/sfx update
```

## Updating Nx version
We already described how to update the Nx version and the dependencies in your workspace [here](#updating-dependencies). But now the SFX can do that for you! First, you will have to choose the 'Update Nx' option that will show up when you start the SFX. It will start the migration process. After a while, you will be asked to review the changes in the `migrations.json` and `package.json` files. If everything looks good, simply confirm that you are ready in the displayed prompt and the SFX will finish the process.

But there are two things you have to keep in mind:
- the `migrations.json` file is only generated when some breaking changes have to be made. Don't worry if it does not appear
- in some cases, one or more dependency conflicts might occur in the last step. If that happens, there is nothing SFX can do and you will have to fix them manually. When you're done, you can either restart the SFX or simply run:
```
nx migrate --if-exists --run-migrations
```

## Updating additional config
If you wish to update the [additional config](#additional-configuration) offered by SFX, or add it to your workspace if you never had it installed, choose the update config option prompted by SFX.

It will ask you to choose which parts you wish to keep untouched, and which should be updated. We highly recommend to leave all the default options if you never had it installed in your workspace.

After that, it will install the newest versions of all our plugins, and perform the setup based on your choices.

# Additional configuration
`SFX` offers out-of-the-box configuration of various functionalities, helpful in project development and maintenance, also available in the form of `Nx` plugins, and uploaded to `npm` as seperate packages.

## ESlint & Prettier
A comprehensive set of `ESlint` rules, carefully selected by our most experienced developers. Complemented by a one of the most popular `Prettier` configs. You can find the full list of rules on our [ESlint plugin page](https://www.npmjs.com/package/@spyrosoft/spyro-eslint-plugin).

## Husky
Used to setup `git hooks`:
- `pre-push` - unit tests and linters are required to pass
- `pre-commit` - conventional commit naming convention for commit message is required

More information is available on our [Husky plugin page](https://www.npmjs.com/package/@spyrosoft/spyro-husky-plugin).

## Docker
A full configuration required for dockerizing your application. In order to use it, run the `docker:build` script in the root folder of your monorepo:

```
npm run docker:build
```

More information is available on our [Docker plugin page](https://www.npmjs.com/package/@spyrosoft/spyro-docker-plugin).

## Scripts
Multiple scripts for running, building, linting and testing your application:
- `npm run start` - start application in dev mode
- `npm run build:dev` / `npm run build:prod` - build development / production version
- `npm run test:unit` - run unit tests
- `npm run test:e2e` - run e2e tests
- `npm run test` - run both unit and e2e test
- `npm run lint:check` / `npm run lint:fix` - run eslint
- `npm run format:check` / `npm run format:fix` - run prettier
- `npm run code:check` / `npm run code:fix` - run both eslint and prettier

More information is available on our [scripts plugin page](https://www.npmjs.com/package/@spyrosoft/spyro-packagejson-plugin).

## Ci-Cd
Config file for ci-cd pipelines for specific repository providers:
- GitHub
- GitLab
- Azure
- Bitbucket

More information is available on our [ci-cd plugin page](https://www.npmjs.com/package/@spyrosoft/spyro-ci-cd-plugin).

# Naming convention
- interfaces - `PascalCase`, starting with `I`
- type aliases - `PascalCase`, starting with `T`
- variables - `CamelCase`, `PascalCase` or `UPPER_CASE`, consecutive capitals are not allowed
- enums - `UPPER_CASE`

No trailing or leading underscores allowed in any of the above.

## File naming convention
All file names should be in `kebab-case`.

## Commit naming convention
Conventional commits convention is used as commits naming convention. Visit the [conventional commits page](https://www.conventionalcommits.org) to learn more.

# Testing
SFX creates basic setup, and provides examples for 2 types of tests in your project: `unit` tests and `e2e` tests.

## Unit tests
`Jest` is used as a test engine. Use `npm run test:unit` to run unit tests for your application.

## E2E tests
`Cypress` is used as a test engine. Use `npm run test:e2e` to run e2e tests.

# Updating dependencies
Since the project generated by `SFX` uses `Nx`, it is recommended to not update any dependencies manually, but to use the system built into `Nx` instead. In order to do that, first run this command:
```
nx migrate latest
```
This will check your dependencies against their latest(supported by `Nx`) versions, and start updating them. You can also migrate to a specific version by replacing `latest` with `nx@version`.

After the first step, provided that any updates are possible, `package.json` dependencies versions will be updated, and `migrations.json` file recording all changes will be generated. Make sure `package.json` changes make sense and then run: 
```
npm install
```

The final step is to run:
```
nx migrate --if-exists --run-migrations
```
After that, your dependencies should be updated. You can now delete the `migrations.json` file.

For more information, check the [official Nx documentation](https://nx.dev/core-features/automate-updating-dependencies).

# Working with Nx
`Nx` is a powerful open-source development toolset that helps you build high-quality monorepo projects with Angular, React, Next.js, and other modern frameworks. It provides an extensible set of libraries, commands, and architectural guidelines to enhance productivity, scalability, and maintainability in your development workflow.

## Features
### Monorepo Approach
`Nx` promotes a monorepo architecture, where multiple related projects are organized within a single repository. This approach allows you to share code, enforce consistency, and manage dependencies efficiently.

### Code Generation
With `Nx`, you can leverage schematics to generate consistent and reusable code. Schematics are reusable templates that help you scaffold components, modules, services, and more, reducing manual effort and enforcing best practices.

### Dependency Graph
`Nx` utilizes a dependency graph to analyze and optimize your project's build and test operations. It intelligently determines the affected projects based on code changes, allowing you to build and test only what is necessary, significantly reducing build times.

### Advanced Testing
`Nx` provides built-in support for unit testing, end-to-end testing, and component testing.

### Extensibility
`Nx` is highly extensible, allowing you to integrate custom tooling, create plugins, and extend existing functionality to suit your specific project requirements.

## Workspace structure
A typical `Nx` workspace is structured into "apps" and "libs". This distinction allows us to have a more modular architecture by following a separation of concerns methodology, incentivizing the organization of our source code and logic into smaller, more focused and highly cohesive units.

### Mental model
A common mental model is to see the application as "containers" that link, bundle and compile functionality implemented in libraries for being deployed. As such, if we follow a 80/20 approach:

- place 80% of your logic into the `libs/` folder
- and 20% into `apps/`
  
Note, these libraries don’t necessarily need to be built separately, but are rather consumed and built by the application itself directly. Hence, nothing changes from a pure deployment point of view.

### Misconception
Developers new to `Nx` are initially often hesitant to move their logic into libraries, because they assume it implies that those libraries need to be general purpose and shareable across applications.

This is a common misconception, moving code into libraries can be done from a pure code organization perspective.

For more information, check the [official documentation](https://nx.dev/more-concepts/applications-and-libraries).
## Development workflow
`Nx` offers multiple tools to manage and optimize the development workflow:
- To run a specific project
```
nx <project_name> serve
```
- To build a specific project:
```
nx <project_name> build
```
- To generate a new project(with `Angular` in that case)
```
nx g @nx/angular:application <project_name>
```
- To generate a new library
```
nx g @nx/angular:library <library_name>
```
- To generate a new component
```
nx g @schematics/angular:component <component_name> --project=<project_name>
```
- To run dependency graph
```
nx graph
```

## Tags
If you partition your code into well-defined cohesive units, even a small organization will end up with a dozen apps and dozens or hundreds of libs. If all of them can depend on each other freely, chaos will ensue, and the workspace will become unmanageable.

To help with that Nx uses code analysis to make sure projects can only depend on each other's well-defined public API. It also allows you to declaratively impose constraints on how projects can depend on each other.

You can find everything you need to know about it [here](https://nx.dev/core-features/enforce-project-boundaries).

## Additional Resources
Here are some additional resources to help you understand and work with `Nx`:

- [Nx Documentation](https://nx.dev/)
- [Nx GitHub Repository](https://github.com/nrwl/nx)
- [Nx Examples](https://nx.dev/recipes)