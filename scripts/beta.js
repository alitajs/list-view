#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageJson = require(path.join(__dirname, '../package.json'));

class BetaManager {
  constructor() {
    this.versionSuffix = '-beta';
  }
  versionSetup() {
    const version = packageJson.version;
    if (/(\d|-){1,}-beta$/.test(version)) {
      return;
    }
    this.versionPushBeta();
  }
  versionPushBeta() {
    const version = `${packageJson.version}${this.versionSuffix}`;
    packageJson.version = version;
    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(packageJson, null, 4));
  }
}

const beta = new BetaManager();
beta.versionSetup();
