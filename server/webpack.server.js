// import path from 'path';
// import nodeExternals from 'webpack-node-externals';

// export default {
//   entry: './app.js',
//   target: 'node',
//   externals: [nodeExternals()],
//   output: {
//     path: path.resolve('server-build'),
//     filename: 'index.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: { loader: 'babel-loader' },
//       },
//     ],
//   },
// };

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
