import { addDependenciesToPackageJson, generateFiles, Tree, updateJson } from '@nx/devkit';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { ISetupGeneratorSchema } from './schema';

export async function setupGenerator(tree: Tree, options: ISetupGeneratorSchema) {
  const projectRoot = './';

  if (!options.extend || !fs.existsSync('.eslintrc.json')) {
    generateFiles(tree, path.join(__dirname, 'files/eslint'), projectRoot, options);
  } else {
    appendEslintConfigLib(tree);
  }
  addDependenciesToPackageJson(
    tree,
    {},
    {
      '@spyrosoft/eslint-config-spyro': 'latest',
    }
  );
  if (options.framework && options.appName) {
    fixBrokenFiles(tree, options);
  }

  return () => {
    execSync('npm install');
  };
}

function appendEslintConfigLib(tree: Tree) {
  const eslintConfigLibName = '@spyrosoft/eslint-config-spyro';
  updateJson(tree, '.eslintrc.json', (file) => {
    return {
      ...file,
      extends: {
        ...(file.extends || []),
        ...(file.extends?.includes(eslintConfigLibName) ? [eslintConfigLibName] : []),
      },
    };
  });
}

//some of the files generated by nx are not compliant with our eslint rules
function fixBrokenFiles(tree: Tree, options: ISetupGeneratorSchema) {
  const commandsLocation = `./apps/${options.appName}-e2e/src/support`;
  generateFiles(tree, path.join(__dirname, 'files/shared'), commandsLocation, options);

  switch (options.framework) {
    case 'angular': {
      fixAngularFiles(tree, options);
      break;
    }
    case 'react': {
      break;
    }
    case 'next': {
      fixNextFiles(tree, options);
      break;
    }
  }
}

function fixAngularFiles(tree: Tree, options: ISetupGeneratorSchema) {
  const filePath = `./apps/${options.appName}/src/app/app.component.ts`;
  const contents = tree.read(filePath).toString();
  const newContents = contents.replace(/title/g, 'public title');
  tree.write(filePath, newContents);
}

function fixNextFiles(tree: Tree, options: ISetupGeneratorSchema) {
  const routeLocation = `./apps/${options.appName}/app/api/hello`;
  generateFiles(tree, path.join(__dirname, 'files/nextjs'), routeLocation, options);
}

export default setupGenerator;
