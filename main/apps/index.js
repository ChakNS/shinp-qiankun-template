const fs = require('fs')
const path = require('path')

/**
 * 根据配置文件生成子应用的配置，子应用的路由名称与对应配置的文件名称相同
 * @param {string} dir 当前目录下的配置文件夹名称
 * @returns array [{ index, name, activeRule, ...对应文件的配置 }]
 */
const readAppsConf = function(dir) {
  const result = []
  const pathName = path.resolve(__dirname, dir)

  fs.readdirSync(pathName).forEach(filename => {
    const name = path.basename(filename, '.js')
    const conf = {
      name,
      activeRule: [`/${name}`, `/${name}/`]
    }

    const fileConf = require(path.resolve(pathName, filename))

    Object.assign(conf, fileConf)

    result.push(conf)
  })

  return result.sort((a, b) => a.index - b.index).filter(item => !item.disabled)
}

const apps = readAppsConf('appsConf').map(item => ({
  ...item,
  container: `#${process.env.VUE_APP_MICRO_APP_CONTAINER_ID}`,
  props: { routerBase: item.activeRule }
}))

module.exports = JSON.stringify(apps)
