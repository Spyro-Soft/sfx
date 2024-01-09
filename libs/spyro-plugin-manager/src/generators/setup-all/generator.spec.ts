import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { setupAllGenerator } from './generator';
import { ISetupAllGeneratorSchema } from './schema';

describe('setup-all generator', () => {
  let tree: Tree;
  const options: ISetupAllGeneratorSchema = { appName: 'test', framework: 'angular', extend: false, ciCd: 'Github' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await setupAllGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
