export interface IUpdateGeneratorSchema {
  appName: string;
  framework: string;
  overwriteDocker: boolean;
  extendEslint: boolean;
  overwriteScripts: boolean;
  updateHusky: boolean;
  ciCd: string;
}
