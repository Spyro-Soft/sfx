import { DistinctQuestion } from 'inquirer';

import { GROUPING_TYPE } from './schema';

export interface IGroupLibraries {
  groupType: string;
  groupLocationChoice: boolean;
  groupFolderPath: string;
  selectedLibraries: {
    name: string;
    checked: boolean;
  }[];
}

export const groupingLibrariesQuestion = (libraries: string[]): DistinctQuestion<IGroupLibraries>[] => {
  return [
    {
      type: 'list',
      name: 'groupType',
      message: 'How would you like to group your libraries?',
      choices: ['By library type (feature, utils, ui etc.)', 'With custom grouping folder'],
    },
    // DISABLED FOR NOW
    // {
    //   type: 'confirm',
    //   name: 'groupLocationChoice',
    //   message: 'Do you wish to group libraries under a specific location? The default location is "libs/".',
    //   default: false,
    //   when: (answers) => answers.groupType === GROUPING_TYPE.libType,
    // },
    // {
    //   type: 'input',
    //   name: 'groupFolderPath',
    //   message: 'Insert a path to your grouping folder, e.g. "libs/my-grouped-libraries"',
    //   when: (answers) => answers.groupType === GROUPING_TYPE.custom || answers.groupLocationChoice,
    // },
    {
      type: 'checkbox',
      name: 'selectedLibraries',
      message: 'Select all libraries you wish to group together',
      when: (answers) => answers.groupType === GROUPING_TYPE.custom,
      choices: libraries,
    },
  ];
};
