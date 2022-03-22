import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router'
import App from './App.vue'
import { sharedStates } from 'common'

const IS_QIANKUN = window.__POWERED_BY_QIANKUN__
let app

function render(props) {
  const { container, name } = props || {}

  const router = createRouter({
    history: createWebHashHistory(name ? `/${name}/` : '/'),
    routes
  })

  app = createApp(App)

  if (IS_QIANKUN) {
    app.use(sharedStates(props))
  }

  app.use(router).mount(container ? container.querySelector('#app') : '#app')
}

if (!IS_QIANKUN) {
  render()
}

export async function bootstrap(props) {
  console.log('home bootstrap')
}
export async function mount(props) {
  console.log('home mount')
  render(props)
}
export async function unmount(props) {
  console.log('home unmount')
  app = null
}

