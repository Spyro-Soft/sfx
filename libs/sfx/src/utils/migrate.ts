import { execSync, spawn } from 'child_process';

import { Config } from '../config/config.js';
import { nxUpdateVersionQuestions } from '../constants/questions/update.js';
import { IFormOptionsUpdate } from '../interfaces/form-options.js';
import { PackageInstallationError } from '../types/error.js';
import { handleError } from './error.js';
import { runInquirerAndProcessAnswers } from './inquirer.js';
import { displayMessage } from './ui.js';

export function migrateNxToLatestSupportedBySfx(verbose = false): void {
  execSync(`nx migrate ${Config.maxNxVersion}`);
  runInquirerAndProcessAnswers(nxUpdateVersionQuestions, finishNxMigration, verbose);
}

// there is a chance that some dependencies will cause conflicts during the migration,
// we can't do anything that we are sure will not lead to any unexpected behaviors,
// so the end user has to fix them manually
export function finishNxMigration(answers: IFormOptionsUpdate, verbose = false): void {
  if (!answers.finishMigration) {
    process.exit();
  }
  const npmInstall = spawn('npm install', { shell: true });
  npmInstall.on('close', (code) => {
    if (code === 0) {
      execSync('nx migrate --run-migrations --if-exists');
      displayMessage([
        'Nx updated to the latest version supported by SFX',
        'You can delete the migrations.json file if it was created during the process',
      ]);
    } else {
      handleError(new PackageInstallationError());
    }
  });

  if (verbose) {
    npmInstall.stdout.on('data', (data) => {
      displayMessage(data.toString());
    });
  }
}
