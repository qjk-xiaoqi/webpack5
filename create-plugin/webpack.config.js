const path = require('path')

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
}
