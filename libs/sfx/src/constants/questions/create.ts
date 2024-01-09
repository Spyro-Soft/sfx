import { DistinctQuestion } from 'inquirer';

import { Config } from '../../config/config.js';
import { IFormOptionsCreate } from '../../interfaces/form-options.js';
import { shouldSendError } from '../../utils/error.js';
import { validateName } from '../../utils/validators.js';
import { BUNDLERS, FRAMEWORKS, REPOSITORY_PLATFORMS } from '../form-choices.js';
import { FORM_OPTIONS_CREATE } from '../form-options.js';
import { QUESTION_TYPE } from '../question-type.js';
import { angularQuestions } from './angular.js';
import { nextjsQuestions } from './next.js';

export const appQuestionsCreate: DistinctQuestion<IFormOptionsCreate>[] = [
  {
    type: QUESTION_TYPE.input,
    name: FORM_OPTIONS_CREATE.monorepoName,
    message: 'Please provide name of your monorepo',
    default() {
      return 'spyro-fe-monorepo';
    },
    validate(val: string) {
      return validateName(val);
    },
    filter(val: string) {
      return val.toLowerCase();
    },
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_CREATE.framework,
    message: 'What framework would you like to use?',
    choices: Object.values(FRAMEWORKS).filter((val) => !Config.disabledFrameworks.includes(val)),
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_CREATE.bundler,
    message: 'Which bundler would you like to use to build the application?',
    choices: Object.values(BUNDLERS),
  },
  {
    type: QUESTION_TYPE.list,
    name: FORM_OPTIONS_CREATE.repositoryPlatforms,
    message: 'Which repository platform are you using?',
    choices: Object.values(REPOSITORY_PLATFORMS),
  },
  {
    type: QUESTION_TYPE.input,
    name: FORM_OPTIONS_CREATE.appName,
    message: 'Please provide name of your application',
    default() {
      return 'spyro-fe-app';
    },
    validate(val: string) {
      return validateName(val);
    },
    filter(val: string) {
      return val.toLowerCase();
    },
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_CREATE.errorMonitoringConsent,
    message: 'Do you agree to send data about potential errors to help us improve SFX CLI?',
    default: () => true,
    when: () => shouldSendError(null),
  },
  ...angularQuestions,
  ...nextjsQuestions,
];
