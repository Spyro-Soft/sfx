import { Tree, updateJson } from '@nx/devkit';

import { packageJsonScripts } from '../../scripts/scripts';
import { IAddScriptsGeneratorSchema } from './schema';

export async function addScriptsGenerator(tree: Tree, options: IAddScriptsGeneratorSchema) {
  updateJson(tree, 'package.json', (pkgJson) => {
    const scripts = packageJsonScripts(options.appName);
    return {
      ...pkgJson,
      scripts: pkgJson.scripts ? { ...pkgJson.scripts, ...scripts } : scripts,
    };
  });
}

export default addScriptsGenerator;
