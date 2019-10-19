const {resolve} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: "production",
  
  context: resolve(__dirname, 'app'),
  
  entry: {
    app: './index.js'
  },
  
  stats: {
    chunks:      true,
    chunkGroups: true
  },
  
  output: {
    path:          resolve(__dirname, 'client'),
    publicPath:    '/',
    filename:      '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  
  optimization: {
    
    runtimeChunk: 'single',
    splitChunks:  {
      automaticNameDelimiter: '-',
      cacheGroups:            {
        default:  false,
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'all',
          enforce: true,
        },
        react:    {
          test:   /[\\/]node_modules[\\/](react-|react|redux)/,
          name:   'vendors-react',
          chunks: 'all',
          enforce: true
        },
        material: {
          test:   /[\\/]node_modules[\\/](@material-ui)/,
          name:   'vendors-material',
          chunks: 'all',
          enforce: true
        },
        moment: {
          test:   /[\\/]node_modules[\\/](moment|moment-timezone)/,
          name:   'vendors-moment',
          chunks: 'all',
          enforce: true
        },
        others:   {
          test:   /[\\/]node_modules[\\/](@shopify|lodash|flatpickr|postal)/,
          name:   'vendors-others',
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer:    [
      new TerserPlugin(
        {
          cache: true,
          parallel: true,
          sourceMap: false
        }
      )
    ],
    noEmitOnErrors: true
  },
  
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode:   'static',
      openAnalyzer:   false,
      reportFilename: 'bundle-analyzer.html'
    }),
    // strip unnecessary locales and bundle only ENGLISH
    new MomentLocalesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/prod/index.html`,
      filename: 'index.html',
      inject:   'body',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug:    false,
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: './assets/favicon'
      },
      {
        from: './assets/images'
      }
    ]),
  ],
  
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader:     'babel-loader'
      },
      {
        test: /global\.scss$/,
        use:  [
          {loader: 'style-loader'},
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /^((?!global).)*\.scss$/,
        use:  [
          {loader: 'style-loader'},
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /.(ttf|eot|woff|woff2|svg|png|gif|jpe?g|mp3)$/,
        use:  [{
          loader:  'file-loader',
          options: {
            name:       '[name].[hash].[ext]',
            publicPath: '/'
          }
        }]
      }
    ]
  },
};