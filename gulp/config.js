/**
 * Gulp Config
 */

'use strict';

var collapse = require('bundle-collapser/plugin');

var config = module.exports = {};

config.paths = {
    src: './src/',
    dist: './dist/',
    temp: './temp/',
    assets: './assets/',
    css: './src/css/',
    js: './src/js/',
    fonts: './src/fonts/',
    images: './src/images/'
};

config.server = {
    dev: {
        root: config.paths.src,
        port: 8070,
        livereload: true
    },
    dist: {
        root: config.paths.dist,
        port: 8071
    }
};

config.css = {
    src: config.paths.css + '*.sass',
    dest: config.paths.css,
    autoprefixer: [
        'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7'
    ]
};

config.icons = {
    src: config.paths.assets + 'icons/*.svg',
    destSASS: config.paths.css + 'components/',
    destHTML: config.paths.assets,
    destFonts: config.paths.fonts,
    templateSASS: config.paths.assets + 'icons.tpl.sass',
    templateHTML: config.paths.assets + 'icons-preview.tpl.html',
    sassName: '_icon.sass',
    htmlName: 'icons-preview.html',
    options: {
        fontName: 'icon',
        fixedWidth: false,
        centerHorizontally: false,
        normalize: true,
        descent: 12,
        fontHeight: 96,
        round: 3,
        appendCodepoints: true
    },
    templateOptions: {
        fontName: 'icon',
        baseClass: 'icon',
        classPrefix: 'icon-',
        fontPath: '../src/fonts/',
        sizes: [ 16, 24, 32, 48, 64, 72, 96 ]
    }
};

config.js = {
    lint: [
        './test/**/*.js',
        config.paths.js + '**/*.js'
    ],
    watch: {
        debug: true,
        insertGlobals: true,
        fullPaths: true,
        transform: [
            // 'browserify-shim'
        ]
    },
    vendors: {
        name: 'vendors.js',
        dest: config.paths.js,
        requires: [
            // TODO: Add vendors
        ],
        options: {
            transform: [
                // [ 'browserify-shim', {
                //     global: true
                // } ],
                [ 'uglifyify', {
                    global: true,
                    ignore: [
                        '**/*.min.js'
                    ]
                } ]
            ]
        }
    },
    app: {
        name: 'app.js',
        dest: config.paths.dist + 'js/',
        destDev: config.paths.js,
        options: {
            entries: config.paths.js + 'app/main.js',
            paths: [ config.paths.js ]
        },
        build: {
            transform: [
                // 'browserify-shim',
                [ 'stripify', {
                    replacement: '(0)'
                } ],
                [ 'uglifyify', {
                    ignore: [
                        '**/*.min.js'
                    ]
                } ]
            ],
            plugin: [ collapse ]
        }
    }
};
