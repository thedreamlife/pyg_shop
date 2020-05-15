// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal } from '../../utils/asyncWx'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
        cart: [],
        allchecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    // async handleChooseAddress() {
    // wx.getSetting({
    //     success: function(res) {
    //         const scopeAddress = res.authSetting["scope.address"];
    //         if (scopeAddress === true || scopeAddress === undefined) {
    //             wx.chooseAddress({
    //                 success: function(result) {
    //                     console.log(result);
    //                 }
    //             })
    //         } else {
    //             wx.openSetting({
    //                 success: function(result) {
    //                     wx.chooseAddress({
    //                         success: function(res3) {
    //                             console.log(res3);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // });
    // const res1 = await getSetting();
    // const scopeAddress = res1.authSetting["scope.address"];
    // if (scopeAddress === true || scopeAddress === undefined) {
    //     // const res2 = await chooseAddress()
    // } else {
    //     await openSetting();
    //     // const res2 = await chooseAddress();
    // }
    //     if (scopeAddress === false) {
    //         await openSetting();
    //     }
    //     const res2 = await chooseAddress();
    // }
    onShow() {
        const address = wx.getStorageSync('address')
        const cart = wx.getStorageSync('cart') || [];
        // const allchecked = cart.length ? cart.every(v => v.checked) : false;
        // let allchecked = true
        // let totalPrice = 0;
        // let totalNum = 0;
        // // 循环遍历数组
        // cart.forEach(v => {
        //         if (v.checked) {
        //             totalPrice += v.num * v.goods_price;
        //             totalNum += v.num
        //         } else {
        //             allchecked = false
        //         }
        //     })
        //     // 判断数组是否为空 如果为空让allchecked为false
        // allchecked = cart.length != 0 ? allchecked : false;
        // this.setData({
        //     address,
        //     cart,
        //     allchecked,
        //     totalPrice,
        //     totalNum
        // })
        this.setData({
            address
        })
        this.setCart(cart);
    },
    async handleChooseAddress() {
        try {
            const res1 = await getSetting();
            const scopeAddress = res1.authSetting["scope.address"];
            if (scopeAddress === false) {
                await openSetting();
            }
            const address = await chooseAddress();
            wx.setStorageSync('address', address)
        } catch (err) {
            console.log(err);
        }
    },

    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id
            // 获取购物车数组
        let { cart } = this.data;
        // 找到被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id)
            // 选中状态取反
        cart[index].checked = !cart[index].checked;
        this.setCart(cart);
        // wx.setStorageSync('cart', cart)
        // let allchecked = true
        // let totalPrice = 0;
        // let totalNum = 0;
        // // 循环遍历数组
        // cart.forEach(v => {
        //         if (v.checked) {
        //             totalPrice += v.num * v.goods_price;
        //             totalNum += v.num
        //         } else {
        //             allchecked = false
        //         }
        //     })
        //     // 判断数组是否为空 如果为空让allchecked为false
        // allchecked = cart.length != 0 ? allchecked : false;
        // this.setData({
        //     cart,
        //     allchecked,
        //     totalPrice,
        //     totalNum
        // })

    },
    setCart(cart) {
        let allchecked = true
        let totalPrice = 0;
        let totalNum = 0;
        // 循环遍历数组
        cart.forEach(v => {
                if (v.checked) {
                    totalPrice += v.num * v.goods_price;
                    totalNum += v.num
                } else {
                    allchecked = false
                }
            })
            // 判断数组是否为空 如果为空让allchecked为false
        allchecked = cart.length != 0 ? allchecked : false;
        this.setData({
            cart,
            allchecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync('cart', cart)
    },
    handleAllChecked() {
        let { cart, allchecked } = this.data;
        allchecked = !allchecked;
        cart.forEach(v => v.checked = allchecked);
        this.setCart(cart)
    },
    async handleitemEdit(e) {
        const { id, operation } = e.currentTarget.dataset;
        let { cart } = this.data
        const index = cart.findIndex(v => v.goods_id === id)
            // 是否要执行删除
        if (cart[index].num === 1 && operation === -1) {
            const res = await showModal({ content: '你是否要删除？' });
            if (res.confirm) {
                // splice()方法从数组中间根据索引删除元素
                cart.splice(index, 1);
                this.setCart(cart)
            }
        } else {
            // 进行数量修改
            cart[index].num += operation
            this.setCart(cart)
        }

    },
    handlePay() {
        const { address, totalNum } = this.data;
        if (!address.userName) {
            wx.showToast({
                title: '你还没用添加收货地址',
            })
            return;
        }
        if (totalNum == 0) {
            wx.showToast({
                title: '你还没用选购商品',
            })
            return;
        }
        // 跳转到支付页面
        wx.navigateTo({
            url: '/pages/pay/pay'
        })
    }
})