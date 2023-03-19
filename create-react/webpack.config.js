const path = require('path')

module.exports = {
  mode: 'development', // 以什么模式进行打包
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后的代码放在dist目录下
    filename: 'bundle.js', // 文件名为 bundle.js
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead',
                  // useBuiltIns: false,
                  // corejs: undefined,
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    static: './dist',
    port: 8080,
  },
}
