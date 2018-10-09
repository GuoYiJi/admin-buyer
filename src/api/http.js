import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import wx from 'wx'
const vm = new Vue()
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
          // return data
          // console.log(data.data.desc)
          const code = Number(data.data.code)
          if (code === 1) {
            //  data.data
            // console.log('这是请求')
            resolve(data.data)
            // return data.data
          } else if (code === 2) {
            // 重新登陆 清除登陆信息 location.reload()
            // window.location.reload()
            if(wx.getStorageSync('code')) {
              wx.login({
                success: async res => {
                  // console.log("微信登录成功 res ==>", res);
                  wx.setStorageSync("code", res.code)
                  if (res.code) {
                    wx.getUserInfo({
                      success: res => {
                        // console.log("获取用户信息成功 res ==>", res);
                        wx.request({
                          url: TEST_URL + '/api/account/authLogin',
                          data: {
                            code: wx.getStorageSync('code'),
                            shopId: 'wx3a5f4001c0e1d32f',
                            encryptedData: res.encryptedData,
                            iv: res.iv
                          },
                          header: {'Content-Type': 'application/x-www-form-urlencoded'},
                          method: 'POST',
                          success: function(res) {
                            wx.setStorageSync('sessionId', res.data.data.sessionId)
                            wx.switchTab({
                              url: '/pages/home/home'
                            })
                          },
                          fail: function(err) {
                            setTimeout(() => {
                              wx.redirectTo({
                                url: '/pages/login/wxLogin'
                              })
                            }, 2000)
                          }
                        })
                      },
                      fail: err => {
                        // this.userInfoBool = true
                      }
                    });
                  }
                },
                fail: () => {
                  self.handleError("授权失败！");
                }
              });
            }else {
              wx.showToast({
                title: '您没有授权, 请授权登录',
                icon: 'none',
                duration: 2000
              })
              wx.setStorageSync('sessionId', '')
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login/wxLogin'
                })
              }, 2000)
            }
            // wx.showToast({
            //   title: '登录过期，请重新登录',
            //   icon: 'none',
            //   duration: 2000
            // })
            // wx.setStorageSync('sessionId', '')
            // setTimeout(() => {
            //   wx.redirectTo({
            //     url: '/pages/login/wxLogin'
            //   })
            // }, 2000)
          } else if (code === 0) {
            const msg = data.data.desc
            wx.showToast({
              title: `${msg}`,
              icon: 'none',
              duration: 2000
            })
          }
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
http.interceptors.request.use(async (configs) => {
  // if(wx.getStorage('sessionId')) {
  //   config.data += '&sessionId=' + localStorage.getItem('sessionId')
  // }
  var value = await wx.getStorageSync('sessionId')
  if (value) {
    configs.data += '&sessionId=' + value
  }
  configs.data += '&shopId=' + config.appId
  return configs
}, err => {
  return Promise.reject(error);
})

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
  post(url, params = {}, back = true) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.post(url, qs.stringify(params))
        resolve(data)
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
