## 准备工作

### 初始化项目

新建一个文件夹 create-loader，在该目录执行以下命令来完成初始化工作。

```
npm init -y
```

### 安装依赖

安装 webpack 、webpack-cli 以及 webpack-dev-server。前两者打包必备；后者是一个提供热更新的开发服务器，对开发阶段友好。

```
pnpm add webpack webpack-cli webpack-dev-server --save-dev
```

### 创建入口文件

创建 src 目录，并创建 index.js 入口文件。

```js
// index.js
document.write('hello wp')
```

### 创建 webpack 配置文件 webpack.config.js

虽然 webpack v4 + 开箱即用，可以无需配置文件就可以打包，但 webpack 会默认打包入口文件为 src/index.js 文件，打包产物为 dist/main.js ，并且开启生产环境的压缩和优化。

但大多数的项目还是需要一些复杂的配置，配置文件 webpack.config.js 文件还是很有必要的 。 webpack 在打包时会自动识别这个文件，根据里面的配置来进行打包。

```js
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
```

Tips： 如果我们想更改为指定的配置文件 prod.config.js 来打包，可以使用`--config` 标志来修改。

```json
"scripts": {
  "build": "webpack --config prod.config.js"
}
```

### 添加 npm script

我们可以在 package.json 文件中创建快捷方试来启动开发和打包。

```json
{
  // ...省略
  "main": "src/index.js", // 修改入口文件
  "scripts": {
    "dev": "webpack serve --open",
    "build": "webpack"
  }
  // ...省略
}
```

这样可以通过 npm run dev 来启动项目：

使用 npm run build 可以实现打包：

可以看到生成了一个 dist 目录，里面有一个 bundle.js 文件。

### 创建 index.html 文件

上面打包的产物只有一个 js 文件，我们想要使用浏览器访问里面的内容就要手动创建一个 html 文件，并引入 bundle.js 脚本文件，使用浏览器打开即可。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
  </body>
</html>
```

以上的步骤简单的完成了一个基于 webpack 打包的最简单例子。

## 编写一个简单的 loader

### 为什么需要 loader

webpack 本身只能识别 js 和 json 文件，对于 css、ts 等其他文件就需要 loader 对齐进行处理，转换为 webpack 能识别的模板。

### loader 是什么

loader 是一个导出为函数的 JavaScript 模块，用于对模块的源码进行转换。形如：

```js
moudle.exports = (source) => {
  // 按照自己的转换要求进行处理
  return source
}
```

### loader 原则

- 单一： 一个 loader 只做一件事。
- 链式调用：从右往左依次调用。
- 模块化：保证输出的是模块化。
- 无状态： 每一个 loader 的运行相对独立，不与其他 loader
- loader-utils 工具库： 提供了很多工具
-

### 编写一个简单的 loader

在上面例子的基础上我们来编写一个简单的字符串替换 loader、

#### 创建 loader

在 src 下创建 xq-loader 目录，创建 my-loader.js 文件。

```js
// my-loader.js
module.exports = function (source) {
  // 在这里按照你的需求处理 source
  // 可以通过 this.getOptions 或者 this.query 来获取参数
  const options = this.getOptions()
  console.log(options)
  return source.replace('wp', 'xiaoqi')
}

