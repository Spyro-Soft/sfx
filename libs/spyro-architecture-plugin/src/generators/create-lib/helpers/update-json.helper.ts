import { Tree } from '@nx/devkit';

import { affectedFileTypes, getTagsForProject, SCOPE_TAGS, TYPE_TAGS } from '../../../tags-config';
import setupGenerator from '../../setup/generator';
import { ICreateLibraries } from '../questions';

export const mapEslintJson = (eslintJson, tree: Tree, options: ICreateLibraries) => {
  if (eslintJson.overrides?.length) {
    const nxRules = eslintJson.overrides.filter((item) => item.rules['@nx/enforce-module-boundaries']);
    if (!nxRules) {
      return addModuleBoundariesTags(eslintJson, options);
    }
    const depConstraints = nxRules.find((rule) => !!rule?.depConstraints);
    if (depConstraints?.length) {
      addDepConstraintsTags(depConstraints, options);
    } else {
      nxRules.push('error', {
        allow: [],
        depConstraints: getTagsForProject(options.appName),
      });
    }
    return eslintJson;
  }

  setupGenerator(tree, { appName: options.appName });
};

const addDepConstraintsTags = (depConstraints, options: ICreateLibraries) => {
  const isScopeTag = (item, tag) =>
    item.sourceTag === tag && item.onlyDependOnLibsWithTags?.some((depTags) => depTags.startsWith('scope:'));
  const domainTags = Object.keys(TYPE_TAGS)
    .filter((tag) => tag !== TYPE_TAGS.app)
    .filter((tag) => !!depConstraints.find((item) => isScopeTag(item, tag)));
  const sharedTags = Object.keys(TYPE_TAGS)
    .filter((tag) => tag !== TYPE_TAGS.app)
    .filter((tag) => (item) => !isScopeTag(item, tag));
  const domainConstraints = domainTags.map((tag: any) => ({
    ...tag,
    onlyDependOnLibsWithTags: [...tag.onlyDependOnLibsWithTags, `scope:${options.appName}`],
  }));
  const sharedConstraints = sharedTags.map((tag) => ({
    sourceTag: tag,
    onlyDependOnLibsWithTags: [`scope:${options.appName}`, SCOPE_TAGS.shared],
  }));
  const currentConstraint = {
    sourceTag: `scope:${options.appName}`,
    onlyDependOnLibsWithTags: [`scope:${options.appName}`, SCOPE_TAGS.shared],
  };

  depConstraints = [...domainConstraints, ...sharedConstraints, currentConstraint];

  // Object.keys(TYPE_TAGS)
  //   .filter((tag) => tag !== TYPE_TAGS.app)
  //   .forEach((tag) => {
  //     const tagConfig = depConstraints.find(
  //       (item) =>
  //         item.sourceTag === tag && item.onlyDependOnLibsWithTags?.some((depTags) => depTags.startsWith('scope:'))
  //     );
  //     if (tagConfig) {
  //       tagConfig.onlyDependOnLibsWithTags.push(`scope:${options.appName}`);
  //     } else {
  //       depConstraints.push({
  //         sourceTag: tag,
  //         onlyDependOnLibsWithTags: [`scope:${options.appName}`, SCOPE_TAGS.shared],
  //       });
  //     }
  //   });
  // depConstraints.push({
  //   sourceTag: `scope:${options.appName}`,
  //   onlyDependOnLibsWithTags: [`scope:${options.appName}`, SCOPE_TAGS.shared],
  // });
};

const addModuleBoundariesTags = (eslintJson, options: ICreateLibraries) => {
  eslintJson['overrides'] = [];
  eslintJson.overrides.push({
    files: affectedFileTypes,
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: getTagsForProject(options.appName),
        },
      ],
    },
  });
  return eslintJson;
};
