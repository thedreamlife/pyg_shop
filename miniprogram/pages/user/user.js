// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        collectnum: 0

    },
    onShow() {
        const userinfo = wx.getStorageSync('userinfo')
        const collect = wx.getStorageSync('collect') || []
        this.setData({
            userinfo,
            collectnum: collect.length
        })
    },


})