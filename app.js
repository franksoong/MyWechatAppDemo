//app.js

const network = require('./utils/network.js')
const doubanApi = require('./utils/douban_api.js')

let isNormal = true
const launchPath = 'pages/launchPage/launchPage'

App({
    onLaunch: function (options) {
        console.log('app onLaunch:' + (new Date()).getTime())
        const z = this

        let { scene, path, query } = options

        if (path != launchPath) {
            isNormal = false
        }


        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    onShow: function () {
        console.log('app onShow:' + (new Date()).getTime())
    },
    setupLogin: function () {
        console.log('setupLogin:' + (new Date()).getTime())
        var z = this
        // setup login
        var loginData = wx.getStorageSync('loginData') || null

        if (loginData) {
            z.globalData.isLogin = 1
            z.globalData.loginData = loginData

            if (z.loginCallback) {
                console.log('app callback:' + (new Date()).getTime())
                z.loginCallback()
            }
        }
        else {
            z.globalData.isLogin = 0
            z.globalData.loginData = null

            if (z.unloginCallback) {
                z.unloginCallback()
            }
        }
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    login: function (callback) {
        let z = this
        // login code, code below is just simulation

        setTimeout(function () {
            wx.setStorageSync('loginData', { id: '123' })
            z.setupLogin()

            if (callback) {
                callback()
            }
        }, 1000)
    },
    globalData: {
        userInfo: null
    }
})