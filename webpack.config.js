const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },

  output: {
    path: outputPath,
    filename: 'static/js/[name].[hash].bundle.js',
    publicPath: '/',
  },

  devServer: {
    contentBase: outputPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
}