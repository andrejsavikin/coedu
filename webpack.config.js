var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/client/app.jsx',
  output: { path: __dirname + '/dist/js/', filename: 'app.min.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};