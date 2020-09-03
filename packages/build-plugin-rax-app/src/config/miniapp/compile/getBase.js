const { join } = require('path');
const { setAppConfig } = require('miniapp-compile-config');
const { getOutputPath, platformMap } = require('miniapp-builder-shared');

const getWebpackBase = require('../../getWebpackBase');

const { QUICKAPP } = require('../../../constants');

module.exports = (context, target, options = {}, onGetWebpackConfig) => {
  const entryPath = './src/app';
  let outputPath = getOutputPath(context, target);
  // Quickapp's output should be wrapped in src
  if (target === QUICKAPP) {
    outputPath = join(outputPath, 'src');
  }

  const config = getWebpackBase(
    context,
    {
      disableRegenerator: true,
      processBar: {
        name: platformMap[target].name,
      },
    },
    target
  );


  setAppConfig(config, options[target], {
    entryPath,
    outputPath,
    onGetWebpackConfig,
    context,
    target
  });

  return config;
};
