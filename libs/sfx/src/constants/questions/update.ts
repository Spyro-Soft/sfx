import { DistinctQuestion } from 'inquirer';

import { Config } from '../../config/config.js';
import { IFormOptionsUpdate } from '../../interfaces/form-options.js';
import { verifyNxVersion } from '../../utils/workspace.js';
import { FRAMEWORKS, REPOSITORY_PLATFORMS, UPDATE_ACTIONS } from '../form-choices.js';
import { FORM_OPTIONS_UPDATE } from '../form-options.js';
import { NX_VALIDITY } from '../nx-validity.js';
import { QUESTION_TYPE } from '../question-type.js';

export const appQuestionsUpdate: DistinctQuestion<IFormOptionsUpdate>[] = [
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.updateNx,
    message: `Your current Nx version is not supported by SFX. Would you like to update it now?`,
    default: () => true,
    when: () => verifyNxVersion() === NX_VALIDITY.Lower || verifyNxVersion() === NX_VALIDITY.Higher,
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_UPDATE.action,
    message: `What would you like to do:`,
    when: () => verifyNxVersion() === NX_VALIDITY.Valid,
    choices: Object.values(UPDATE_ACTIONS),
  },
  {
    type: QUESTION_TYPE.input,
    name: FORM_OPTIONS_UPDATE.appName,
    message: `What is your main app name?`,
    when: (answers) => verifyNxVersion() === NX_VALIDITY.Valid && answers.action === UPDATE_ACTIONS.updateConfig,
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_UPDATE.framework,
    message: `Which framework is used in your main app?`,
    when: (answers) => verifyNxVersion() === NX_VALIDITY.Valid && answers.action === UPDATE_ACTIONS.updateConfig,
    choices: Object.values(FRAMEWORKS).filter((val) => !Config.disabledFrameworks.includes(val)),
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.overwriteDocker,
    message: `Do you wish to update our Docker config (any changes you made to the Docker files will be lost)?`,
    default: () => true,
    when: (answers) => answers.action === UPDATE_ACTIONS.updateConfig,
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.extendEslint,
    message: `Do you wish to add our ESlint rules to yours without modifying them (Y), or replace them entirely (N)?`,
    default: () => false,
    when: (answers) => answers.action === UPDATE_ACTIONS.updateConfig,
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.overwriteScripts,
    message: `Do you wish to update your package.json scripts?`,
    default: () => true,
    when: (answers) => answers.action === UPDATE_ACTIONS.updateConfig,
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.updateHusky,
    message: `Do you wish to update your Husky config?`,
    default: () => true,
    when: (answers) => answers.action === UPDATE_ACTIONS.updateConfig,
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.changeRepository,
    message: 'Do you wish to change your repository platform?',
    default: () => false,
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_UPDATE.repositoryPlatforms,
    message: 'Which repository platform are you using?',
    choices: Object.values(REPOSITORY_PLATFORMS),
    when: (answers) => answers.changeRepository,
  },
];

export const nxUpdateVersionQuestions: DistinctQuestion<IFormOptionsUpdate>[] = [
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_UPDATE.finishMigration,
    message: `First stage is complete. Now, please review the changes in the 'package.json' file and 'migrations.json' (if it exists). Correct them if necessary.\n 
If everything looks good, you can continue by answering 'Yes' to this question.\n
If not, you can always finish this proces manually, by running\n 
'nx migrate --run-migrations --if-exists'`,
    default: () => true,
  },
];
