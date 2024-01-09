import { spawn } from 'child_process';

import { Config } from '../config/config.js';
import { UPDATE_ACTIONS } from '../constants/form-choices.js';
import { NX_VALIDITY } from '../constants/nx-validity.js';
import { IFormOptionsUpdate } from '../interfaces/form-options.js';
import { UpdateLibrariesError } from '../types/error.js';
import { handleError } from '../utils/error.js';
import { migrateNxToLatestSupportedBySfx } from '../utils/migrate.js';
import { displayMessage } from '../utils/ui.js';
import { verifyNxVersion } from '../utils/workspace.js';

export function processAppQuestionareUpdate(answers: IFormOptionsUpdate, verbose: boolean) {
  const nxValidity = verifyNxVersion();
  switch (nxValidity) {
    case NX_VALIDITY.Higher:
    case NX_VALIDITY.Lower: {
      if (!answers.updateNx) {
        displayMessage(['We are unable to proceed with your current Nx version']);
        process.exit();
      }
      migrateNxToLatestSupportedBySfx(verbose);
      break;
    }
    case NX_VALIDITY.Valid: {
      processUpdateAction(answers);
      break;
    }
  }
}

function processUpdateAction(answers: IFormOptionsUpdate, verbose = false): void {
  switch (answers.action) {
    case UPDATE_ACTIONS.migrateNx: {
      migrateNxToLatestSupportedBySfx(verbose);
      break;
    }
    case UPDATE_ACTIONS.updateConfig: {
      updateAdditionalLibraries(answers, verbose);
      break;
    }
  }
}

function updateAdditionalLibraries(answers: IFormOptionsUpdate, verbose = false): void {
  const commands = [
    'npm i @spyrosoft/spyro-plugin-manager@latest --save-dev --save-exact',
    'npm update @spyrosoft/spyro-plugin-manager',
    'npm update @spyrosoft/spyro-husky-plugin',
    'npm update @spyrosoft/spyro-docker-plugin',
    'npm update @spyrosoft/spyro-eslint-plugin',
    'npm update @spyrosoft/spyro-packagejson-plugin',
    'npm update @spyrosoft/spyro-ci-cd-plugin',
    `npx nx g @spyrosoft/spyro-plugin-manager:update 
      --appName=${answers.appName} 
      --framework=${answers.framework} 
      --extendEslint=${answers.extendEslint} 
      --overwriteDocker=${answers.overwriteDocker} 
      --overwriteScripts=${answers.overwriteScripts} 
      --updateHusky=${answers.updateHusky} 
      --ciCd=${answers.repositoryPlatforms}`,
  ];
  const toExecute = commands.reduce((a, b) => a + ' && ' + b);

  const command = spawn(toExecute, { shell: true });

  command.on('close', (code) => {
    if (code === 0) {
      displayMessage(['Your Nx workspace is now updated!', `Thank you for using ${Config.cliName}!`]);
      process.exit();
    }
    handleError(new UpdateLibrariesError());
  });

  command.stderr.on('data', (error) => {
    handleError(new UpdateLibrariesError(error.toString()));
  });

  if (verbose) {
    command.stdout.on('data', (data) => {
      displayMessage(data.toString());
    });
  }
}
