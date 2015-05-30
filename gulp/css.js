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
    connect = require('gulp-connect'),
    pipeIf = require('gulp-if'),
    config = require('./config');

// Compile SASS, then autoprefix and minify them
function compileSass(isWatch) {
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
        .pipe(pipeIf(isWatch, connect.reload()))
        .pipe(notify('SASS compiled!'));
}

gulp.task('sass', [ 'icons' ], function() {
    return compileSass();
});

gulp.task('watch:sass', function() {
    return compileSass(true);
});

gulp.task('css', [ 'sass' ]);
