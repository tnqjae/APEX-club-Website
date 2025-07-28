import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY
Kakao.init(kakaoKey);
