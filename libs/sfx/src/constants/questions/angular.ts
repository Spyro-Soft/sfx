import { DistinctQuestion } from 'inquirer';

import { IFormOptionsCreate } from '../../interfaces/form-options.js';
import { FRAMEWORKS } from '../form-choices.js';
import { FORM_OPTIONS_CREATE } from '../form-options.js';
import { QUESTION_TYPE } from '../question-type.js';

export const angularQuestions: DistinctQuestion<IFormOptionsCreate>[] = [
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_CREATE.routing,
    message: 'Do you want to include routing?',
    default: () => true,
    when: (answers) => answers.framework === FRAMEWORKS.angular,
  },
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_CREATE.standaloneComponents,
    message: 'Do you want to use standalone components?',
    default: () => false,
    when: (answers) => answers.framework === FRAMEWORKS.angular,
  },
];
