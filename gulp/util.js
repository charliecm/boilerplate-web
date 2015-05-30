/**
 * Utilities
 * For building gulp plugins.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');

var util = module.exports = {};

// Creates the path to file
util.mkpath = function(file, callback) {
    var dir = path.dirname(file);
    return mkdirp(dir, function(err) {
        callback(err);
    });
};

// Creates the path to file synchronously
util.mkpathSync = function(file) {
    var dir = path.dirname(file);
    return mkdirp.sync(dir);
};

// Creates a file and the path to it
util.writeTo = function(file, content, callback) {
    return util.mkpath(file, function(err) {
        if (err) {
            callback(err);
        } else {
            fs.writeFile(file, content, function(err) {
                callback(err);
            });
        }
    });
};
