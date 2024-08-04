const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  console.log('my-async-loader', this.data.id)

  // 通过 this.async 来返回一个异步函数，第一个参数 Error, 第二个参数是处理的结果。
  const callback = this.async()
  fs.readFile(path.join(__dirname, '../async.txt'), 'utf-8', (err, data) => {
    const html = `module.exports = ${JSON.stringify(data)}`
    callback(null, html)
  })
}

module.exports.pitch = function (remainingRequest, previousRequest, data) {
  data.id = '010101'
  console.log('my-async-pitch-loader')
  console.log('my-async-pitch-loader-remainingRequest:', remainingRequest)
  console.log('my-async-pitch-loader-previousRequest:', previousRequest)
}
