import { Tree } from '@nx/devkit';
import { setupGenerator as ciCdGenerator } from '@spyrosoft/spyro-ci-cd-plugin';
import { myDockerfileGenerator as dockerGenerator } from '@spyrosoft/spyro-docker-plugin';
import { setupGenerator as eslintGenerator } from '@spyrosoft/spyro-eslint-plugin';
import { setupGenerator as huskyGenerator } from '@spyrosoft/spyro-husky-plugin';
import { updateGenerator as scriptsGenerator } from '@spyrosoft/spyro-packagejson-plugin';

import { IUpdateGeneratorSchema } from './schema';

export async function updateGenerator(tree: Tree, options: IUpdateGeneratorSchema) {
  await eslintGenerator(tree, { extend: options.extendEslint });
  if (options.updateHusky) {
    await huskyGenerator(tree);
  }
  await scriptsGenerator(tree, options);
  if (options.overwriteDocker) {
    await dockerGenerator(tree, options);
  }
  if (options.ciCd) {
    await ciCdGenerator(tree, options);
  }
}

export default updateGenerator;
