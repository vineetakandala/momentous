const {resolve} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  
  context: resolve(__dirname, 'app'),
  
  entry: {
    app: [
      'react-hot-loader/patch',
      './index'
    ]
  },
  
  stats: {
    chunks:      true,
    chunkGroups: true,
    performance: false,
    usedExports: true,
    version:     false
  },
  
  output: {
    filename:   'bundle.js',
    path:       resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  
  devServer: {
    hot:                true,
    historyApiFallback: true,
    contentBase:        resolve(__dirname, 'dev'),
    publicPath:         '/',
    port:               8080
  },
  
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  
  module: {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     ['babel-loader', 'react-hot-loader/webpack']
      },
      {
        test: /global\.scss$/,
        use:  [
          {loader: 'style-loader'},
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: true
            }
          },
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /^((?!global).)*\.scss$/,
        use:  [
          {loader: 'style-loader'},
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: true
            }
          },
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /.(ttf|eot|woff|woff2|svg|png|gif|jpe?g|mp3)$/,
        use:  [{
          loader:  'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/dev/index.html`,
      filename: 'index.html',
      inject:   'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('development')}
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/favicon/*'
      },
      {
        from: 'assets/images/*'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ]
};