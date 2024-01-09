import { FRAMEWORKS } from '../constants/form-choices.js';
import { OPERATION_TYPE } from '../constants/operation-type.js';

export const Config = Object.freeze({
  cliName: 'Spyrosoft Frontend Extensions',
  disabledFrameworks: <FRAMEWORKS[]>[FRAMEWORKS.nextJs],
  disabledCommands: <OPERATION_TYPE[]>[],
  minNxVersion: '16.3.4',
  maxNxVersion: '16.8.1',
  minNodeVersion: '16.16.0',
  errorLogServerAddress: 'http://172.171.204.95:300/error',
});
