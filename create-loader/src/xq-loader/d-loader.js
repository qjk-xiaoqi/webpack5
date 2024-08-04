module.exports = function (source) {
  console.log('d-loader')
  return source
}

module.exports.pitch = function (remainingRequest, previousRequest, data) {
  console.log('d-pitch-loader')
  return 1
}
