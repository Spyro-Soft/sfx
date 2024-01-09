import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { updateGenerator } from './generator';
import { IUpdateGeneratorSchema } from './schema';

describe('update generator', () => {
  let tree: Tree;
  let options: IUpdateGeneratorSchema;

  function createOptionsObject(): IUpdateGeneratorSchema {
    return {
      appName: 'test',
      framework: 'angular',
      overwriteDocker: true,
      extendEslint: false,
      overwriteScripts: true,
      updateHusky: true,
      ciCd: 'Github',
    };
  }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    options = createOptionsObject();
  });

  it('should update additional config', async () => {
    await updateGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
