/**
 * CSS
 * Transforms SASS to CSS.
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    connect = require('gulp-connect'),
    pipeIf = require('gulp-if'),
    config = require('./config');

// Compile SASS, then autoprefix and minify them
function compileSass(isWatch) {
    return gulp.src(config.css.src)
        .pipe(sass({
            style: 'compressed',
            indentedSyntax: true
        }))
        .pipe(autoprefixer({
            browsers: config.css.autoprefixer
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(config.css.dest))
        .pipe(pipeIf(isWatch, connect.reload()));
}

gulp.task('sass', [ 'icons' ], function() {
    return compileSass();
});

gulp.task('watch:sass', function() {
    return compileSass(true);
});

gulp.task('css', [ 'sass' ]);
