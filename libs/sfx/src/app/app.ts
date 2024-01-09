import { Config } from '../config/config.js';
import { NX_VALIDITY } from '../constants/nx-validity.js';
import { OPERATION_TYPE } from '../constants/operation-type.js';
import { appQuestionsCreate } from '../constants/questions/create.js';
import { appQuestionsUpdate } from '../constants/questions/update.js';
import { ICliArguments } from '../interfaces/cli-arguments.js';
import { handleError } from '../utils/error.js';
import { runInquirerAndProcessAnswers } from '../utils/inquirer.js';
import { displayAvailableCommands } from '../utils/ui.js';
import { isNodeVersionValid, verifyNxVersion } from '../utils/workspace.js';
import { processAppQuestionareCreate } from './create.js';
import { processAppQuestionareUpdate } from './update.js';

export function runApp(cliArguments: ICliArguments): void {
  terminateAppIfRequirementsNotMet(cliArguments);
  callInquirerAndProcessAnswers(cliArguments);
}

export function terminateAppIfRequirementsNotMet(cliArguments: ICliArguments): void {
  const isNodeValid = isNodeVersionValid();
  const nxValidity = verifyNxVersion();

  if (!isNodeValid) {
    console.error(
      '\x1b[31m',
      `Required node version >=${Config.minNodeVersion} not satisfied with current version ${process.version}`,
      '\x1b[0m'
    );
    process.exit();
  }
  if (
    cliArguments.operationType === OPERATION_TYPE.update &&
    (nxValidity === NX_VALIDITY.Invalid || nxValidity === NX_VALIDITY.WorkspaceNotExists)
  ) {
    console.error('\x1b[31m', 'This is not a valid Nx workspace!', '\x1b[31m');
    process.exit();
  }
}

export function callInquirerAndProcessAnswers(cliArguments: ICliArguments): void {
  if(cliArguments.appName) {
    processAppQuestionareCreate({
      appName: cliArguments.appName,
      repositoryPlatforms: cliArguments.repositoryPlatforms,
      routing: cliArguments.routing,
      errorMonitoringConsent: cliArguments.errorMonitoringConsent,
      bundler: cliArguments.bundler,
      standaloneComponents: cliArguments.standaloneComponents,
      framework: cliArguments.framework,
      monorepoName: cliArguments.monorepoName,
      nextjsRouting: cliArguments.nextjsRouting
    }, cliArguments.verbose)
  }
  switch (cliArguments.operationType) {
    case OPERATION_TYPE.create: {
      runInquirerAndProcessAnswers(appQuestionsCreate, processAppQuestionareCreate, cliArguments.verbose).catch(
        (error) => handleError(error)
      );
      break;
    }
    case OPERATION_TYPE.update: {
      runInquirerAndProcessAnswers(appQuestionsUpdate, processAppQuestionareUpdate, cliArguments.verbose).catch(
        (error) => handleError(error)
      );
      break;
    }
    default: {
      displayAvailableCommands();
      process.exit();
    }
  }
}
