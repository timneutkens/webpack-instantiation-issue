module.exports = {
  entry: {
    'page1': './src/page1',
    'page2': './src/page2',
  },
  optimization: {
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