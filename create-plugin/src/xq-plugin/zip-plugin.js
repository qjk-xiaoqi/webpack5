const jsZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource

const zip = new jsZip()

const PLUGIN_NAME = 'ZipPlugin'

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    // complier.hooks.emit.tap(PLUGIN_NAME, this.onBeforeRun.bind(this))
    complier.hooks.emit.tapAsync(PLUGIN_NAME, this.generatorZip.bind(this))
  }

  async generatorZip(compilation, cb) {
    const folder = zip.folder(this.options.fileName)
    console
    // compilation.assets: 是一个包含 compilation 中所有资源(assets)的对象。
    // 该对象的键是资源的路径，
    // 值是文件的源码
    for (let filePath in compilation.assets) {
      const source = compilation.assets[filePath].source
      // console.log(source, 'source->>')
      folder.file(filePath, source)
    }

    zip.generateAsync({ type: 'nodebuffer' }).then(content => {
      const outputPath = path.join(compilation.options.output.path, this.options.fileName + '.zip')
      console.log(outputPath, 'outputPath->>')

      const outputRelativePath = path.relative(compilation.options.output.path, outputPath)
      console.log(outputRelativePath, 'outputRelativePath->>')
      // console.log(compilation.options, 'options->>>>')
      compilation.assets[outputRelativePath] = new RawSource(content)
      cb()
    })
  }
}
