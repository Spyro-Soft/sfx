import { Tree, updateJson } from '@nx/devkit';

import { packageJsonScripts } from '../../scripts/scripts';
import { IUpdateGeneratorSchema } from './schema';

export async function updateGenerator(tree: Tree, options: IUpdateGeneratorSchema) {
  updateJson(tree, 'package.json', (pkgJson) => {
    const scripts = packageJsonScripts(options.appName);
    return {
      ...pkgJson,
      scripts: {
        ...(pkgJson.scripts || {}),
        ...(options.overwriteScripts ? scripts : {}),
      },
    };
  });
}

export default updateGenerator;
