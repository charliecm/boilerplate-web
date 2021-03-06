/**
 * Gulpfile
 */

'use strict';

require('./gulp/server');
require('./gulp/icons');
require('./gulp/css');
require('./gulp/js');
require('./gulp/test');

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    sequence = require('run-sequence'),
    del = require('del'),
    config = require('./gulp/config');

// Clean up for build
gulp.task('clean', function(done) {
    return del([
        config.paths.dist
    ], function(err) {
        if (err) {
            throw new gutil.PluginError('clean:del', err);
        }
        done();
    });
});

// Copy files to distribution folder
gulp.task('copy', function() {
    // CSS
    gulp.src(config.paths.css + '*.css')
        .pipe(gulp.dest(config.paths.dist + 'css/'));
    // JS
    gulp.src([
            config.paths.js + '*.js',
            '!' + config.js.app.dest + config.js.app.name
        ])
        .pipe(gulp.dest(config.paths.dist + 'js/'));
    // Everything else
    return gulp.src([
            config.paths.src + '**/*',
            '!' + config.paths.css + '**/*',
            '!' + config.paths.js + '**/*'
        ])
        .pipe(gulp.dest(config.paths.dist))
        .pipe(notify({
            message: 'Build completed!',
            onLast: true
        }));
});

// Watch (default)
gulp.task('default', [ 'server:dev', 'sass', 'vendors' ], function() {
    // Icons
    watch(config.icons.src, function() {
        gulp.start('icons');
    });
    // CSS
    watch(config.paths.src + '**/*.{sass,scss}', function() {
        gulp.start('watch:css');
    });
    // JS
    gulp.start('watch:js');
    gulp.start('watch:test');
});

// Server
gulp.task('server', function(done) {
    sequence('build', 'server:dist', done);
});

// Build
gulp.task('build', function(done) {
    sequence('clean', [ 'css', 'js' ], 'copy', done);
});
