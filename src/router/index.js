import Vue from 'vue'
import Router from 'vue-router'
import dataV from "@/components/dataV.vue"
import mapdata from "@/components/mapdata.vue"
import datacharts from "@/components/datacharts.vue"

Vue.use(Router)



export default new Router({
  routes: [
      {
          path: '/',
          component: mapdata
      },
      {
          path: '/datav',
          component: dataV
      },
      {
        path:"/datacharts",
        component: datacharts
      }
  ],
})
