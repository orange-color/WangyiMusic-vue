import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
// import VConsole from 'vconsole'
import Loadering from './plugin/loader/index'
import NotFound from './plugin/notFound/index'
// 将fastclick绑定到指定元素上
fastclick.attach(document.body)
// 注册懒加载插件
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // 可以设置图片还未加载好之前的占位图片，图片src -> v-lazy
  loading: require('./assets/images/loading_bg.png')
  // attempt: 1
})
Vue.config.productionTip = false
// 移动端开发工具
/* var vConsole = new VConsole()
Vue.use(vConsole) */
// 注册自定义Loading插件
Vue.use(Loadering, { title: '正在加载...' })
Vue.use(NotFound)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
