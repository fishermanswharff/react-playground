var path = require('path');
var paths = {
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
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
  if(isDev) config.devtool = 'eval';
  return config;
};
