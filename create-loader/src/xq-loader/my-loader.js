module.exports = function (source) {
  // 在这里按照你的需求处理 source
  // 可以通过 this.getOptions 或者 this.query 来获取参数
  const options = this.getOptions()
  // console.log(options)
  const result = source.replace('wp', 'xiaoqi')
  this.callback(null, result)
}
