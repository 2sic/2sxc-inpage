"use strict";

var glob = require('glob');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

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
        //new CopyWebpackPlugin([
        //    // Copy glob results to /absolute/path/
        //    //{ from: '/dist/**/*', to: 'c:\\Projects\\2SexyContent\\Web\\DesktopModules\\ToSIC_SexyContent\\dist\\inpage\\' },
        //    // Copy glob results to /absolute/path/
        //    { from: __dirname + '/dist/**/*', to: 'c:/Projects/x/inpage' }
        //])
    ]

};
