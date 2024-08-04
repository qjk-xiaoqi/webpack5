module.exports = function (source, sourceMap, data) {
  console.log(data, 'b-loader')
  return source
}

module.exports.pitch = function () {
  console.log('b-pitch-loader')
}
