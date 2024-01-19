export enum TYPE_TAGS {
  utils = 'type:utils',
  dataAccess = 'type:data-access',
  ui = 'type:ui',
  feature = 'type:feature',
  app = 'type:app',
}

export enum SCOPE_TAGS {
  shared = 'scope:shared',
}

export const affectedFileTypes = ['*.ts', '*.tsx', '*.js', '*.jsx'];

export const getTagsForProject = (appName: string) => {
  return [
    {
      sourceTag: '',
      onlyDependOnLibsWithTags: [''],
    },
    {
      sourceTag: TYPE_TAGS.utils,
      onlyDependOnLibsWithTags: [TYPE_TAGS.utils],
    },
    {
      sourceTag: TYPE_TAGS.utils,
      onlyDependOnLibsWithTags: [`scope:${appName}`, SCOPE_TAGS.shared],
    },
    {
      sourceTag: TYPE_TAGS.dataAccess,
      onlyDependOnLibsWithTags: [TYPE_TAGS.utils, TYPE_TAGS.dataAccess],
    },
    {
      sourceTag: TYPE_TAGS.dataAccess,
      onlyDependOnLibsWithTags: [`scope:${appName}`, SCOPE_TAGS.shared],
    },
    {
      sourceTag: TYPE_TAGS.ui,
      onlyDependOnLibsWithTags: [TYPE_TAGS.utils, TYPE_TAGS.dataAccess, TYPE_TAGS.ui],
    },
    {
      sourceTag: TYPE_TAGS.ui,
      onlyDependOnLibsWithTags: [`scope:${appName}`, SCOPE_TAGS.shared],
    },
    {
      sourceTag: TYPE_TAGS.feature,
      onlyDependOnLibsWithTags: [TYPE_TAGS.utils, TYPE_TAGS.dataAccess, TYPE_TAGS.ui, TYPE_TAGS.feature],
    },
    {
      sourceTag: TYPE_TAGS.feature,
      onlyDependOnLibsWithTags: [`scope:${appName}`, SCOPE_TAGS.shared],
    },
    {
      sourceTag: TYPE_TAGS.app,
      onlyDependOnLibsWithTags: [TYPE_TAGS.utils, TYPE_TAGS.dataAccess, TYPE_TAGS.ui, TYPE_TAGS.feature],
    },
    {
      sourceTag: `scope:${appName}`,
      onlyDependOnLibsWithTags: [`scope:${appName}`, SCOPE_TAGS.shared],
    },
    {
      sourceTag: SCOPE_TAGS.shared,
      onlyDependOnLibsWithTags: [SCOPE_TAGS.shared],
    },
  ];
};
