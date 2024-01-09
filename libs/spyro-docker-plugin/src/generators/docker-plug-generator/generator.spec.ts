import { Tree } from '@nrwl/devkit';
import { createTree } from '@nrwl/devkit/testing';

import { myDockerfileGenerator } from './generator';
import { IMyDockerfileGeneratorSchema } from './schema';

describe('myDockerfileGenerator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTree();
  });

  it('should generate Dockerfile based on selected framework', async () => {
    const options: IMyDockerfileGeneratorSchema = {
      name: 'my-project',
      framework: 'angular',
    };

    await myDockerfileGenerator(tree, options);

    expect(tree.exists('./dist/libs/docker-plug/src/generators/docker-plug-generator/files/src/angular')).toBeTruthy();
    expect(tree.exists('./dist/libs/docker-plug/src/generators/docker-plug-generator/files/src/react')).toBeFalsy();
    expect(tree.exists('./dist/libs/docker-plug/src/generators/docker-plug-generator/files/src/nextjs')).toBeFalsy();
  });
});
