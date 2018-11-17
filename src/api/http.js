import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import wx from 'wx'
import LoginSDK from './LoginSDK';
const loginSDK = new LoginSDK();
const vm = new Vue();
axios.defaults.adapter = function(config) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    // console.log(config)
    try {
      wx.request({
        url: config.url,
        data: config.data,
        header: config.headers,
        method: config.method,
        dataType: config.dataType,
        success: function(data) {
          console.log('data', data)
          if (data.statusCode === 200) {
            // return data
            // console.log(data.data.desc)
            const code = Number(data.data.code)
            if (code === 1) {
              //  data.data
              // console.log('这是请求')
              resolve(data.data)
              // return data.data
            } else if (code === 2) {
              loginSDK._redirectLogin();
            } else if (code === 0) {
              const msg = data.data.desc
              wx.showToast({
                title: `${msg}`,
                icon: 'none'
              })
            } else if (code === -1) {
              wx.hideLoading();
              reject(data);
            }
          } else {
            wx.showToast({
              title: '网络出错',
              icon: 'none',
              duration: 3000
            })
          }
        },
        fail: res => {
          console.log('fail', res);
          wx.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 3000
          })
          reject();
        },
        complete: function() {
          wx.hideLoading()
        }
      })
    } catch (err) {
      console.log(err)
    }
    // })
  })
}


//发送一般请求
const http = axios.create({
  timeout: 5000,
  baseURL: URL,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true'
  }
})
//拦截器
// http.interceptors.request.use(async (configs) => {
//   // if(wx.getStorage('sessionId')) {
//   //   config.data += '&sessionId=' + localStorage.getItem('sessionId')
//   // }
//   // sessionId
//   return configs
// }, err => {
//   return Promise.reject(error);
// })

//form请求
const form = axios.create({
  timeout: 60000,
  baseURL: URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export default {
  // get( url ,params = {}){
  //   return new Promise (async (resolve, reject) => {
  //     try {
  //       const data = await http.get(url,{params})
  //       const code = Number(data.data.errorCode)
  //       if (code === 0) resolve (data.data)
  //       else {
  //         // 提示报错信息
  //       }
  //     }
  //     catch(err) {
  //       console.log(err)
  //     }
  //   })
  // },
  post(url, params = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        loginSDK.isLogin(res => {
          console.log(res);
          const { user: { sessionId, appId } } = res;
          params = {
            shopId: appId,
            sessionId,
            ...params
          }
          // console.log(wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`), '`${process.env.NODE_ENV}_sessionId`')
          
          http.post(url, options.headers ? params : qs.stringify({...params}), options)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err);
            })
        })

        // login(async res => {
        //   if (url.indexOf('authLogin') !== -1) {
        //     resolve(res);
        //   } else {
        //   }
        // }, params, url)
        // const code = Number(data.data.code)
        // console.log(data)
        // if(code === 1) {
        //   consoole.log('post')
        //   resolve(data.data)
        // } else if (code === 2 ) {
        //   // 重新登陆 清除登陆信息 location.reload()
        //   // window.location.reload()
        //   vm.$toast(data.data.desc)
        //   setTimeout(()=>{
        //     // vm.$router.push({path: '/Login'})
        //     window.location.href = "/dist/index.html#/Login"
        //   },2500)
        // } else {
        //   wx.showToast({
        //     title: data.data.desc,
        //     // icon: 'success',
        //     duration: 2000
        //   })
        //   // if(back){
        //   //   setTimeout(()=>{
        //   //     history.go(-1)
        //   //   },2500)
        //   // }

        // }
      } catch (err) {
        console.log(err)
      }

    })
  },

  form(url, params = {}) {
    return new Promise(async (reslove, reject) => {
      try {
        const data = await form.post(url, params)
        const code = Number(data.data.code)
        if (code === 1) {
          reslove(data.data)
        } else {
          vm.$toast(data.data.desc)
        }
      } catch (err) {
        console.log(err)
      }
    })

  },
}
