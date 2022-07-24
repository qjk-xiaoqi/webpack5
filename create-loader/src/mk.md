## 如何编写一个 mark loader

### 新建 md 文件

在 src 目录下创建 mk.md

### 新建 loader

在 xq-loader 下面创建 mark-loader.js

```
const MarkdownIt = require('markdown-it')
module.exports = function (source) {
const options = this.getOptions()
const md = new MarkdownIt({
html: true,
...options,
})

const html = md.render(source)
html = `module.exports = ${JSON.stringify(html)}`
this.callback(null, html)
}

```

### 使用 loader

在 webpack.config.js 的 module 中添加这个 loader

```
{
  module: {
    rules:[
      {
            test: /\.md$/,
            use: [
              {
                loader: 'mark-loader',
              },
            ],
          },
      }
    ]
  }
}

```

### 运行

运行 npm run build，打开 dist 下面的 index.html,即可看到 md 文件被转换为 html 渲染出来。

### 美化 md 样式

以上我们简单实现了一个
