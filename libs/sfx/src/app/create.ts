import { exec, spawn } from 'child_process';
import { createWorkspace } from 'create-nx-workspace';

import { Config } from '../config/config.js';
import { COMPONENT_STYLE } from '../constants/component-style.js';
import { FRAMEWORKS } from '../constants/form-choices.js';
import {
  IBaseOptions,
  ICreateAngularWorkspace,
  ICreateNextWorkspace,
  TCreateNxWorkspaceFrameworkOptions,
  TCreateNxWorkspaceOptions,
  TCreateReactWorkspace,
} from '../interfaces/create-workspace.js';
import { IFormOptionsCreate } from '../interfaces/form-options.js';
import { GitExistsInstallationError, InstallationError } from '../types/error.js';
import { handleError, updateSendErrorConsent } from '../utils/error.js';
import { displayMessage } from '../utils/ui.js';
import { commitAllChanges } from '../utils/workspace.js';

export async function processAppQuestionareCreate(answers: IFormOptionsCreate, verbose: boolean): Promise<void> {
  if (answers.errorMonitoringConsent !== undefined) {
    updateSendErrorConsent(answers.errorMonitoringConsent);
  }
  const baseOptions: IBaseOptions = {
    nxName: answers.monorepoName,
    framework: answers.framework,
    appName: answers.appName,
  };

  const nxTemplateName = getNxTemplateNameForFramework(answers.framework);
  const createWorkspaceOptions = getCreateWorkspaceOptions(answers);
  await createWorkspace(nxTemplateName, createWorkspaceOptions).catch((err) => {
    handleError(err);
  });
  displayMessage('Project set up, installing additional libraries...');
  completeInstallation(baseOptions, answers, verbose);
}

function getCreateWorkspaceOptions(answers: IFormOptionsCreate): TCreateNxWorkspaceOptions {
  const frameworkOptions = getOptionsForFramework(answers);
  return {
    name: answers.monorepoName,
    packageManager: 'npm',
    cliName: 'sfx',
    nxCloud: false,
    appName: answers.appName,
    bundler: answers.bundler,
    commit: {
      name: 'sfx',
      email: 'sfx',
      message: 'innitial commit',
    },
    ...frameworkOptions,
  };
}

function getOptionsForFramework(answers: IFormOptionsCreate): TCreateNxWorkspaceFrameworkOptions {
  switch (answers.framework) {
    case FRAMEWORKS.nextJs: {
      const frameworkSpecificOptions: ICreateNextWorkspace = {
        style: COMPONENT_STYLE.styledComponents,
        nextAppDir: answers.nextjsRouting,
      };
      return frameworkSpecificOptions;
    }
    case FRAMEWORKS.angular: {
      const frameworkSpecificOptions: ICreateAngularWorkspace = {
        style: COMPONENT_STYLE.scss,
        routing: answers.routing,
        standaloneApi: answers.standaloneComponents,
      };
      return frameworkSpecificOptions;
    }
    case FRAMEWORKS.react: {
      const frameworkSpecificOptions: TCreateReactWorkspace = {
        style: COMPONENT_STYLE.styledComponents,
      };
      return frameworkSpecificOptions;
    }
  }
}

function getNxTemplateNameForFramework(framework: string): string {
  return framework === FRAMEWORKS.nextJs ? framework : `${framework}-monorepo`;
}

function completeInstallation(baseOptions: IBaseOptions, answers: IFormOptionsCreate, verbose = false): void {
  const catalog = `${process.cwd()}/${baseOptions.nxName}`;

  process.chdir(catalog);
  installAdditionalLibraries(baseOptions, answers, verbose);
}

function installAdditionalLibraries(baseOptions: IBaseOptions, answers: IFormOptionsCreate, verbose = false): void {
  displayMessage(['Setting up additional config...']);

  const commands = [
    'npm i @spyrosoft/spyro-plugin-manager --save-dev --save-exact',
    `npx nx g @spyrosoft/spyro-plugin-manager:setup-all --appName=${baseOptions.appName} --framework=${baseOptions.framework} --ciCd=${answers.repositoryPlatforms} --extend=false --interactive=false`,
  ];
  const toExecute = commands.reduce((a, b) => a + ' && ' + b);
  const command = spawn(toExecute, { shell: true, stdio: 'inherit' });
  command.on('close', (code) => {
    console.log(code)
    if (code === 0) {
      // commitAllChanges();
      displayMessage(['Your application is ready for development', `Thank you for using ${Config.cliName}!`]);
      if (process.platform === 'win32') {
        process.exit();
      }
    }
    // handleError(new InstallationError());
  });
  command.stderr.on('data', (error) => {
    console.log(error.toString());
    if (error.includes(`.git can't be found `)) {
      handleError(new GitExistsInstallationError());
    }
  });
  if (verbose) {
    command.stdout.on('data', (data) => {
      displayMessage(data.toString());
    });
  }
}
