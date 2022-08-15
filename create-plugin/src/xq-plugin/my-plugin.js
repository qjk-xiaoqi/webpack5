const PLUGIN_NAME = 'MyPlugin'
class MyPlugin {
  constructor(options) {
    this.options = options
  }
  apply(complier) {
    console.log(complier, 'complier->>>')
    // complier.hooks.emit.tap(PLUGIN_NAME, this.onBeforeRun.bind(this))
    complier.hooks.emit.tapPromise(PLUGIN_NAME, this.onBeforeRun.bind(this))
  }

  async onBeforeRun(compilation) {
    console.log(compilation, 'compilation')
    console.log('开始-》》》》》》')
  }
}

module.exports = MyPlugin
