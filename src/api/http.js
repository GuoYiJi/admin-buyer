import config from '@/config.js'

const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import wx from 'wx'
const vm = new Vue();
let isLogin = false;
let loginLoading = false;
let loginCbs = [];
function login(cb) {
  return new Promise((resolve, reject) => {
    loginCbs.push(cb);
    if (loginLoading) {
      return;
    }
    const _flag = wx.getStorageSync(`${process.env.NODE_ENV}_is-login`);
    if (isLogin || _flag) {
      wx.setStorageSync(`${process.env.NODE_ENV}_is-login`);
      loginCbs.forEach(cb => {
        if (typeof cb === 'function') {
          cb();
        }
      })
      loginCbs = [];
      return;
    }
    wx.showLoading({
      title: '登录中'
    })
    loginLoading = true;
    wx.login({
      success: async res => {
        const { code } = res;
        if (code) {
          wx.getSetting({
            success: res => {
              const { authSetting } = res;
              if (!authSetting['scope.userInfo']) {
                wx.reLaunch({
                  url: '/pages/login/wxLogin'
                })
                loginLoading = false;
                wx.hideLoading();
              } else {
                wx.getUserInfo({
                  success: res => {
                    wx.request({
                      url: TEST_URL + '/api/account/authLogin',
                      data: {
                        code,
                        shopId: 'wx3a5f4001c0e1d32f',
                        encryptedData: res.encryptedData,
                        iv: res.iv
                      },
                      header: {'Content-Type': 'application/x-www-form-urlencoded'},
                      method: 'POST',
                      success: function (res) {
                        wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, res.data.data.sessionId);
                        isLogin = true;
                        loginLoading = false;
                        wx.hideLoading();
                        loginCbs.forEach(cb => {
                          if (typeof cb === 'function') {
                            cb();
                          }
                        })
                        loginCbs = [];
                      },
                      fail: function(err) {
                        loginLoading = false;
                        wx.redirectTo({
                          url: '/pages/login/wxLogin'
                        })
                      }
                    })
                  },
                  fail: err => {
                    wx.hideLoading();
                    loginLoading = false;
                    wx.reLaunch({
                      url: '/pages/login/wxLogin'
                    })
                  }
                });
              }
            },
            fail: () => {
              wx.hideLoading();
              loginLoading = false;
            }
          })
        }
      },
      fail: () => {
        wx.hideLoading();
        loginLoading = false;
      }
    });
  })
}
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
            wx.reLaunch({
              url: '/pages/login/wxLogin'
            })
          } else if (code === 0) {
            const msg = data.data.desc
            wx.showToast({
              title: `${msg}`,
              icon: 'none'
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
  var value = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`);
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
    return new Promise((resolve, reject) => {
      try {
        login(async res => {
          const data = await http.post(url, qs.stringify({...params}))
          resolve(data)
        })
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
