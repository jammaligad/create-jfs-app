#!/usr/bin/env node
const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const choices = require('./stack')

program
  .version('1.0.0')
  .description("CLI tool to generate a boilerplate for a web app using JAM's preferences");

program
  .command('<appname>')
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
