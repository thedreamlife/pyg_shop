import { getSetting, chooseAddress, openSetting, showModal } from '../../utils/asyncWx'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import request from '../../network/request';
Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        const address = wx.getStorageSync('address')
        console.log(address);

        let cart = wx.getStorageSync('cart') || [];
        // 过滤后的购物车数组
        cart = cart.filter(v => v.checked)
        this.setData({
            address
        })
        this.setCart(cart);
    },
    setCart(cart) {
        let totalPrice = 0;
        let totalNum = 0;
        // 循环遍历数组
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
        })
        wx.setStorageSync('cart', cart)
    },
    // 点击支付功能
    async handleOrderPay() {
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return;
        };
        // 创建订单 请求头参数
        // const header = { Authorization: token };
        // // 请求体参数
        // const order_price = this.data.totalPrice;
        // const address = this.data.address;
        // const cart = this.data.cart;
        // let goods = [];
        // cart.forEach(v => goods.push({
        //     goods_id: v.goods_id,
        //     goods_number: v.num,
        //     goods_price: v.goods_price
        // }))
        // const orderParams = { order_price, address, goods }
        //const {order_number} = await request({ url: '/my/orders/create', method: 'post', data: orderParams })
        //发起预支付接口
        // const res = await request({ url: '/my/orders/req_unifiedorder', method: 'post', header, data: order_number })
        // wx.requestPayment({
        //     timeStamp: '',
        //     nonceStr: '',
        //     package: '',
        //     signType: '',
        //     paySign: '',
        //     success: function(res){

        //     }
        // })
        // 查询订单状态
        // const res = await request({ url: '/my/orders/chkOrder', method: 'post', header, data: order_number })
        // wx.showToast({
        //     title: '支付成供'
        // })
        // let newCart = wx.getStorageSync('cart');
        // newCart = newCart.filter(v => !v.checked);
        // wx.setStorageSync('cart', newCart)
        // wx.navigateTo({
        //     url:'/pages/order/order'
        // })
    }
})