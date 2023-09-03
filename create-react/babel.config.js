// babel.config.js
const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead',
        useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
        corejs: 3, // 使用 core-js@3 版本
      },
    ],
    ['@babel/preset-typescript'],
    ['@babel/preset-react'],
  ],
  plugins: [
    isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件

    // ...
  ].filter(Boolean),
}
