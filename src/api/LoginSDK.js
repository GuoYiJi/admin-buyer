import wx from 'wx';
import config from '@/config.js';
import qs from 'qs';
const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL;
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());
export default class LoginSDK {

  _loginCbs = []
  isLoginLoading = false
  user = null
  wx = wx
  getStorageSync(key) {
    return wx.getStorageSync(`${process.env.NODE_ENV}/${key}`);
  }
  setStorageSync(key, value) {
    return wx.setStorageSync(`${process.env.NODE_ENV}/${key}`, value);
  }
  removeStorage(key) {
    wx.setStorageSync(`${process.env.NODE_ENV}/${key}`);
  }
  constructor() {
    if (__instance()) return __instance();

    __instance(this);
  }
  _checkIsLogin(cb) {
    let _cache = this.getStorageSync('account');
    let createLogin = this.getStorageSync('create-login');
    let { wx, loginSuccess, user } = this;
    if (!user && _cache && createLogin && (Date.now() - createLogin) > (1000 * 60 * 60 * 30)) {
      _cache = null;
    }
    if (user || _cache) {
      if (_cache) {
        user = this.user = _cache;
      }
      cb({ errMsg: '', code: 200, login: true, user });
    } else {
      wx.getSetting({
        success: (res) => {
          const { authSetting } = res;
          if (!authSetting['scope.userInfo']) {
            this._redirectLogin();
          } else {

            this.login({}, res => {
              switch (res.code) {
                case 200:
                  cb({ errMsg: '', code: 200, login: true, user: res.user });
                  break;
                default:
                  this._redirectLogin();
              }
            })
            // wx.getUserInfo({
            //   success: res => {
            //     const { userInfo } = res;
            //   },
            //   fail: res => {
            //     this._redirectLogin();
            //   }
            // })
          }
        },
        fail: (err) => {
          this._redirectLogin();
        }
      })
    }
  }
  isLogin(cb) {

    this._loginCbs.push(cb);
    if (this.isLoginLoading) {
      return false;
    } else {
      this._checkIsLogin(res => {
        this._loginCbs.forEach(cb => {
          if (typeof cb === 'function') {
            cb(res);
          }
        })
        this._loginCbs = [];
      });
    }
  }

  login(e, cb) {
    const { wx, loginSuccess, $route } = this;

    let appId = wx.getStorageSync('appId');
    if (!appId) {
      const account = wx.getAccountInfoSync();
      const { miniProgram: { appId: _appid } } = account;
      wx.setStorageSync('appId', _appid);
      appId = _appid;
    }
    wx.showLoading({
      title: '登录中',
      icon: 'none'
    })
    wx.login({
      success: ({code}) => {
        wx.getUserInfo({
          success: res => {
            const { userInfo, encryptedData, iv } = res;
            const { avatarUrl: avatar, nickName: nick } = userInfo;
            wx.request({
              url: `${URL}/api/account/authLogin`,
              data: {code, encryptedData, iv, shopId: appId, avatar, nick, ...e},
              header: {'Content-Type': 'application/x-www-form-urlencoded'},
              method: 'POST',
              // dataType: 'json',
              success: res => {

                wx.hideLoading();
                let { data: { data, code, desc } } = res;
                if (code === -1) {
                  wx.showModal({
                    title: '提示',
                    content: desc,
                    confirmText: '知道了',
                    showCancel: false,
                    success: res => {
                      this._redirectLogin();
                    }
                  })
                  return;
                }
                if (code === 1) {
                  const { sessionId, no } = data;
                  wx.setStorage({
                    key: 'no',
                    data: no
                  })
                  data.appId = appId;
                  this.setStorageSync('account', data);
                  this.setStorageSync('create-login', Date.now());
                  wx.setStorageSync('avatar', avatar);
                  cb({ errMsg: '', code: 200, user: data });
                  this.user = data;
                  this.isLoginLoading = false;
                } else {
                  wx.showToast({
                    title: desc,
                    icon: 'none',
                    duration: 3000
                  })
                  this._redirectLogin();
                }
              },
              fail: res => {
                this._redirectLogin();
              }
            })
          },
          fali: res => {
            this._redirectLogin();
          },
          complete: res => {
          }
        })
      },
      fail: res => {
        this._redirectLogin();
      }
    })
  }
  _redirectLogin() {
    wx.hideLoading();
    this.user = null;
    this._loginCbs = [];
    this.removeStorage('account');
    this.removeStorage('create-login');
    wx.reLaunch({
      url: '/pages/login/wxLogin'
    })
  }
}