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
