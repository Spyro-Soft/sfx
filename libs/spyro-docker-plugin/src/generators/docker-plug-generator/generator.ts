import { formatFiles, generateFiles, Tree, updateJson } from '@nx/devkit';
import * as path from 'path';

import { IMyDockerfileGeneratorSchema } from './schema';

export async function myDockerfileGenerator(tree: Tree, options: IMyDockerfileGeneratorSchema) {
  const projectRoot = `./`;

  let dockerFilesPath = '';

  switch (options.framework) {
    case 'angular': {
      dockerFilesPath = path.join(__dirname, 'files/src/angular');

      break;
    }
    case 'react': {
      dockerFilesPath = path.join(__dirname, 'files/src/react');

      break;
    }
    case 'next': {
      dockerFilesPath = path.join(__dirname, 'files/src/nextjs');

      break;
    }
    default: {
      throw new Error(`Inccorect Framework`);
    }
  }

  generateFiles(tree, dockerFilesPath, projectRoot, options);
  setDockerScripts(tree);
  await formatFiles(tree);
}

export function setDockerScripts(tree: Tree) {
  updateJson(tree, 'package.json', (pkgJson) => {
    pkgJson.scripts = pkgJson.scripts ?? {};
    pkgJson.scripts['docker:build'] = 'docker-compose up';
    pkgJson.scripts['docker:rebuild'] = 'docker-compose up --build';
    return pkgJson;
  });
}

export default myDockerfileGenerator;
