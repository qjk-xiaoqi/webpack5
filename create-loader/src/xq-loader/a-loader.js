module.exports = function (source, sourceMap, data) {
  console.log('a-loader')
  if (!data) {
    data = {}
  }
  data.name = 'xiaoqi'
  this.callback(null, source, sourceMap, data)
}

module.exports.pitch = function () {
  console.log('a-pitch-loader')
}
