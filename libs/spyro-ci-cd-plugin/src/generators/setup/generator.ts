import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';

import { ISetupGeneratorSchema } from './schema';

enum REPOSITORY_PROVIDER {
  Github = 'Github',
  Gitlab = 'Gitlab',
  Azure = 'Azure',
  // Bitbucket = 'Bitbucket',
}

export async function setupGenerator(tree: Tree, options: ISetupGeneratorSchema) {
  let projectRoot = '';

  let ciCdFilePath = '';

  switch (options.ciCd) {
    case REPOSITORY_PROVIDER.Github: {
      projectRoot = `./.github/workflows/`;
      ciCdFilePath = path.join(__dirname, 'files/github');
      break;
    }
    case REPOSITORY_PROVIDER.Gitlab: {
      projectRoot = `./`;
      ciCdFilePath = path.join(__dirname, 'files/gitlab');
      break;
    }
    case REPOSITORY_PROVIDER.Azure: {
      projectRoot = `./`;
      ciCdFilePath = path.join(__dirname, 'files/azure');
      break;
    }
    default: {
      throw new Error(`Incorrect platform`);
    }
  }

  generateFiles(tree, ciCdFilePath, projectRoot, options);
  await formatFiles(tree);
}

export default setupGenerator;
