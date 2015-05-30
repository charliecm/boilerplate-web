/**
 * Karma Config for Unit Testing
 */

'use strict';

var gulpConfig = require('./gulp/config');

module.exports = function(config) {
    config.set({
        basePath: '.',
        files: [
            { pattern: './test/**/*.js' }
        ],
        browsers: [
            'PhantomJS'
            // 'Chrome',
            // 'Firefox',
            // 'Safari',
            // 'Internet Explorer',
        ],
        preprocessors: {
            './test/**/*.js': [ 'browserify' ]
        },
        frameworks: [ 'browserify', 'mocha', 'chai', 'sinon' ],
        browserify: {
            debug: true,
            insertGlobals: true,
            paths: [ gulpConfig.paths.js ],
            transform: [
                // 'browserify-shim'
            ],
            configure: function(bundler) {
                bundler.on('prebundle', function() {
                    gulpConfig.js.vendors.requires.forEach(function(vendor) {
                        bundler.external(vendor);
                    });
                });
            }
        },
        client: {
            mocha: {
                ui: 'bdd'
            }
        },
        logLevel: config.LOG_INFO,
        browserNoActivityTimeout: 100000,
        port: 9876,
        autoWatch: true,
        singleRun: true,
        colors: true
    });
};
