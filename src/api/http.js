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
let sessionId;
function login(cb, params, url) {
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
                loginCbs = [];
                wx.reLaunch({
                  url: '/pages/login/wxLogin'
                })
                loginLoading = false;
                wx.hideLoading();
              } else {
                wx.getUserInfo({
                  success: res => {
                    
                    const account = wx.getAccountInfoSync();
                    const { miniProgram: { appId } } = account;
                    loginLoading = true;
                    wx.request({
                      url: TEST_URL + '/api/account/authLogin',
                      data: {
                        code,
                        shopId: appId,
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        ...params
                      },
                      header: {'Content-Type': 'application/x-www-form-urlencoded'},
                      method: 'POST',
                      success: function (res) {

                        wx.hideLoading();
                        loginLoading = false;
                        const { data: { code, desc } } = res;
                        if (code === 1) {
                          isLogin = true;
                          wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, res.data.data.sessionId);
                          sessionId = res.data.data.sessionId;
                          console.log(wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`), '`${process.env.NODE_ENV}_sessionId`')
                          loginCbs.forEach(cb => {
                            if (typeof cb === 'function') {
                              cb(res);
                            }
                          })
                          loginCbs = [];
                        } else if (code === -1) {
                          wx.showModal({
                            title: '提示',
                            content: desc,
                            confirmText: '知道了',
                            showCancel: false,
                            success: res => {
                              wx.redirectTo({
                                url: '/pages/login/wxLogin'
                              })
                            }
                          })
                        } else if (code === 0) {
                          wx.showModal({
                            title: '提示',
                            content: desc,
                            confirmText: '知道了',
                            showCancel: false,
                            success: res => {
                              wx.redirectTo({
                                url: '/pages/login/wxLogin'
                              })
                            }
                          })
                        }
                      },
                      fail: function(err) {
                        console.log('fail', err)
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
        loginCbs = [];
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
          } else if (code === -1) {
            console.log('222')
            wx.hideLoading();
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
  // sessionId
  const account = wx.getAccountInfoSync();
  const { miniProgram: { appId } } = account;
  configs.data += '&shopId=' + appId
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
        console.log('login', params);
        login(async res => {
          if (url.indexOf('authLogin') !== -1) {
            resolve(res);
          } else {
            // console.log(wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`), '`${process.env.NODE_ENV}_sessionId`')
            const data = await http.post(url, qs.stringify({...params, sessionId}))
            resolve(data)
          }
        }, params, url)
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
