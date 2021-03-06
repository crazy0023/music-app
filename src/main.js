// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Container from '@/components/Container'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'



fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('@/assets/images/zhouyuqiao.jpg')
})
Vue.config.productionTip = false

// 注册全局组件
Vue.component(Container.name, Container)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
