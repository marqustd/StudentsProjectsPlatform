const merge = require('webpack-merge'); // eslint-disable-line
const path = require('path');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    spa: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../../dist/Client/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
});
