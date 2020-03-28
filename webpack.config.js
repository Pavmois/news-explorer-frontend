const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const DIST_DIR = path.resolve(__dirname, './dist');
const IMAGES_DIR = path.join(__dirname, './src/images');
const FONTS_DIR = path.join(__dirname, './src/vendor/fonts');


module.exports = {
  devServer: {
    port: 4200,
    stats: 'errors-only',
  },
  entry: {
    index: './src/index.js',
    articles: './src/articles.js'
  },
  output: {
    path: DIST_DIR,
    filename: './js/[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      'images': IMAGES_DIR,
      'fonts': FONTS_DIR
    },
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|jpg|svg|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './images/',
                esModule: false,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                svgo: {
                  enabled: true,
                },
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=./fonts/[name].[ext]'
        },
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: './index.html',
      minify: {
        removeComments:true,
        collapseWhitespace: isProd
      },
      chunks: [
        'index',
      ],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/articles.html',
      filename: './articles.html',
      minify: {
        removeComments:true,
        collapseWhitespace: isProd
      },
      chunks: [
        'articles',
      ],
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    })
  ],
};