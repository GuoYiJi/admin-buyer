

import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import Vue from 'vue'
import wx from 'wx'
const vm = new Vue()



export default {
  async post(url, params = {}) {
    wx.showLoading({
      title: '加载中',
    })
    var value = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`)
    if (value) {
      params.sessionId = value
    }
    params.shopId = config.appId
    return new Promise(async (resolve, reject) => {
      try {
        wx.request({
          url: URL + '/' + url,
          data: JSON.stringify(params),
          // header: config.headers,
          method: 'POST',
          // dataType: 'json',
          success: function(data){
            // return data
            // console.log(data.data.desc)
            const code = Number(data.data.code)
            if(code === 1) {
              //  data.data
              // console.log('这是请求')
              resolve(data.data)
              // return data.data
            } 
            else if (code === 2 ) {
              // 重新登陆 清除登陆信息 location.reload()
              // window.location.reload()
              wx.showToast({
                title: '登录过期，请重新登录',
                icon: 'none',
                duration: 2000
              })
              wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, '')
              setTimeout(()=>{ 
                wx.redirectTo({url: '/pages/login/wxLogin'})
              },2000) 
            } else if (code === 0) {
              const msg = data.data.desc
              wx.showToast({
                title: `${msg}`,
                icon: 'none',
                duration: 2000
              })
            }
            
          },
          complete: ()=>{
            wx.hideLoading()
          }
        })
        
      } catch(err) {
        console.log(err)
      }    
    })
  },
  // post(url, params = {},back=true ) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const data = await http.post(url, JSON.stringify(params))
  //       resolve(data)
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }    
  //   })
  // },
}
