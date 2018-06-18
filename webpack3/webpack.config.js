const webpack = require('webpack')
module.exports = {
  entry: {
    'pages/page1': './pages/page1',
    'pages/page2': './pages/page2',
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