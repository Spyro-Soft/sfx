# Spyrosoft Frontend Extensions
This is a repository containig SFX CLI and all plugins and packages required to run it.

Everything you find here is published to npm registry, which is considered as our production environment

You can differentiate 3 types of packages here:
- SFX, which is a CLI written in vanilla JavaScript, using Nx's `create-nx-workspace` as a base.
- Nx plugins, where every plugin's role is to provide a specific configuration to created workspace. The SFX only installs our `spyro-plugin-manager`, which role is to install and run all the other plugins. This is important, as each new plugin has to be set in the manager plugin in order for SFX to use it.
- Separate packages, like `eslint-config-spyro` which does not need Nx.

You can see our [Demo project](https://github.com/Spyro-Soft/sfx-demo-ecommerce) created entirely with usage of this CLI.

# Table of contents
- [Prerequisites](#prerequisites)
- [Folder structure](#folder-structure)
- [Working with plugins](#working-with-plugins)
- [Testing new features locally](#testing-new-features-locally)
  - [Testing CLI](#testing-cli)
  - [Testing plugins](#testing-plugins)
- [Releasing to production](#releasing-to-production)
- [Known issues](#known-issues)
  - [SFX runs indefinetely during the project setup](#sfx-runs-indefinetely-during-the-project-setup)
  - [SFX creates a new project and finishes, but does not display the success message](#sfx-creates-a-new-project-and-finishes-but-does-not-display-the-success-message)
  - [SFX crashes and displays an error related to husky or git](#sfx-crashes-and-displays-an-error-related-to-husky-or-git)
  - [Some scripts crash or doesn't even run at all](#some-scripts-crash-or-doesnt-even-run-at-all)


# Prerequisites

- Node version: `16.16.0` or higher
# Folder structure
There are three main folders that require your attention:
- `/libs` - this is where CLI and all plugins with additional config are placed. Nx should create new plugins here by default. If that's not the case, move it here.
- `/tools` - this is where a package with eslint config is placed.
- `/dist` - this is a folder where all builds are beeing generated by default. If you wish to publish a new version to npm, you should do so from this driectory.

# Working with plugins
For a detailed guide on how to work with Nx plugins go [here](https://git.spyrosoft.it/spyro_frontend_extensions/spyro_fe_cli/-/wikis/Working-with-NX-Plugin).

# Testing new features locally
## Testing CLI
To test CLI locally, first run:
```
nx run sfx:build
```
then go to `dist/libs/sfx`, and run:
```
npm i && npm i -g .
```
This will install the local version of CLI as a global npm package. You can now run it anywhere you want with this command:
```
sfx create
```
## Testing plugins
Testing plugins is a bit more sophisticated, as all of them are taken directly from npm with each CLI operation. In order to mitigate that issue, [verdaccio](https://verdaccio.org/) config was added to this repository. It's main functionality is to create a proxy npm registry, which for as long as it runs, will store locally all new version of npm packages instead of making them public.

So, whenever you modify an already existing plugin or create a new one and you wish to test it first, run:
```
nx local-registry
```
This will start the verdaccio and all new publishes will be intercepted by it.
Now you can publish new versions of plugins freely following our previous guide about working with plugins, or you can run:
```
nx run <plugin_name>:publish-local
```

You can also publish all packages at the same time
```
nx run-many --targets=publish-local
```

Remember that verdaccio works almost exactly like npm, which means that you have to bump the package.json version before publishing. Our script will do that for you, but you have to manually restore the previous version when you're done testing.

# Releasing to production

> **_IMPORTANT:_** Our repository has now a `semantic-release` set up in a Gtihub actions. This means that every merge to the `main` branch will call an automatic release to `npm`, which also involves an automatic version bump for CLI and every plugin. A new version will be calculated based on the last tag vith version pushed by the pipeline if the job succeeded, which means that **manual releases, or tag creations might break the entire process**. Therefore, refrain from performing any of those actions unless absolutely necessary. 

Since the npm registry is our prod here, releasing to production means pushing new version to npm. In order to push anything, you need access to the [@spyrosoft](https://www.npmjs.com/org/spyrosoft) organization on npm. 

In order to publish a plugin, simply run:
```
nx run <plugin_name>:publish
```
In order to publish a CLI or standalone package, go to `tools/<package_name>`, and run
```
npm publish
```


If you ever make a mistake and release a wrong or malfunctioning version, try to run 
```
npm unpublish <package_name>@<version>
```
According to npm unpublish policy, there are various conditions that might prevent unpublishing it in that way. In that case, revert your changes, publish the reverted state as a new version, and deprecate the wrong version by running:
```
npm deprecate <package_name>@<version> "<message>"
```

# Known issues
## SFX runs indefinetely during the project setup
If SFX does not go past the project setup stage, which is very important to differentiate from the additional config setup, check if the problem exists for all frameworks. Nx sometimes changes the required questions for a specific framework, and since we use a wrapper over the `create-nx-workspace` tool instead of displaying all the question it asks directly, when one or more is missing, the tool will run indefinetely waiting for an answer. If that happens, check with the official [documentation](https://nx.dev/packages/nx/documents/create-nx-workspace) what is missing.

## SFX creates a new project and finishes, but does not display the success message
This seems like macOS exclusive problem - when you create a project, delete it, and try to create a project again, sometimes the project itself will be generated, but the additional config setup might fail. This is due to a weird Nx daemon problem, which might appear as still busy with other process after creating a project, so when you try to run any nx plugin generator it will restart the daemon, but also throw an error and stop working so you have to run it again manually.

There is no permanent solution we are aware of right now, so the only option is to generate the project again. It normally always works on the 2nd try, so if it still fails, the problem is most likely somewhere else.

## SFX crashes and displays an error related to husky or git
Check where did you try to run the SFX. It should always be done in a "clean" directory, which is not occupied by another project, and does not have git initialized inside. For example, running it anywhere inside this repository almost guarantees that something will go wrong.

## Some scripts crash or doesn't even run at all
Some commands inside our scripts might require root privilages to work, but might also not give a proper error message. If any script ever crashes for you, try to run it again with `sudo`.
