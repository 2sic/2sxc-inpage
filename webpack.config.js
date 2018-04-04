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
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
// var path = require('path');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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

if (!isProd) {
  // development
  plugins.push(
    new UglifyJsPlugin(
      {
        include: /\.min\.js$/,
        sourceMap: true
      }));
  plugins.push(new FileManagerPlugin(
    {
      onStart: [
        {
          delete: [
            './dist/inpage/*.js'
          ]
        }
      ],
      onEnd: [
        {
          copy: [
            { source: './dist/inpage/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage' }
          ]
        }
      ]
    }));
} else {
  // production
  plugins.push(
    new UglifyJsPlugin(
      {
        include: /\.min\.js$/,
        sourceMap: false
      }));
  plugins.push(new ExtractTextPlugin('./inpage/inpage.min.css'));
  plugins.push(new FileManagerPlugin(
    {
      onStart: [
        {
          delete: [
            './dist/inpage/*.js'
          ]
        }
      ],
      onEnd: [
        {
          copy: [
            { source: './dist/inpage/inpage.min.css', destination: './dist/inpage/inpage.css' }, // just copy min because can't generate full and minified css boundle files in one pass
            { source: './dist/inpage/inpage.min.css.map', destination: './dist/inpage/inpage.css.map' }, // just copy min because can't generate full and minified css.map boundle files in one pass
            { source: './dist/inpage/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage' },
            { source: './dist/assets/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage/assets' }
          ]
        }
      ]
    }));
}

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

  resolve: { extensions: ['.ts', '.js'] },

  plugins: plugins
}

if (isProd) {
  config.entry['inpage/inpage.min.css'] = entryCssFiles;
  config.resolve.extensions.push('.css');
  config.module.rules.push({
    test: /\.css$/,
    include:  [/src/,/icons/],
    use: ExtractTextPlugin.extract([{
      loader: 'css-loader',
      options: {
        minimize: true,
        sourceMap: true,
        name: './inpage/[name].[ext]'
      }
    }])
  });
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
}

module.exports = config;
