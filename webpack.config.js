/* webpack static module bundler

After bounding, it will copy of all files from **./dist/** to **C:/Projects/2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage folder.
Supports bundling for Development or Production (depending on process.env.NODE_ENV, but 'development' is default).

Development
- currently bundles only ts & js files to support watch mode
- bundling of *.css, and other assets is skipped

Production
- bundles all ts/js and css files
- currently all css files are minimized (only min.css have to be minimized)
- copy 4 icon*.png images to C:\Projects as side effect of Run-Production, so that link reference in css file are correctly pointing to C:\Projects\2sxc-dnn742\Website\DesktopModules\ToSIC_SexyContent
- currently do not work in watch mode

TypeDoc
Documentation can be auto-generated in ./docs folder, but you have to change variable enerateTypedocDocumentation* to true.
For faster webpack execution during development it is not enabled by default.
*/

var webpack = require('webpack');
var glob = require('glob');
// var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var merge = require('webpack-merge');

var entryJsFiles = glob.sync('./src/**/libs/*.js');
var entryTsFiles = glob.sync('./src/**/*.ts');
var entryFiles = entryJsFiles.concat(entryTsFiles);
var entryCssFiles = glob.sync('./src/**/*.css').concat(['./icons/css/inpage-icons-codes.css']);

var nodeEnv = (process.env.NODE_ENV || 'development');
var isProd = (nodeEnv === 'production');
var generateTypedocDocumentation = false;

var package = require('./package.json');
var version = package.version;

var plugins = [

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),

  new ForkTsCheckerWebpackPlugin()

];

var config = {
  // to automatically find tsconfig.json
  context: __dirname,

  // enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // get all files for boundles
  entry: {
    './inpage/inpage.js': entryFiles,
    './inpage/inpage.min.js': entryFiles
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
        }
      }
    ]
  },

  resolve: { extensions: ['.ts', '.js', '.css'] },

  plugins: plugins
}

if (!isProd) {
  // development

  plugins.push(
    new UglifyJsPlugin(
      {
        include: /\.min\.js$/,
        sourceMap: true
      }));

  plugins.push(new ExtractTextPlugin('./inpage/inpage.css'));

} else {
  // production

  plugins.push(
    new UglifyJsPlugin(
      {
        include: /\.min\.js$/,
        sourceMap: true
      }));

  plugins.push(new ExtractTextPlugin('./inpage/inpage.min.css'));
}

plugins.push(new FileManagerPlugin(
  {
    onStart: [
      {
        delete: [
          //'./dist/inpage/*.js'
        ]
      }
    ],
    onEnd: [
      {
        copy: [
          { source: './dist/inpage/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage' },
          { source: './dist/assets/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage/assets' }
        ],
        delete: [
          //'./dist/inpage/inpage.css.map',
          //'../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage/inpage.css.map'
        ]
      }
    ]
  }));

if (generateTypedocDocumentation) {

  plugins.push(new TypedocWebpackPlugin({
    name: '2sxc-inpage',
    mode: 'modules',
    includeDeclarations: true,
    ignoreCompilerErrors: true,
    out: '../docs',
    module: 'commonjs',
    target: 'es5',
    exclude: '**/node_modules/**/*.*',
    experimentalDecorators: true,
    excludeExternals: true,
    extends: './tsconfig.json'
  }, entryTsFiles));

}

if (!isProd) {

  config.entry['./inpage/inpage.css'] = entryCssFiles;

  config.module.rules.push({
    test: /\.css$/,
    include: [/src/, /icons/],
    use: ExtractTextPlugin.extract(
      [
        {
          loader: 'css-loader',
          options: {
            minimize: false,
            sourceMap: true,
            name: './inpage/[name].[ext]'
          }
        }
      ])
  });

} else {

  config.entry['./inpage/inpage.min.css'] = entryCssFiles;

  config.module.rules.push({
    test: /\.css$/,
    include: [/src/, /icons/],
    use: ExtractTextPlugin.extract([{
      loader: 'css-loader',
      options: {
        minimize: true,
        sourceMap: true,
        name: './inpage/[name].[ext]'
      }
    }])
  });

}

config.module.rules.push({
  test: /\.png$/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
    options: {
      name: '../../[name].[ext]' // copy 4 icon*.png images to C:\Projects as side effect of Run-Production, so that link reference in css file are correctly pointing to C:\Projects\2sxc-dnn742\Website\DesktopModules\ToSIC_SexyContent
    }
  }
});

config.module.rules.push({
  test: /\.(woff|eot|ttf)$/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]?' + version // package.json version
    }
  }
});

module.exports = config;
