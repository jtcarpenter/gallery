module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      'tests.webpack.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'tests.webpack.js': ['webpack', 'sourcemap'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

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

    // Configure code coverage reporter
    coverageReporter: {
        dir: './coverage/',
        type: 'html'
    },

    singleRun: true,

    webpack: {
        devtool: 'inline-source-map',
        babel: {
            presets: ['es2015', 'react']
        },
        // *optional* isparta options: istanbul behind isparta will use it
        isparta: {
            embedSource: true,
            noAutoWrap: true,
            // these babel options will be passed only to isparta and not to babel-loader
            babel: {
                presets: ['es2015', 'react']
            }
        },
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(src|node_modules)\//,
                    loader: 'babel'
                },
                {
                    test: /\.jsx?$/,
                    loader: 'isparta',
                    include: /src\//,
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {presets: ['es2015', 'react']}
                }
            ]
        }
    },

    // Hide webpack build information from output
    webpackMiddleware: {
        noInfo: true
    },
  })
}
