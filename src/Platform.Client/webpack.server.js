const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, '../../dist/Client'),
    filename: 'server.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  target: 'node',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
