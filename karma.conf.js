var travis = process.env.TRAVIS;

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    autowatch: true,
    singleRun: !!travis,
    files: [
      'spec/**/*.spec.js'
    ],
    reporters: ['spec', 'failed', 'coverage'],
    browsers: [travis ? 'Firefox' : 'ChromeCanary'],
    webpack: {
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
      }
    },
    preprocessors: {
      'spec/**/*.spec.js': ['webpack'],
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        {
          type: 'lcovonly',
          dir: 'coverage',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    }
  });
}
