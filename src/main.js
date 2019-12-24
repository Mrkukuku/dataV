// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router"
import ElementUI  from 'element-ui'
import dataV from '@jiaminghi/data-view'
import Charts from '@jiaminghi/charts'
import moment from 'moment'
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/reset.css"
Vue.use(ElementUI)
Vue.use(dataV)
Vue.use(animated)


Vue.config.productionTip = false
Vue.prototype.$Charts = Charts
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
