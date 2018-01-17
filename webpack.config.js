var glob = require('glob');
//var path = require('path');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var entryJsFiles = glob.sync('./src/**/libs/*.js');
var entryTsFiles = glob.sync('./src/**/*.ts');
var entryFiles = entryJsFiles.concat(entryTsFiles);
var entryCssFiles = glob.sync('./src/**/*.css');


module.exports = {
    // to automatically find tsconfig.json
    context: __dirname, 

    // enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    // get all files for boundles
    entry: {
        'inpage.js': entryFiles,
        'inpage.min.js': entryFiles,
        'inpage.min.css': entryCssFiles
    },

    output: {
        filename: '[name]',
        path: __dirname + '/dist'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
                }
            },
            {
                test: /\.css$/,
                include: /src/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract([{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }])
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../../[name].[ext]' // create images on same relative path with same name
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../lib/fonts/[name].[ext]?09.14.00'  // create images on same relative path with same name
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.css']
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new ExtractTextPlugin('inpage.min.css'),
        new UglifyJsPlugin({
            include: /\.min\.js$/
        }),
        new FileManagerPlugin({
            onStart: [
                {
                    delete: [
                        './dist/*'
                    ]
                }
            ],
            onEnd: [
                {
                    copy: [
                        { source: './dist/inpage.min.css', destination: './dist/inpage.css' }, // just copy min because can't generate full and minified css boundle files in one pass
                        { source: './dist/inpage.min.css.map', destination: './dist/inpage.css.map' }, // just copy min because can't generate full and minified css.map boundle files in one pass
                        { source: './dist/*', destination: '../x/inpage' },
                        { source: './dist/*', destination: '../2SexyContent/Web/DesktopModules/ToSIC_SexyContent/dist/inpage' }
                    ]
                }
            ]
        })
    ]
};
