import { createApp } from 'vue'
import "./styles/index.scss"
import './style.scss'
import App from './App.vue'

createApp(App).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
