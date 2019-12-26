const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|less)/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({
                browsers: [">0.01%"]
              })]
            }
          }
        ]
      },
      {
        test: /.(png|gif|jpg|jpeg|svg)/,
        use: 'url-loader?limit=4096&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename:'[id].css'
    }),
    new TransferWebpackPlugin([
      { from: path.join(__dirname, './src/images'),to: path.join(__dirname, "dist/images")}
    ]),
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:3000/index.html'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
    hot: true
  }
}