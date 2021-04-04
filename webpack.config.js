const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
  const dev = env.development;
  return {
    mode: dev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src/prepareData.ts'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
    },
    devtool: dev ? 'inline-source-map' : false,
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  };
};
