var webpack = require('webpack');
var glob = require('glob');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
// var path = require('path');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var entryJsFiles = glob.sync('./src/**/libs/*.js');
var entryTsFiles = glob.sync('./src/**/*.ts');
var entryFiles = entryJsFiles.concat(entryTsFiles);
var entryCssFiles = glob.sync('./src/**/*.css').concat(glob.sync('./icons/**/*.css'));
var nodeEnv = (process.env.NODE_ENV || 'development');
var isProd = (nodeEnv === 'production');
var generateTypedocDocumentation = false;

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
            './dist/*.js'
          ]
        }
      ],
      onEnd: [
        {
          copy: [
            { source: './dist/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage' }
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
  plugins.push(new ExtractTextPlugin('inpage.min.css'));
  plugins.push(new FileManagerPlugin(
    {
      onStart: [
        {
          delete: [
            './dist/*.js'
          ]
        }
      ],
      onEnd: [
        {
          copy: [
            { source: './dist/inpage.min.css', destination: './dist/inpage.css' }, // just copy min because can't generate full and minified css boundle files in one pass
            { source: './dist/inpage.min.css.map', destination: './dist/inpage.css.map' }, // just copy min because can't generate full and minified css.map boundle files in one pass
            { source: './dist/*', destination: '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage' }
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
    'inpage.js': entryFiles,
    'inpage.min.js': entryFiles
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
  config.entry['inpage.min.css'] = entryCssFiles;
  config.resolve.extensions.push('.css');
  config.module.rules.push({
    test: /\.css$/,
    include:  [/src/,/icons/],
    use: ExtractTextPlugin.extract([{
      loader: 'css-loader',
      options: {
        minimize: isProd,
        sourceMap: !isProd
      }
    }])
  });
  config.module.rules.push({
    test: /\.png$/,
    exclude: /node_modules/,
    use: {
      loader: 'file-loader',
      options: {
        name: '../../[name].[ext]' // create images on same relative path with same name
      }
    }
  });
  config.module.rules.push({
    test: /\.(woff|eot|ttf)$/,
    exclude: /node_modules/,
    use: {
      loader: 'file-loader',
      options: {
        name: '../lib/fonts/[name].[ext]?09.15.00'  // create images on same relative path with same name
      }
    }
  });
}

module.exports = config;
