// pages/goods_item/goods_item.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import request from '../../network/request'
Page({
    data: {
        goodsObj: {},
        isCollect: false
    },
    GoodsInfo: {},
    onLoad: function(options) {
        // console.log(options);
        const { goods_id } = options
        // this.GoodParams.goods_id = options.goods_id
        this.GoodItemFetch(goods_id)
    },
    onShow() {

    },
    // GoodParams: {
    //     goods_id: ''
    // },
    async GoodItemFetch(goods_id) {
        // {goods_id}相当于{goods_id:1234456}
        const res = await request({ url: '/goods/detail', data: { goods_id } })
        this.GoodsInfo = res.data.message
            // 页面加载时显示是否收藏
        let collect = wx.getStorageSync('collect') || []
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
        this.setData({
            goodsObj: {
                goods_name: res.data.message.goods_name,
                goods_price: res.data.message.goods_price,
                goods_introduce: res.data.message.goods_introduce,
                pics: res.data.message.pics
            },
            isCollect
        })
    },
    // 轮播图放大
    handlePrieve(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        console.log(e);
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls: urls
        })
    },
    handleCart() {
        const cart = wx.getStorageSync('cart') || [];
        //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            // 不存在添加属性
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo)
                // ES6方法
                // cart = Array.of(this.GoodsInfo)
        } else {
            cart[index].num++

        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            // 防止用户手抖
            mask: true
        })


    },
    // 点击商品收藏图标
    handleCollect() {
        let isCollect = false
        let collect = wx.getStorageSync('collect') || []
            // 判断该商品是否被收藏过
        let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index !== -1) {
            // 表示能找到收藏过在数组中删除
            collect.splice(index, 1)
            isCollect = false
        } else {
            // 没有收藏过就往数组里面添加商品然后存入缓存中
            collect.push(this.GoodsInfo);
            isCollect = true
        }
        wx.setStorageSync('collect', collect)
            // 修改data属性
        this.setData({
            isCollect
        })
    }
})