import { Tree } from '@nx/devkit';
import { setupGenerator as ciCdGenerator } from '@spyrosoft/spyro-ci-cd-plugin';
import { myDockerfileGenerator as dockerGenerator } from '@spyrosoft/spyro-docker-plugin';
import { setupGenerator as eslintGenerator } from '@spyrosoft/spyro-eslint-plugin';
import { setupGenerator as huskyGenerator } from '@spyrosoft/spyro-husky-plugin';
import { addScriptsGenerator } from '@spyrosoft/spyro-packagejson-plugin';
import { execSync } from 'child_process';

import { ISetupAllGeneratorSchema } from './schema';

export async function setupAllGenerator(tree: Tree, options: ISetupAllGeneratorSchema) {
  await eslintGenerator(tree, options);
  await huskyGenerator(tree);
  await addScriptsGenerator(tree, options);
  await dockerGenerator(tree, options);
  await ciCdGenerator(tree, options);

  return () => {
    execSync('npm install');
    execSync('npm run code:fix', { stdio: 'ignore' });
  };
}

export default setupAllGenerator;
