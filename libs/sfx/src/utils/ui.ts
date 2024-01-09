/* eslint-disable no-console */

import { Config } from '../config/config.js';
import { OPERATION_TYPE } from '../constants/operation-type.js';

export const asciArt = `
╔═══╗╔═══╗╔╗──╔╗╔═══╗╔═══╗╔═══╗╔═══╗╔═══╗╔════╗     ╔═══╗╔═╗╔═╗
║╔═╗║║╔═╗║║╚╗╔╝║║╔═╗║║╔═╗║║╔═╗║║╔═╗║║╔══╝║╔╗╔╗║     ║╔══╝╚╗╚╝╔╝
║╚══╗║╚═╝║╚╗╚╝╔╝║╚═╝║║║─║║║╚══╗║║─║║║╚══╗╚╝║║╚╝     ║╚══╗─╚╗╔╝─
╚══╗║║╔══╝─╚╗╔╝─║╔╗╔╝║║─║║╚══╗║║║─║║║╔══╝──║║──     ║╔══╝─╔╝╚╗─
║╚═╝║║║─────║║──║║║╚╗║╚═╝║║╚═╝║║╚═╝║║║─────║║──     ║║───╔╝╔╗╚╗
╚═══╝╚╝─────╚╝──╚╝╚═╝╚═══╝╚═══╝╚═══╝╚╝─────╚╝──     ╚╝───╚═╝╚═╝
`;

export function displayAsciArt(): void {
  console.log(asciArt);
}

export function displayMessage(message: string | string[]): void {
  if (Array.isArray(message)) {
    message.forEach((msg) => {
      console.log('\n', msg);
    });
  } else {
    console.log('\n', message);
  }
}

export function displayAvailableCommands(): void {
  let message = `
================================================================================

You must provide one of the available commands:

`;
  commands.forEach((command) => {
    if (!Config.disabledCommands.includes(command.name)) {
      message += `${command.name}		- ${command.prompt}\n`;
    }
  });
  message += '\n================================================================================\n';
  displayMessage(message);
}

const commands = [
  {
    name: OPERATION_TYPE.create,
    prompt: 'Create new project in current localization.',
  },
  {
    name: OPERATION_TYPE.update,
    prompt: `Update ${Config.cliName} tools in current project.`,
  },
];
