/**
 * CSS
 * Transforms SASS to CSS.
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    cssmin = require('gulp-cssmin'),
    config = require('./config');

// Compile SASS, then autoprefix and minify them
gulp.task('sass', [ 'icons' ], function() {
    return gulp.src(config.css.src)
        .pipe(sass({
            style: 'compressed'
        }))
        .on('error', notify.onError('<%= error.message %>'))
        .pipe(autoprefixer({
            browsers: config.css.autoprefixer
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(config.css.dest))
        .pipe(notify('SASS compiled: <%= file.path %>'));
});

gulp.task('css', [ 'sass' ]);
