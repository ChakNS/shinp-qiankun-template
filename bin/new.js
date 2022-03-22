const path = require('path')
const uppercamelcase = require('uppercamelcase')
const { copySync, readFileSync, writeFileSync } = require('fs-extra')
const { prompt: query } = require('enquirer')

console.log()
process.on('exit', () => console.log())

const main = async () => {
  const args = await argsQuery()
  let { appName, alias, port } = args

  if (!appName) {
    console.error('[微应用名]必填 - Please enter micro-app name')
    process.exit(1)
  }

  if (!port) {
    console.error('[微应用端口]必填 - Please enter micro-app port')
    process.exit(1)
  }

  appName = uppercamelcase(appName)
  
  const appJsonFile = require('../apps/app.json')
  if (appJsonFile[appName]) {
    console.error(`微应用「${appName}」已存在`)
    process.exit(1)
  }
  appJsonFile[appName] = `./${appName}`

  writeFileSync(
    path.join(__dirname, '../apps/app.json'),
    JSON.stringify(appJsonFile, null, '  ') + '\n'
  )

  // copy 模版
  copyTemp(appName, port)

  // 更新主应用
  updateMain(appName, alias, port)

  // 更新脚本
  updateScripts(appName)

  console.log('DONE!')
}

async function argsQuery() {
  const args = {}
  args.appName = (
    await query({
      type: 'input',
      name: 'appName',
      message: 'Input micro-app name',
    })
  ).appName.trim()

  args.alias =
    (
      await query({
        type: 'input',
        name: 'alias',
        message: 'Input micro-app alias',
      })
    ).alias.trim() || args.appName

  args.port =
    (
      await query({
        type: 'input',
        name: 'port',
        message: 'Input micro-app port',
      })
    ).port.trim()

  return args
}

function copyTemp(appName, port) {
  const targetPath = path.join(__dirname, `../apps/${appName}`)
  const envPath = path.join(targetPath, './.env')
  const pkgPath = path.join(targetPath, './package.json')

  // 复制模版
  copySync(path.join(__dirname, '../#template'), targetPath)

  // 修改端口
  const envText = readFileSync(envPath, 'utf-8')
  writeFileSync(envPath, envText.replace('$PORT', port))

  // 修改应用名
  const pkg = require(pkgPath)
  pkg.name = appName
  writeFileSync(pkgPath, JSON.stringify(pkg, null, '  ') + '\n')
}

function updateMain(appName, alias, port) {
  const envPath = path.join(__dirname, '../main/.env.development')
  const appConfPath = path.join(__dirname, `../main/apps/appsConf/${appName}.js`)

  let mainEnv = readFileSync(envPath, 'utf-8')
  mainEnv += `# ${alias}\nVUE_APP_${appName.toUpperCase()}=http://localhost:${port}\n`
  writeFileSync(envPath, mainEnv)
  const appConf = `// ${alias}
module.exports = {
  alias: '${alias}',
  entry: process.env.VUE_APP_${appName.toUpperCase()}
}
`
  writeFileSync(appConfPath, appConf + '\n')
}

function updateScripts(appName) {
  const pkgPath = path.resolve(process.cwd(), 'package.json')
  const pkg = require(pkgPath)
  Object.assign(pkg.scripts, {
    [`install:${appName}`]: `cd apps/${appName} && yarn install`,
    [`serve:${appName}`]: `cd apps/${appName} && yarn serve`,
    [`build:${appName}`]: `cd apps/${appName} && yarn build`,
    [`update:common:${appName}`]: `cd apps/${appName} && yarn remove common && yarn add ../../common`
  })
  writeFileSync(pkgPath, JSON.stringify(pkg, null, '  ') + '\n')
}

main().catch(error => {
  console.log(error)
  process.exit(1)
})
