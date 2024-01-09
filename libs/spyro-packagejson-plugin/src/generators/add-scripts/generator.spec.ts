import { readJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { packageJsonScripts } from '../../scripts/scripts';
import { addScriptsGenerator } from './generator';
import { IAddScriptsGeneratorSchema } from './schema';

describe('add-scripts generator', () => {
  let tree: Tree;
  const options: IAddScriptsGeneratorSchema = { appName: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should add scripts to package.json', async () => {
    await addScriptsGenerator(tree, options);
    const packageJson = readJson(tree, 'package.json');
    expect(packageJson.scripts).toMatchObject(packageJsonScripts(options.appName));
  });
});
