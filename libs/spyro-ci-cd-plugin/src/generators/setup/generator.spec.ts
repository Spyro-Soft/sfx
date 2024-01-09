import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { setupGenerator } from './generator';
import { ISetupGeneratorSchema } from './schema';

describe('setup generator', () => {
  let tree: Tree;
  const options: ISetupGeneratorSchema = { ciCd: 'github' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await setupGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
