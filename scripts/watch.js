#!/usr/bin/env node

import chokidar from 'chokidar';
import { $ } from 'execa';

const cwd = process.cwd();

$`rm dist tsconfig.tsbuildinfo`;

// Function to compile TypeScript
function compileTS() {
  console.log('Compiling TypeScript...');
  $`tsc -p ${cwd}/tsconfig.json`;
  $`chmod +x ${cwd}/dist/index.js`;
  copyTemplates();
}

// Function to copy templates
function copyTemplates() {
  console.log('Copying templates...');
  $`rm -rf ${cwd}/dist/templates`;
  $`cp -R ${cwd}/src/templates ${cwd}/dist/templates`;
}

// Initial compile and copy
compileTS();
copyTemplates();

// Watch TypeScript files
chokidar
  .watch(`${cwd}/src/**/*.ts`, { ignored: /(^|[\/\\])\../ })
  .on('change', (event, path) => {
    compileTS();
  });

// Watch template files
chokidar
  .watch(`src/templates/**/*`, { ignored: /(^|[\/\\])\../ })
  .on('change', (event, path) => {
    copyTemplates();
  });

console.log('Watching for changes...');
