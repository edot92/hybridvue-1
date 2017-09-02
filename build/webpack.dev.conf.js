var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development, but chrome doesn't stop at breakpoints
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',

  plugins: [

    // new CopyWebpackPlugin([
    //   // {output}/file.txt
    //   // { from: 'from/file.txt' },

    //   // // {output}/to/file.txt
    //   // { from: 'from/file.txt', to: 'to/file.txt' },

    //   // // {output}/to/directory/file.txt
    //   // { from: 'from/file.txt', to: 'to/directory' },

    //   // // Copy directory contents to {output}/
    //   // { from: 'from/directory' },

    //   // Copy directory contents to {output}/to/directory/
    //   { from: 'node_modules/admin-lte/plugins/*', to: 'www/static/plugins' }

    //   // Copy glob results to /absolute/path/
    //   // { from: 'from/directory/**/*', to: '/absolute/path' },

    //   // // Copy glob results (with dot files) to /absolute/path/
    //   // {
    //   //   from: {
    //   //     glob: 'from/directory/**/*',
    //   //     dot: true
    //   //   },
    //   //   to: '/absolute/path'
    //   // },

    //   // // Copy glob results, relative to context
    //   // {
    //   //   context: 'from/directory',
    //   //   from: '**/*',
    //   //   to: '/absolute/path'
    //   // }

    //   // {output}/file/without/extension
    //   // {
    //   //   from: 'path/to/file.txt',
    //   //   to: 'file/without/extension',
    //   //   toType: 'file'
    //   // },

    //   // {output}/directory/with/extension.ext/file.txt
    //   // {
    //   //   from: 'path/to/file.txt',
    //   //   to: 'directory/with/extension.ext',
    //   //   toType: 'dir'
    //   // }
    // ], {
    //   ignore: [
    //     //   // Doesn't copy any files with a txt extension
    //     // '*.txt',

    //     //   // Doesn't copy any file, even if they start with a dot
    //     // '**/*',

    //     //   // Doesn't copy any file, except if they start with a dot
    //     //   { glob: '**/*', dot: false }
    //   ],

    //     // By default, we only copy modified files during
    //     // a watch or webpack-dev-server build. Setting this
    //     // to `true` copies all files.
    //   copyUnmodified: true
    // }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      'window.$': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether'
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
    // new CopyWebpackPlugin([
    //   {
    //     from: '/home/edylinuxpc/go/src/gitlab.com/edot92/duhans_reporting/CoPilot/node_modules/admin-lte/plugins/',
    //     to: '/home/edylinuxpc/go/src/gitlab.com/edot92/duhans_reporting/CoPilot/static' + '/vendor',
    //     force: true
    //   },
    //   {
    //     from: '/home/edylinuxpc/go/src/gitlab.com/edot92/duhans_reporting/CoPilot/node_modules/admin-lte/bootstrap',
    //     to: '/home/edylinuxpc/go/src/gitlab.com/edot92/duhans_reporting/CoPilot/static' + '/vendor',
    //     force: true
    //   }
    // ], {
    //   debug: 'info',
    //   copyUnmodified: true
    // }
    // )
  ]
})
