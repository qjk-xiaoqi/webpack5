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
