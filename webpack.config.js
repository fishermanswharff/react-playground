var path = require('path'),
    webpack = require('webpack'),
    paths = {
      mainScript: '/app/js/app.jsx',
      testScript: '/spec/index.js',
      scripts: '/app/js/**/*.js',
      destroot: '/dist',
      destjs: '/dist/js',
    };

module.exports.getConfig = function(type){
  var isDev = type === 'development';
  var config = {
    entry: __dirname + paths.mainScript,
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: { presets: ['react', 'es2015'] }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { cacheDirectory: true, presets: ['react', 'es2015'] }
        }
      ],
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            sequences     : false,
            properties    : false,
            dead_code     : false,
            drop_debugger : false,
            unsafe        : false,
            unsafe_comps  : false,
            conditionals  : false,
            comparisons   : false,
            evaluate      : false,
            booleans      : false,
            loops         : false,
            unused        : false,
            hoist_funs    : false,
            keep_fargs    : true,
            keep_fnames   : false,
            hoist_vars    : false,
            if_return     : false,
            join_vars     : false,
            collapse_vars : false,
            cascade       : false,
            side_effects  : false,
            pure_getters  : false,
            pure_funcs    : null,
            negate_iife   : false,
            screw_ie8     : true,
            drop_console  : false,
            angular       : false,
            warnings      : true,
            global_defs   : {},
            passes        : 1,
          },
          mangle: {
            except: ['$super', '$', 'exports', 'require']
          },
          minimize: true,
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify(type)
          }
        })
      ],
      noParse: /node_modules\/quill\/dist/
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
  if(isDev){
    config.devtool = 'eval';
  }
  return config;
};
