const path = require('path')
const MyPlugin = require('./src/xq-plugin/my-plugin')
const ZipPlugin = require('./src/xq-plugin/zip-plugin')

module.exports = {
  mode: 'development', // 以什么模式进行打包
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后的代码放在dist目录下
    filename: 'bundle.js', // 文件名为 bundle.js
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    // new MyPlugin(),
    new ZipPlugin({
      fileName: 'offline',
    }),
  ],
}
