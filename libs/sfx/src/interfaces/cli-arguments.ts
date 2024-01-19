import { OPERATION_TYPE } from '../constants/operation-type.js';
import { IFormOptionsCreate } from '../interfaces/form-options.js';

export interface ICliArguments extends Partial<IFormOptionsCreate> {
  operationType: OPERATION_TYPE;
  verbose?: boolean;
framework?: string;
  bundler?: string;
  monorepoName?: string;
  errorMonitoringConsent?: boolean 
  repositoryPlatforms?: string
  appName?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCliArguments(cliArguments: any): ICliArguments {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _, ...typedArguments } = cliArguments;
  const baseArguments = _ as string[];
  const operationType = baseArguments.find((arg) => Object.values<string>(OPERATION_TYPE).includes(arg));
  const parsedArguments: ICliArguments = {
    ...typedArguments,
    operationType: operationType,
  };
  return parsedArguments;
}
