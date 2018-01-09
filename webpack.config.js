"use strict";

var glob = require('glob');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    // to automatically find tsconfig.json
    context: __dirname, 

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    // get all js files for boundle
    entry: glob.sync('./src/**/*.ts'),

    output: {
        path: __dirname + '/dist',
        filename: 'inpage.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', 'js']
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]

};
