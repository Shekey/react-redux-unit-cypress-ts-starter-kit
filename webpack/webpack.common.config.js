const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const path = require('path');

module.exports = {
  entry: [`${paths.src}/index.tsx`],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        { from: 'public/manifest', to: 'manifest' }
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Indevitus',
      template: `${paths.public}/index.html`,
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "@/assets/scss/variables";`
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@root': path.resolve(__dirname, '../'),
      '@core': path.resolve(__dirname, '../src/components/core'),
      '@common': path.resolve(__dirname, '../src/components/common'),
      '@feature': path.resolve(__dirname, '../src/components/feature'),
      '@global': path.resolve(__dirname, '../src/components/global'),
      '@shared': path.resolve(__dirname, '../src/components/shared')
    }
  },
};
