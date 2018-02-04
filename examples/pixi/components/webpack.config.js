const path = require('path');
const phaserModuleRelativePath = '/node_modules/phaser-ce/';
const phaserModulePath = path.join(__dirname, phaserModuleRelativePath);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
  externals: {
    'lodash': 'lodash'
  },
  entry: path.resolve(__dirname, 'src/app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.(jpe?g|gif|png|svg)$/, loader: "file-loader?name=/img/[name].[ext]?[hash]" }
    ]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo game'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'lodash',
          entry: 'lodash.js',
          global: '_'
        }
      ]
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./dist']
      }
    })
  ]
};
