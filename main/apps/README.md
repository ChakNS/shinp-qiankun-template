## 微应用配置说明

### appsConf 中存放子应用路由的相关配置，规则如下：
在开发环境下，配置文件修改后，需要重启本地服务才能看到更新

```js
// 配置文件的文件名为子应用的路由名称，根据需要扩展
module.exports = {
  alias: 在主应用导航栏中显示的名称,
  entry: 子应用的真实资源地址,
  ...
}
```

### MicroAppController
微应用控制器，<br>
主应用启动后，会自动生成该类的实例，并挂载在Vue原型上，通过$microApps访问

#### 实例属性
```js
instance.appsInfo // 子应用的配置信息
```

#### 实例方法
```js
push(name) // 子应用路由切换
isValidAppName(name) // 是否为存在的name
getActiveAppName() // 获取激活的子应用的name
```
