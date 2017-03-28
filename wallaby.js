var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'test-config/wallaby-test.js',
    'src/**/*.spec.js'
  ],

  module: {
    loaders: [
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'null-loader'}
    ]
  }
});

module.exports = function (wallaby) {

  return {
    files: [
      {pattern: 'test-config/wallaby-test.js', load: false},
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*.spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      kind: 'electron'
    },

    postprocessor: webpackPostprocessor,

    setup: function () {

      var onErrorHandler = window.onerror;
      window.onerror = function (error, filePath, linerNum) {
        if (error.indexOf('Cannot read property \'parentElement\' of undefined')) return;
        onErrorHandler(error, filePath, linerNum);
      };

      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};