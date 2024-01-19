import { Tree, updateJson } from '@nx/devkit';

import { affectedFileTypes, getTagsForProject } from '../../tags-config';
import { ISetupGeneratorSchema } from './schema';

export async function setupGenerator(tree: Tree, options: ISetupGeneratorSchema) {
  const tagsArray = getTagsForProject(options.appName);
  updateJson(tree, '.eslintrc.json', (eslintJson) => {
    return {
      ...eslintJson,
      plugins: ['@nx'],
      overrides: [
        {
          files: affectedFileTypes,
          rules: {
            '@nx/enforce-module-boundaries': [
              'error',
              {
                allow: [],
                depConstraints: tagsArray,
              },
            ],
          },
        },
      ],
    };
  });
  const projectPath = `apps/${options.appName}/project.json`;
  updateJson(tree, projectPath, (projectJson) => {
    return {
      ...projectJson,
      tags: ['type:app', `scope:${options.appName}`],
    };
  });
  updateJson(tree, 'package.json', (pkgJson) => {
    const script = {
      'create-lib': 'nx g @spyrosoft/spyro-architecture-plugin:create-lib',
      group: 'nx g @spyrosoft/spyro-architecture-plugin:group',
    };
    return {
      ...pkgJson,
      scripts: pkgJson.scripts ? { ...pkgJson.scripts, ...script } : script,
    };
  });
}

export default setupGenerator;
