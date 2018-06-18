const webpack = require('webpack')
module.exports = {
  entry: {
    'page1': './src/page1',
    'page2': './src/page2',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 1
    })
  ]
}