"use strict";

var glob = require("glob");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var FileManagerPlugin = require("filemanager-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var entryJsFiles = glob.sync("./src/**/libs/*.js");
var entryTsFiles = glob.sync("./src/**/*.ts");
var entryFiles = entryJsFiles.concat(entryTsFiles);

module.exports = {
    // to automatically find tsconfig.json
    context: __dirname, 

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    // get all files for boundle
    entry: entryFiles,

    output: {
        path: __dirname + '/dist',
        filename: 'inpage.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader?limit=1024"
                }
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new ExtractTextPlugin({
            filename: "inpage.css",
            allChunks: true
        }),
        new FileManagerPlugin({
            onStart: [
                {
                    delete: [
                        "./dist/*"
                    ]
                }
            ],
            onEnd: [
                {
                    copy: [
                        { source: "./dist/*", destination: "../x/inpage" },
                        //{ source: "./dist/*", destination: "../2SexyContent/Web/DesktopModules/ToSIC_SexyContent/dist/inpage" }
                    ]
                }
            ]
        })
    ]

};
