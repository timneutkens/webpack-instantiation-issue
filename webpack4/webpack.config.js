module.exports = {
  entry: {
    'pages/page1': './pages/page1',
    'pages/page2': './pages/page2',
  },
  optimization: {
    minimizer: [],
    splitChunks: {
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        default: false,
        commons: {
          reuseExistingChunk: true,
          name: 'commons',
          filename: 'commons.js',
          chunks: 'all',
          minChunks: 1,
          enforce: true
        }
      }
    }
  }
}