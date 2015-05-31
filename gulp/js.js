/**
 * JavaScript
 * Uses browserify to bundle vendor and app scripts.
 * https://github.com/substack/node-browserify
 * http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
 */

'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    assign = require('lodash.assign'),
    config = require('./config');

// Bundle app vendors
function bundleVendors() {
    var options = assign({}, watchify.args, config.js.vendors.options),
        dest = config.js.vendors.dest,
        bundler = browserify(options);
    config.js.vendors.requires.forEach(function(vendor) {
        bundler.require(vendor);
    });
    return bundler.bundle()
        .on('error', notify.onError('<%= error.message %>'))
        .pipe(source(config.js.vendors.name))
        .pipe(buffer())
        .pipe(gulp.dest(dest))
        .pipe(notify('Vendors compiled: <%= file.path %>'));
}

// Bundle app
function bundleApp(isWatch) {
    var options = assign({}, watchify.args, config.js.app.options, isWatch ? config.js.watch : config.js.app.build),
        dest = (isWatch ? config.js.app.destDev : config.js.app.dest),
        bundler = browserify(options)
            .on('error', notify.onError('<%= error.message %>'));
    config.js.vendors.requires.forEach(function(vendor) {
        bundler.external(vendor);
    });
    function bundle() {
        return bundler.bundle()
            .pipe(source(config.js.app.name))
            .pipe(gulp.dest(dest))
            .pipe(notify('App compiled: <%= file.path %>'));
    }
    if (isWatch) {
        bundler = watchify(bundler)
            .on('update', bundle)
            .on('log', function(msg) {
                gutil.log('bundleApp:', msg);
            });
    }
    return bundle();
}

gulp.task('vendors', function() {
    return bundleVendors();
});

gulp.task('jsApp', function() {
    return bundleApp();
});

gulp.task('watch:jsApp', function() {
    return bundleApp(true);
});

gulp.task('js', [ 'jsApp', 'vendors' ]);

gulp.task('watch:js', [ 'watch:jsApp' ]);
