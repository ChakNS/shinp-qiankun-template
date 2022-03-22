import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import MicroAppController from '../apps/MicroAppController'
const app = createApp(App)

app.config.globalProperties.$microApps = new MicroAppController({
  appsInfo: JSON.parse(process.env.MICRO_APPS)
})

app.mount('#app')

registerMicroApps(JSON.parse(process.env.MICRO_APPS), {
  beforeMount(app) {
    console.log('beforeMount', app)
  }
})

start({})