// 或者 使用this.callback
module.exports = function (source) {
  // 在这里按照你的需求处理 source
  // 可以通过 this.getOptions 或者 this.query 来获取参数
  const options = this.getOptions()
  const result = source.replace('wp', 'xiaoqi')
  this.callback(null, result)
}
```

这里编写的是一个简单的同步 loader，我们可以通过 return 一个表示已转换模块的单一值。如果情况比较复杂，也可以通过 this.callback(err,values...) 这个回调函数来返回转换后的结果。

```
this.callback(
// 转换异常时，抛出错误
err: Error || null,
// 转换后的结果
content: string | Buffer,
// 用于把转换后的内容得出原内容的 Source Map，方便调试
sourceMap?: SourceMap,
)
```

#### 使用 loader

在 webpack.config.js 中配置 loader 有两种方式。一种是 path.resolve ，另一种是 ResolveLoader。

- 使用 path.resolve 指定 loader 的文件路径

  ```js
  // webpack.config.js
  {
    // ...省略
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
      ],
    }
  }
  ```

- 使用 ResolveLoader

  ```json
  {
   module: {
      rules: [
        {
          test: /\.js$/,
          use: ['my-loader'],
        },
      ],
    },
    resolveLoader: {
      // webpack 将会从这些目录中依次搜索 loader,
      modules: ['node_modules', './src/xq-loader'],
    },
  }
  ```

运行 npm run dev 可以看到 wp 被替换为 xiaoqi 。

### 实现一个异步 loader

在某些耗时久的场景下，比如处理网络请求的结果，我们可以使用 异步 loader ，这样不会阻塞整个构建。

#### 创建 async.txt 文件

在 src 目录下创建 async.txt 文件，随便写点内容。

#### 创建异步 loader

在 src 下创建 xq-loader 目录，创建 my-async-loader.js 文件。该 loader 的功能为读取 async.txt 中的内容并返回。

```javascript
// my-async-loader.js
const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  // 通过 this.async 来返回一个异步函数，第一个参数 Error, 第二个参数是处理的结果。
  const callback = this.async()
  fs.readFile(path.join(__dirname, '../async.txt'), 'utf-8', (err, data) => {
    const html = `module.exports = ${JSON.stringify(data)}`
    callback(null, html)
  })
}
```

#### 添加 loader 配置

在 webpack.config.js 文件中的 module.rules 下添加 my-async-loader。

```javascript
// webpack.config.js
// ...
{
  test: /\.txt$/,
  use: {
  loader: 'my-async-loader',
  },
},
// ...
```

#### 引入 txt 文件

在 index.js 入口文件中引入。

```javascript
// index.js
import txt from './async.txt'
document.write('hello wp')
document.write(`</br>异步loader: ${txt}`)
```

#### 运行 || 打包

npm run dev 可以看到 async.txt 文件下的内容被打印出来。

### 实现一个渲染 markdown 的 loader

简易版 mark-loader，借助 markdown-it 库的能力。

#### 创建 md 文件

首先我们在 src 下创建一个 md 文件。

#### 编写 mark-loader

在 src 下创建 xq-loader 目录，创建 mark-loader.js 文件。

```javascript
// mark-loader.js
const MarkdownIt = require('markdown-it')
module.exports = function (source) {
  const options = this.getOptions()
  const md = new MarkdownIt({
    html: true,
    ...options,
  })

  let html = md.render(source)
  // webpack 无法直接去解析html模板，所以要返回一段 js 代码
  html = `module.exports = ${JSON.stringify(html)}`
  this.callback(null, html)
}
```

#### 添加配置 loader

```javascript
// webpack.config.js
{
  test: /\.md$/,
  use: [
    {
    loader: 'mark-loader',
    },
  ],
},
```

#### 引入 md 文件

创建一个 div ，将生成的 html 插入其中。

```javascript
import txt from './async.txt'
import md from './mk.md'

document.write('hello wp')
document.write(`</br>异步loader: ${txt}`)

const div = document.createElement('div')
div.innerHTML = `${md}`
document.body.appendChild(div)
```

#### 运行 || 打包

npm run dev 运行，可以看到 md 文件以 html 的形式渲染出来。

### 实现一个生成雪碧图的 loader

简易版 sprite-loader，借助 spritesmith 库的能力。

#### 创建 css 文件

首先我们在 src 下创建一个 css 文件，以 `?__sprite` 来标志是需要合成的图片。

#### 创建 sprite-loader

找到需要合成的图片，组合生成一个数组，再使用 spritesmith 的能力将多张图合并成一张图。

```javascript
const path = require('path')
const fse = require('fse')
const Spritesmith = require('spritesmith')

module.exports = function (source) {
  const callback = this.async()
  // 匹配 url(开头 ？__sprite 结尾的
  const imgs = source.match(/url\((\S*)\?__sprite/g)
  const matchImgs = []
  for (let i = 0; i < imgs.length; i++) {
    // 解析出图片路径
    const img = imgs[i].match(/url\((\S*)\?__sprite/)
    matchImgs.push(path.join('./src', img[1]))
  }
  Spritesmith.run({ src: matchImgs }, (err, result) => {
    // 将合成的图片写入到 src/images/sprite.jpg 中
    fse.writeFileSync(path.join(process.cwd(), 'src/images/sprite.jpg'), result.image)
    // 替换原引入为合成图片的路径
    source = source.replace(/url\((\S*)\?__sprite/g, () => {
      return `url('./images/sprite.jpg'`
    })
    callback(null, source)
  })
}
```

#### 添加 loader 配置

由于 webpack 没法识别 css 文件，这里先用 sprite-loader 合成图片；再调用 css-loader，它会帮我们对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样；最后调用 style-loader 帮我们将 css 代码以 `<style>`的形式插入到 DOM 中。

```js
// webpack.config.js
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'sprite-loader'],
},
```

#### 引入 css 文件

在 index.js 中引入 css 文件，给上述的 div 加上类名 img2。

```javascript
import './index.css'
import txt from './async.txt'
import md from './mk.md'
// ...
const div = document.createElement('div')
div.className = 'img2'
div.innerHTML = `${md}`
document.body.appendChild(div)
```

#### 运行 || 打包

可以看到背景图生效了，并且在 dist 下会生成一个图片文件。
