const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './',
    ],
  },

  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  context: resolve(__dirname, 'src'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: resolve(__dirname, 'src'),
      },

      {
        test: /^(?!.*\.bg\.svg$).*\.svg$/,
        loader: 'svg-react-loader',
      },

      {
        test: /\.bg.svg$/,
        loader: 'url-loader',
      },

      {
        test: /\.(jpg|png|gif)?(\?.+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Amdocs - MobX Router',
      template: 'index.ejs',
    }),
  ],
};
