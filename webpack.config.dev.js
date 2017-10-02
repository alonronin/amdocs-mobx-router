const { resolve, join } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');
const autoPrefixer = require('autoprefixer');

const { PORT: port = 80 } = process.env;

module.exports = merge(common, {
  output: {
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: resolve(__dirname, 'src'),
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',

          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [
                  autoPrefixer,
                ];
              },
            },
          },

          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: join(__dirname, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    port,
  },
});
