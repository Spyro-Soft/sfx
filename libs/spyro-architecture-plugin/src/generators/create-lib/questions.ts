import { DistinctQuestion } from 'inquirer';

export interface ICreateLibraries {
  libType: string;
  creationType: string;
  domainType: string;
  domainName: string;
  libName: string;
  appName: string;
}

export const createLibrariesQuestions = (domains: string[]): DistinctQuestion<ICreateLibraries>[] => {
  return [
    {
      type: 'list',
      name: 'creationType',
      message: 'Do you want to generate app or library?',
      choices: ['App', 'Library'],
    },
    {
      type: 'list',
      name: 'domainType',
      message: 'Would you like to generate shared or custom domain?.',
      choices: ['Shared', 'Custom', ...domains],
      when: (answers) => answers.creationType === 'Library',
    },
    {
      type: 'input',
      name: 'domainName',
      message: 'Please provide name of your new custom domain',
      when: (answers) => answers.creationType === 'Library' && answers.domainType === 'Custom',
    },
    {
      type: 'list',
      name: 'libType',
      message: 'Provide the library type',
      choices: ['Feature', 'UI', 'Data Access', 'Utils'],
      when: (answers) => answers.creationType === 'Library',
    },
    {
      type: 'input',
      name: 'libName',
      message: 'Provide the library name',
      when: (answers) => answers.creationType === 'Library',
    },
    {
      type: 'input',
      name: 'appName',
      message: 'Provide the app name',
      when: (answers) => answers.creationType === 'App',
    },
  ];
};
