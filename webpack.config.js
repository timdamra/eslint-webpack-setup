const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: extractSass.extract({
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: true,
        //       },
        //     },
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: true,
        //       },
        //     },
        //   ],
        //   // use style-loader in development
        //   fallback: 'style-loader',
        // }),
      },
    ],
  },
  plugins: [
    new cleanPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new SWPrecacheWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    historyApiFallback: true,
  },
};
