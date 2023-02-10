import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VuePwaInstaller from 'vue-pwa-installer'

const app = createApp(App)

app.use(router)

app.mount('#app')

Vue.use(VuePwaInstaller)