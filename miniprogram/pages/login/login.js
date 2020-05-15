// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    handleUserinfo(e) {
        const { userInfo } = e.detail;
        wx.setStorageSync('userinfo', userInfo)
            // 跳回上一层页面
        wx.navigateBack({
            delta: 1
        });
    }

})