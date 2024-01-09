import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';

import { Config } from '../config/config.js';
import { NX_VALIDITY } from '../constants/nx-validity.js';
import { handleError } from './error.js';

export function isNodeVersionValid(): boolean {
  const version = process.version.replace('v', '').split('.');
  const requiredVersion = Config.minNodeVersion.split('.');
  if (version.length !== requiredVersion.length) {
    throw new Error(`Malformed version string: ${process.version}`);
  }
  for (let i = 0; i < requiredVersion.length; i++) {
    const required = requiredVersion[i];
    const current = version[i];
    if (current > required) {
      return true;
    } else if (current < required) {
      return false;
    }
  }
  return true;
}

export function verifyNxVersion(): NX_VALIDITY {
  if (!existsSync('package.json')) {
    return NX_VALIDITY.WorkspaceNotExists;
  }
  const versionCommandOutput = spawnSync('npm list nx --depth=0 --json', { shell: true }).stdout;
  const packageJsonObject = JSON.parse(versionCommandOutput.toString());
  const nxVersion = packageJsonObject.devDependencies?.nx?.version || packageJsonObject.dependencies?.nx?.version;

  if (!nxVersion) {
    return NX_VALIDITY.Invalid;
  } else if (isNxLowerThanSupported(nxVersion)) {
    return NX_VALIDITY.Lower;
  } else if (isNxHigherThanSupported(nxVersion)) {
    return NX_VALIDITY.Higher;
  }
  return NX_VALIDITY.Valid;
}

export function isNxLowerThanSupported(nxVersion: string): boolean {
  const currentVersion = nxVersion.split('.');
  const minNxVersion = Config.minNxVersion.split('.');
  for (let i = 0; i < currentVersion.length; i++) {
    const current = parseInt(currentVersion[i]);
    const minVersion = parseInt(minNxVersion[i]);
    if (current > minVersion) {
      return false;
    } else if (current < minVersion) {
      return true;
    }
  }
  return false;
}

export function isNxHigherThanSupported(nxVersion: string): boolean {
  const currentVersion = nxVersion.split('.');
  const maxNxVersion = Config.maxNxVersion.split('.');
  for (let i = 0; i < currentVersion.length; i++) {
    const current = parseInt(currentVersion[i]);
    const maxVersion = parseInt(maxNxVersion[i]);
    if (current < maxVersion) {
      return false;
    } else if (current > maxVersion) {
      return true;
    }
  }
  return false;
}

export function replaceDependencyVersionWithStrictVersion(): void {
  const packageJson = readFileSync('package.json', 'utf8');
  const updatedJson = packageJson.replace('^', '').replace('~', '');

  writeFileSync('package.json', updatedJson);
}

export function commitAllChanges(): void {
  try {
    const commands = ['git add .', 'git commit -m "ci: additional config"'];
    const toExecute = commands.reduce((a, b) => a + ' && ' + b);
    execSync(toExecute, { stdio: 'ignore' });
  } catch (error) {
    handleError(error);
  }
}
