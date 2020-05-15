//index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import request from '../../network/request'
Page({
    data: {

        swiperList: [],
        cateList: [],
        floor: []
    },
    onLoad: function(options) {
        this.fetch()
        this.catefetch()
        this.floorfetch()
    },
    // 轮播图请求
    async fetch() {
        const res = await request({ url: '/home/swiperdata' });
        this.setData({
            swiperList: res.data.message
        })
    },
    // 导航请求数据
    async catefetch() {
        const res = await request({ url: '/home/catitems' });
        this.setData({
            cateList: res.data.message
        })
    },
    // 获取楼层数据
    async floorfetch() {
        const res = await request({ url: '/home/floordata' });
        // console.log(res);
        this.setData({
            floor: res.data.message
        })
    }




})