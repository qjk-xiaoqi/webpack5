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
          },
        ],
      },
      // {
      //   test: /\.txt$/,
      //   use: {
      //     loader: 'my-async-loader',
      //   },
      // },
      // start ---Loader 顺序----
      {
        test: /\.txt$/,
        use: {
          loader: 'a-loader',
        },
        enforce: 'pre',
      },
      {
        test: /\.txt$/,
        use: {
          loader: 'c-loader',
        },
        enforce: 'post',
      },
      {
        test: /\.txt$/,
        use: [
          {
            loader: 'd-loader',
          },
          {
            loader: 'b-loader',
          },
        ],
      },
      // end ---Loader 顺序----
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
