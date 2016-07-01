// Karma configuration
// Generated on Tue Dec 01 2015 12:22:28 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    /*
       ionic.bundle.js is a concatenation of:
       ionic.js, angular.js, angular-animate.js,
       angular-sanitize.js, angular-ui-router.js,
       and ionic-angular.js
     */
     'www/lib/ionic/js/ionic.bundle.js',
     'www/lib/ngCordova/dist/ng-cordova.js',

     // (Required) angular mocks for testing suite
     'www/lib/ngCordova/dist/ng-cordova-mocks.js',
     'node_modules/angular-mocks/angular-mocks.js',

      // our app code
      'www/js/*.js',

      // our spec files
      'node_modules/expect.js/index.js',
      'test/*.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js',
      'test/serverSpec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    // concurrency: Infinity
  });
};
