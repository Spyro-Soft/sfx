import { DistinctQuestion } from 'inquirer';

import { IFormOptionsCreate } from '../../interfaces/form-options.js';
import { FRAMEWORKS } from '../form-choices.js';
import { FORM_OPTIONS_CREATE } from '../form-options.js';
import { QUESTION_TYPE } from '../question-type.js';

export const nextjsQuestions: DistinctQuestion<IFormOptionsCreate>[] = [
  {
    type: QUESTION_TYPE.confirm,
    name: FORM_OPTIONS_CREATE.nextjsRouting,
    default: () => true,
    when: (answers) => answers.framework === FRAMEWORKS.nextJs,
    message: 'Enable the App Router for Next.js',
  },
];
