import { formatFiles, getProjects, ProjectConfiguration, Tree, updateJson } from '@nx/devkit';
import { execSync } from 'child_process';

import { TYPE_TAGS } from '../../tags-config';
import { kebabCase } from './helpers/parse-string.helper';
import { mapEslintJson } from './helpers/update-json.helper';
import { createLibrariesQuestions, ICreateLibraries } from './questions';
import { LIBRARY_TYPE } from './schema';
const inquirer = require('inquirer');

export async function createAppOrLibGenerator(tree: Tree) {
  const directory = '';
  const tags = '';
  const projects = getProjects(tree);
  const projectsNames = getUniqueProjectDomainNames(projects);
  const questions = createLibrariesQuestions(projectsNames);

  const answers = await inquirer.prompt(questions);
  switch (answers.creationType) {
    case 'App': {
      createApp(tree, answers, directory, tags);
      break;
    }
    case 'Library': {
      createLib(answers, directory, tags);
      break;
    }
    default: {
      throw new Error('Unsupported type');
    }
  }
}

const createLib = (options: ICreateLibraries, directory: string, tags: string) => {
  const domainDirectory =
    options.domainType === 'Shared'
      ? 'shared'
      : options.domainType === 'Custom'
      ? options.domainName
      : options.domainType;
  const parsedLibName = kebabCase(options.libName);
  switch (options.libType) {
    case LIBRARY_TYPE.dataAccess: {
      directory = `${domainDirectory}/data-access/${parsedLibName}`;
      tags = TYPE_TAGS.dataAccess;
      break;
    }
    case LIBRARY_TYPE.feature: {
      directory = `${domainDirectory}/feature/${parsedLibName}`;
      tags = TYPE_TAGS.feature;
      break;
    }
    case LIBRARY_TYPE.ui: {
      directory = `${domainDirectory}/ui/${parsedLibName}`;
      tags = TYPE_TAGS.ui;
      break;
    }
    case LIBRARY_TYPE.utils: {
      directory = `${domainDirectory}/utils/${parsedLibName}`;
      tags = TYPE_TAGS.utils;
      break;
    }
    default: {
      throw new Error('Incorrect library type');
    }
  }
  execSync(`nx g @nx/js:lib --directory=${directory} --tags=${tags} --name=${parsedLibName} --unitTestRunner='none'`);
};

const createApp = (tree: Tree, options: ICreateLibraries, directory: string, tags: string) => {
  directory = `apps/${options.appName}`;
  tags = `"type:app"`;
  execSync(
    `nx g app --directory=${directory} --tags=${tags} --name="${options.appName}" --e2eTestRunner="none" --routing=false`
  );

  updateJson(tree, '.eslintrc.json', (eslintJson) => mapEslintJson(eslintJson, tree, options));

  return formatFiles(tree);
};

const getUniqueProjectDomainNames = (projects: Map<string, ProjectConfiguration>): string[] => {
  const projectNames = Array.from(projects.values());
  const domainNames = projectNames
    .map((project) => project.root.split('/')[0])
    .filter((project) => project !== 'shared' && project !== 'apps');
  const uniqueDomainNames = [...new Set(domainNames)];

  return uniqueDomainNames;
};

export default createAppOrLibGenerator;
