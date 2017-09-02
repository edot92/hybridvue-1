var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
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
    //   { from: 'node_modules/admin-lte/plugins/', to: 'www/static/plugins' }

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
    //       // Doesn't copy any files with a txt extension
    //     // '*.txt',

    //       // Doesn't copy any file, even if they start with a dot
    //     // '**/*',

    //       // Doesn't copy any file, except if they start with a dot
    //       // { glob: '**/*', dot: false }
    //   ],

    //     // By default, we only copy modified files during
    //     // a watch or webpack-dev-server build. Setting this
    //     // to `true` copies all files.
    //   copyUnmodified: false
    // }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'window.$': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      // Copy redirects file
      {
        from: path.resolve(__dirname, '../_redirects'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      },
      {
        from: 'node_modules/admin-lte/plugins/',
        to: config.build.assetsSubDirectory + '/vendor'
      },
      {
        from: 'node_modules/admin-lte/bootstrap',
        to: config.build.assetsSubDirectory + '/vendor'
      },
      {
        from: 'node_modules/font-awesome',
        to: config.build.assetsSubDirectory + '/vendor'
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
