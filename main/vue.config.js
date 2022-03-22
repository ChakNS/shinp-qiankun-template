const { defineConfig } = require('@vue/cli-service')
const microApps = require('./apps')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].MICRO_APPS = JSON.stringify(microApps)
      return args
    })
  },
})
