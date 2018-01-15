var glob = require('glob');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var entryJsFiles = glob.sync('./src/**/libs/*.js');
var entryTsFiles = glob.sync('./src/**/*.ts');
var entryCssFiles = glob.sync('./src/**/*.css');
var entryFiles = entryJsFiles.concat(entryTsFiles);

module.exports = {
    // to automatically find tsconfig.json
    context: __dirname, 

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    // get all files for boundle
    entry: entryFiles,
    //entry: entryCssFiles,

    output: {
        filename: 'inpage.js',
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
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../../[name].[ext]' // check the path
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../lib/fonts/[name].[ext]?09.14.00' // check the path
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
        new ExtractTextPlugin({
            allChunks: false,
            filename: 'inpage.css'
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
                        { source: './dist/*', destination: '../x/inpage' },
                        //{ source: "./dist/*", destination: "../2SexyContent/Web/DesktopModules/ToSIC_SexyContent/dist/inpage" }
                    ]
                }
            ]
        })
    ]

};
