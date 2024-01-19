enum LIBRARY_TYPE {
  utils = 'utils',
  dataAccess = 'data-access',
  ui = 'ui',
  feature = 'feature',
  app = 'app',
}

export interface ICreateLibGeneratorSchema {
  type: LIBRARY_TYPE;
  name: string;
}
