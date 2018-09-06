import Vue from 'vue'
import App from './App'
// css
import '@/assets/css/weui.css'
import '@/assets/css/init.css'
// vuex
// import wx from 'wx'
import store from '@/store'
import api from '@/api/index'
import MpvueRouterPatch from 'mpvue-router-patch'
import check from '@/plugins/check'
import config from '@/config'
import { $Message, $Toast, $success } from '@/utils/index'
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
//     //创建路由实例
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
            // backgroundTextStyle: 'light',
            // navigationBarBackgroundColor: '#004098',
            // navigationBarTitleText: '世模大赛',
            navigationBarTextStyle: '#fff',
        },
    }
}
