const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      console: require.resolve("console-browserify"),
      assert: false,
      util: false,
    }
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};