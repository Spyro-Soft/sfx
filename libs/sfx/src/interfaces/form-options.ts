export interface IFormOptionsGeneral {
  framework: string;
  appName: string;
}

export interface IAngularOptions {
  routing: boolean;
  standaloneComponents: boolean;
}

export interface INextOptions {
  nextjsRouting: boolean;
}

export interface IFormOptionsCreate extends IFormOptionsGeneral, IAngularOptions, INextOptions {
  monorepoName: string;
  bundler: string;
  errorMonitoringConsent: boolean;
  repositoryPlatforms: string;
}

export interface IFormOptionsUpdate extends IFormOptionsGeneral {
  installNx: boolean;
  updateNx: boolean;
  action: string;
  overwriteDocker: boolean;
  overwriteScripts: boolean;
  extendEslint: boolean;
  updateHusky: boolean;
  finishMigration: boolean;
  changeRepository: boolean;
  repositoryPlatforms: string;
}
