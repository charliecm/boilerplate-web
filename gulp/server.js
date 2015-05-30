/**
 * Development Server
 */

'use strict';

var gulp = require('gulp'),
    server = require('gulp-webserver'),
    config = require('./config');

gulp.task('server:dev', function() {
    return gulp.src(config.server.dev.root)
        .pipe(server(config.server.dev));
});

gulp.task('server:dist', function() {
    return gulp.src(config.server.dist.root)
        .pipe(server(config.server.dist));
});
