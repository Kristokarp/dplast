const devConfig = require('./webpack.config.dev');

const config = {};

Object.assign(config, devConfig);
config.devtool = 'source-map';

config.mode = 'production';

module.exports = config;
