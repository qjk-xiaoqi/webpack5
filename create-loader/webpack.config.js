const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './src/xq-loader/my-loader.js'),
            options: {
              name: 'xiaoqi',
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: {
          loader: 'my-async-loader',
        },
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'mark-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sprite-loader'],
      },
    ],
  },
  resolveLoader: {
    // webpack 将会从这些目录中依次搜索 loader,
    modules: ['node_modules', './src/xq-loader'],
  },
  // plugins: [new MiniCssExtractPlugin()],
}
