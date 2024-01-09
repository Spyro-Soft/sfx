import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { Config } from '../config/config.js';

export function sendError(error: unknown): void {
  try {
    axios.post(Config.errorLogServerAddress, {
      error: error instanceof Error ? error.toString() : error,
    });
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

function getErrorJsonPath(): string {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  return path.join(dirname, '../config/send-error.json');
}

function getErrorJsonFile() {
  const sendErrorJsonPath = getErrorJsonPath();
  const sendErrorJson = fs.readFileSync(sendErrorJsonPath).toString();

  return JSON.parse(sendErrorJson);
}

export function updateSendErrorConsent(decision: boolean): void {
  const sendErrorJsonPath = getErrorJsonPath();
  const sendErrorJson = getErrorJsonFile();
  sendErrorJson.sendError = decision;
  fs.writeFileSync(sendErrorJsonPath, JSON.stringify(sendErrorJson));
}

export function shouldSendError(expectedValue: boolean | null): boolean {
  const sendErrorJson = getErrorJsonFile();

  return sendErrorJson.sendError === expectedValue;
}

// this function is made for errors which won't get caught inside a try-catch block
export function handleError(error: unknown): void {
  console.error(error);
  if (shouldSendError(true)) {
    sendError(error);
  }
  process.exit(1);
}
