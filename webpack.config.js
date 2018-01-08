"use strict";

var glob = require('glob');

module.exports = {

    // get all js files for boundle
    entry: glob.sync('./src/**/*.js'),

    output: {
        path: __dirname + '/dist',
        filename: 'inpage.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    }

};
