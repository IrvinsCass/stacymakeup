const path = require('path')
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'static/'
}

module.exports = {

  externals: {
    paths: PATHS
  },
  entry: {
    index: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },{
      test: require.resolve('jquery'),
      use: [{
      loader: 'expose-loader',
      options: '$'
        }
      ]
    },{
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },{
      test: /\.scss$/,
      use: [
        'style-loader',
        miniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true }
        }, {
          loader: "postcss-loader",
          options: { sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js`} }
        }, {
          loader: "sass-loader",
          options: { sourceMap: true }
        }
      ]
    },{
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader',
        options: { pretty: true }
      }]
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: `./fonts`
          }
      }]
    }]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.pug`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
      { from: `${PATHS.src}/static`, to: ''}
    ]),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`},
      { from: `${PATHS.src}/static`, to: ''}
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}