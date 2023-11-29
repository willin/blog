/* eslint-disable */
const { execSync } = require('child_process');
const fs = require('fs');

const pkg = fs.readFileSync('package.json', { encoding: 'utf-8' });

const { dependencies = {}, devDependencies = {} } = JSON.parse(pkg);

Object.keys(dependencies).forEach((key) => {
  console.log(
    execSync(`pnpm i ${key}`, {
      encoding: 'utf-8'
    })
  );
});

Object.keys(devDependencies).forEach((key) => {
  console.log(
    execSync(`pnpm i -D ${key}`, {
      encoding: 'utf-8'
    })
  );
});
