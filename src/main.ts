import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import { useREM } from '@/utils/flexible'
import useTheme from '@/utils/theme'
import 'virtual:svg-icons-register'
import store from '@/store'
// 注册svg-icons
import mLibs from '@/libs'

useREM()
useTheme()
createApp(App).use(router).use(store).use(mLibs).mount('#app')
