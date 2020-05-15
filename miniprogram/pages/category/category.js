// pages/category/category.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import request from '../../network/request'
Page({
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0

    },
    Cates: [],
    onLoad: function(options) {
        const Cates = wx.getStorageSync('cates');
        if (!Cates) {
            this.catesfetch()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.catesfetch()
            } else {
                this.Cates = Cates.data
            }

        }
    },
    async catesfetch() {
        const res = await request({ url: '/categories' });
        console.log(res);
        // 定义接口返回的数据
        this.Cates = res.data.message;
        // 把数据存储在本地存储中{key:value}
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
            //构造左侧的大菜单数据 map返回每次函数调用的结果组成的数组
        const leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧的数据
        const rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemTap(e) {
        // console.log(e);
        // 获取被点击的标题身上的索引
        const { index } = e.currentTarget.dataset
            // console.log(index);
        const rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent
        })
    }


})