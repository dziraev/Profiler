const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash].js',
    publicPath: '/'
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /\.module\.(css|scss)$/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        include: /\.module\.scss$/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@buttonsLarge': path.resolve(__dirname, 'src/components/buttons/buttonsLarge'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@popUps': path.resolve(__dirname, 'src/components/popup'),
      '@cvCards': path.resolve(__dirname, 'src/components/cvCards'),
      '@validators': path.resolve(__dirname, 'src/utils/validators'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/redux/types.js'),
      '@actions': path.resolve(__dirname, 'src/redux/actions.js'),
      '@hoc': path.resolve(__dirname, 'src/hoc'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@cvSteps': path.resolve(__dirname, 'src/pages/CVsteps')
    }
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist']
        },
        onEnd: {
          copy: [
            {
              source: path.join('public'),
              destination: 'dist'
            }
          ]
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  devServer: {
    historyApiFallback: true,
    watchFiles: path.join(__dirname, 'src'),
    port: 9000
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }]
            ]
          }
        }
      })
    ]
  }
};
