import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  installPackagesTask,
  Tree,
  updateJson,
} from '@nx/devkit';
import { execSync } from 'child_process';
import { unlinkSync } from 'fs';
import * as path from 'path';

export async function setupGenerator(tree: Tree) {
  addDependenciesToPackageJson(
    tree,
    {},
    {
      husky: 'latest',
      '@commitlint/cli': '^17.6.5',
      '@commitlint/config-conventional': '^17.6.5',
    }
  );
  updateJson(tree, 'package.json', (pckgJson) => {
    pckgJson.scripts = pckgJson.scripts ?? {};
    pckgJson.scripts.prepare = 'npx husky install';
    return pckgJson;
  });
  execSync('npx husky install');

  addCommitMsgHook(tree);
  addPrePushHook(tree);

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

async function addCommitMsgHook(tree: Tree) {
  const hookFilePath = `.husky/commit-msg`;
  const commitlintFilePath = 'commitlint.config.js';
  const hookFileExists = tree.exists(hookFilePath);
  const commitlintFileExists = tree.exists(commitlintFilePath);

  if (hookFileExists) {
    unlinkSync(hookFilePath);
  }
  if (commitlintFileExists) {
    unlinkSync(commitlintFilePath);
  }
  generateCommitMsgFiles(tree, hookFilePath);
}

function generateCommitMsgFiles(tree: Tree, hookFilePath: string) {
  const projectRoot = './';
  const commands = 'npx --no-install commitlint --edit "$1"';
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {});
  execSync(`npx husky add ${hookFilePath} "${commands}"`);
}

function addPrePushHook(tree: Tree) {
  const hookFilePath = `.husky/pre-push`;
  const hookFileExists = tree.exists(hookFilePath);

  if (hookFileExists) {
    unlinkSync(hookFilePath);
  }
  generatePrePushFile(hookFilePath);
}

function generatePrePushFile(hookFilePath: string) {
  const commands = [
    'npm ci',
    'npx nx run-many --all --target=lint --parallel',
    'npx nx format:check --configuration ./.prettierrc',
    'npx nx run-many --target=test --all --parallel --skip-nx-cache',
  ];
  const hookCommands = commands.reduce((a, b) => a + ' && ' + b);
  execSync(`npx husky add ${hookFilePath} "${hookCommands}"`);
}

export default setupGenerator;
