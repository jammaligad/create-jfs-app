#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url';

import choices from './stack.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version('1.0.0')
  .description("CLI tool to generate a boilerplate for a web app using JAM's preferences");

program
  .command('generate <appname>')
  .alias('g')
  .description("Generate a full-stack web app boilerplate using JAM's preferences")
  .action(async (appName) => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'stack',
        message: 'Choose your stack:',
        choices,
      },
    ]);

    const templatePath = path.join(__dirname, 'templates', answers.stack);
    const destinationPath = path.join(process.cwd(), appName);

    try {
      await fs.copy(templatePath, destinationPath);
      console.log(`JFS Boilerplate generated for ${appName}`);
    } catch (err) {
      console.error('Error copying template:', err);
    }
  });

program.parse(process.argv);
