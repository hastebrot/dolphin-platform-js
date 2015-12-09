// Karma configuration
// Generated on Wed May 27 2015 21:40:46 GMT+0200 (CEST)

module.exports = function (config) {

    // Use ENV vars on TeamCity and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        if (!fs.existsSync('sauce.json')) {
            console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
            process.exit(1);
        } else {
            process.env.SAUCE_USERNAME = require('./sauce').username;
            process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
        }
    }



    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            './bower_components/open-dolphin-js/dist/opendolphin.js',
            './test/build/**/test-*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './src/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Sauce Labs configuration
        sauceLabs: {
            testName: 'dolphin-js Unit Tests',
            recordScreenshots: true,
            recordVideo: false
        },
        captureTimeout: 120000,
        browserDisconnectTimeout: 10 * 1000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 20 * 1000,


        // Coverage configuration
        coverageReporter: {
            subdir: '.'
        }
    });
};
