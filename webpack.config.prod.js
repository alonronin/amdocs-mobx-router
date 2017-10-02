const merge = require('webpack-merge');
const { optimize: { CommonsChunkPlugin, UglifyJsPlugin } } = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const common = require('./webpack.config');
const autoPrefixer = require('autoprefixer');
const { dependencies } = require('./package.json');

module.exports = merge(common, {
  entry: {
    vendors: Object.keys(dependencies),
  },

  output: {
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },

      {
        test: /\.scss$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ],
  },

  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity,
    }),

    new ExtractText('styles.[hash].css'),

    new UglifyJsPlugin({
      compress: {
        drop_console: true,
      },
    }),
  ],
});
