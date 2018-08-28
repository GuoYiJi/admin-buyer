// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// 路由导入
// const Home = require('./home.js') 
const home = require('./home')
const login = require('./login')
const my = require('./my')
//路由集合
const routes = [].concat(home,login,my)
// console.log(routes)
module.exports = routes
// export default new Router({
//   // mode: 'history',
//   routes: routes
// })
