const path = require('path')
const fs = require('fs')
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
    fs.writeFileSync(path.join(process.cwd(), 'src/images/sprite.jpg'), result.image)
    // 替换原引入为合成图片的路径
    source = source.replace(/url\((\S*)\?__sprite/g, () => {
      return `url('./images/sprite.jpg'`
    })
    callback(null, source)
  })
}
