/**
 * Development Server
 */

'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    config = require('./config');

gulp.task('server:dev', function() {
    connect.server(config.server.dev);
});

gulp.task('server:dist', function() {
    connect.server(config.server.dist);
});
