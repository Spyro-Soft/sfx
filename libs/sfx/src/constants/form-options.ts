import { IFormOptionsCreate, IFormOptionsUpdate } from '../interfaces/form-options.js';
import { TInterfaceKeys } from '../types/interface-keys.js';

//we need interfaces for questions and enum or enum-like object with questions names,
//and since they share the same keys we have a custom type to keep them synchronized
const formOptionsCreate: TInterfaceKeys<IFormOptionsCreate> = {
  framework: 'framework',
  appName: 'appName',
  routing: 'routing',
  standaloneComponents: 'standaloneComponents',
  nextjsRouting: 'nextjsRouting',
  monorepoName: 'monorepoName',
  bundler: 'bundler',
  errorMonitoringConsent: 'errorMonitoringConsent',
  repositoryPlatforms: 'repositoryPlatforms',
};

const formOptionsUpdate: TInterfaceKeys<IFormOptionsUpdate> = {
  framework: 'framework',
  appName: 'appName',
  installNx: 'installNx',
  updateNx: 'updateNx',
  action: 'action',
  overwriteDocker: 'overwriteDocker',
  overwriteScripts: 'overwriteScripts',
  extendEslint: 'extendEslint',
  updateHusky: 'updateHusky',
  finishMigration: 'finishMigration',
  changeRepository: 'changeRepository',
  repositoryPlatforms: 'repositoryPlatforms',
};

export const FORM_OPTIONS_CREATE = Object.freeze(formOptionsCreate);
export const FORM_OPTIONS_UPDATE = Object.freeze(formOptionsUpdate);
