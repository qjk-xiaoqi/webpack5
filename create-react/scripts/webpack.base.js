const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/imgs/[name].[hash:8][ext]',
        },
        // use: [
        //   // {
        //   //   loader: 'file-loader',
        //   // },
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 2000,
        //       // //限制打包图片的大小：
        //       // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
        //       // name: 'img/[name].[hash:8].[ext]',
        //       // //img:图片打包的文件夹；
        //       // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
        //       // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
        //     },
        //   },
        // ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource', // 字体图标不能转化为base64, 这里使用 asset/resource
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 25 * 1024, // 25kb
        //   },
        // },
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    // 自动引入打包之后的资源
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
  ],
}
