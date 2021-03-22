const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './public',
    // host: '0.0.0.0', // ip 访问
    open: true,
    port: 3000,
    overlay: true, // 浏览器直接显示命令行的错误
    hot: true,
    historyApiFallback: true,
    // hotOnly: true,
  },
  // target: 'web', // webpack5.x 加上之後熱更新才有效果
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            limit: 10240,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
