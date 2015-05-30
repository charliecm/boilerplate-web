/**
 * Icons
 * Generates font icons from SVGs.
 */

'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    assign = require('lodash.assign'),
    through2 = require('through2'),
    crypto = require('crypto'),
    config = require('./config');

// Converts SVG to icon fonts, and generates SASS and HTML preview
gulp.task('icons', function() {
    var md5 = crypto.createHash('md5');
    return gulp.src(config.icons.src)
        .pipe(through2.obj(function(chunk, enc, callback) {
            // Update hash based on SVG content
            md5.update(chunk.contents);
            callback(null, chunk);
        }))
        .pipe(iconfont(config.icons.options))
        .on('codepoints', function(codepoints, options) {
            var glyphs = codepoints.map(function(icon) {
                return {
                    name: icon.name,
                    code: icon.codepoint.toString(16)
                };
            });
            md5.update(JSON.stringify(options));
            // CSS
            gulp.src(config.icons.templateSASS)
                .pipe(consolidate('swig', assign({}, config.icons.templateOptions, {
                    glyphs: glyphs,
                    hash: md5.digest('hex')
                })))
                .pipe(rename(config.icons.sassName))
                .pipe(gulp.dest(config.icons.destSASS));
            // Preview HTML
            gulp.src(config.icons.templateHTML)
                .pipe(consolidate('swig', assign({}, config.icons.templateOptions, {
                    glyphs: glyphs
                })))
                .pipe(rename(config.icons.htmlName))
                .pipe(gulp.dest(config.icons.destHTML));
        })
        .pipe(gulp.dest(config.icons.destFonts));
});
