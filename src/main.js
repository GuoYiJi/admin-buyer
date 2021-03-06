import Vue from 'vue'
import App from './App'
// css
import '@/assets/css/weui.css'
import '@/assets/css/init.css'
import '@/assets/scss/vant-css.scss';

// vuex
// import wx from 'wx'
import store from '@/store'
import api from '@/api/index'
import MpvueRouterPatch from 'mpvue-router-patch'
import check from '@/plugins/check'
import config from '@/config'
import {$Message, $Toast, $success} from '@/utils/index'
Vue.mixin({
  onUnload() {
    // if (this.$options.data) {
    //   Object.assign(this, this.$options.data())
    // }
  }
})
Vue.use(MpvueRouterPatch)

Vue.prototype.$API = api
Vue.prototype.$config = config
Vue.prototype.$check = check
Vue.prototype.$Message = $Message
Vue.prototype.$Toast = $Toast
Vue.prototype.$success = $success
Vue.config.productionTip = false

// const routes = [{
//         path: "/pages/home/orderMgr/orderdetails",
//         name: 'orderdetails',
//         component: Orderdetails,
//     }]
//     创建路由实例
// const router = new VueRouter({ routes })
const app = new Vue({
  // el: '#app',
  store,
  ...App
})
app.$mount()

export default {

  // 这个字段走 app.json ^pages/home/home'
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/home/home'],
    window: {
      backgroundTextStyle: 'black',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#808080",
      selectedColor: "#F3792C",
      backgroundColor: "#ffffff",
      list: [
        {
          pagePath: "pages/home/home",
          text: "店铺",
          iconPath: "/static/img/shop_fill1.png",
          selectedIconPath: "/static/img/shop_fill.png",

        }, {
          pagePath: "pages/my/my",
          text: "我的",
          iconPath: "/static/img/person-fill1.png",
          selectedIconPath: "/static/img/person-fill.png"
        }
      ]
    }
  }
}
