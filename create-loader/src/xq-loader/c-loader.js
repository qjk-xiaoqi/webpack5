module.exports = function (source) {
  console.log('c-loader')
  return source
}

module.exports.pitch = function () {
  console.log('c-pitch-loader')
}
