export class InstallationError extends Error {
  public constructor(error?: unknown) {
    super(`An error occurred during installation process. ${error ? 'Details: ' + error : ''}`);
  }
}

export class GitExistsInstallationError extends InstallationError {
  public constructor() {
    super(`Git repository cannot be initialized in an existing git repository`);
  }
}

export class PackageInstallationError extends Error {
  public constructor() {
    super(
      'Some of your dependencies cause conflicts, please fix them and then run: \n nx migrate --run-migrations \n to finish the process, or rerun the SFX update function'
    );
  }
}

export class UpdateLibrariesError extends Error {
  public constructor(error?: unknown) {
    super(`An error occurred during update process. ${error ? 'Details: ' + error : ''}`);
  }
}
