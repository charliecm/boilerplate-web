'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    path = require('path'),
    karma = require('karma').server,
    config = require('./config');

// Run unit tests using Karma
function runTests(done, isWatch) {
    var config = path.resolve(__dirname, '../karma.conf.js');
    karma.start({
        configFile: config,
        singleRun: !isWatch,
        autoWatch: (isWatch === true)
    }, (!isWatch ? done : null));
}

// Run jshint
gulp.task('jshint', function() {
    return gulp.src(config.js.lint)
        .pipe(jshint())
        .pipe(jshint.reporter('unix'));
});

gulp.task('test', function(done) {
    return runTests(done);
});

gulp.task('watch:test', function(done) {
    return runTests(done, true);
});
