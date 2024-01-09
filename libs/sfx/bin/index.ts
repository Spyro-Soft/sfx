#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runApp } from '../src/app/app.js';
import { parseCliArguments } from '../src/interfaces/cli-arguments.js';
import { displayAsciArt } from '../src/utils/ui.js';

displayAsciArt();

const argv = parseCliArguments(yargs(hideBin(process.argv)).argv);

runApp(argv);
