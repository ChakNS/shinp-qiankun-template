class MicroAppController {
  constructor({ appsInfo }) {
    this.appsInfo = appsInfo
  }

  push(name) { // 子应用路由切换
    if (!this.isValidAppName(name)) {
      return
    }

    const path = `/${name}/`

    history.pushState(null, path, path)
  }

  isValidAppName(name) { // 是否为存在的name
    if (!name) {
      return false
    }

    return this.appsInfo.some(item => item.name === name)
  }

  getActiveAppName() { // 获取激活的子应用的name
    let pathname = location.pathname
    let activeApp = this.appsInfo.find(item => pathname.indexOf(item.name) !== -1)

    return activeApp && activeApp.name
  }
}

export default MicroAppController
