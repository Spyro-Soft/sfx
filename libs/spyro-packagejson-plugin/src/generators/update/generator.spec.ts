import { readJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { packageJsonScripts } from '../../scripts/scripts';
import { updateGenerator } from './generator';
import { IUpdateGeneratorSchema } from './schema';

describe('update generator', () => {
  let tree: Tree;
  const options: IUpdateGeneratorSchema = { appName: 'test', overwriteScripts: true };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should update project in empty workspace', async () => {
    await updateGenerator(tree, options);
    const packageJson = readJson(tree, 'package.json');
    expect(packageJson.scripts).toMatchObject(packageJsonScripts(options.appName));
  });
});
