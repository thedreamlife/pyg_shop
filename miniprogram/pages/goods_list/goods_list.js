import regeneratorRuntime from '../../lib/runtime/runtime';
import request from '../../network/request';
Page({
    data: {
        tabs: [{
                id: '0',
                value: '综合',
                isActive: true
            },
            {
                id: '1',
                value: '销量',
                isActive: false
            }, {
                id: '2',
                value: '价格',
                isActive: false
            }
        ],
        goodsList: []
    },
    GoodParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10

    },
    // 总页数
    totalPages: 1,
    async goodsFetch() {
        const res = await request({ url: '/goods/search', data: this.GoodParams })
            // console.log(res);
            // 总条数
        const total = res.data.message.total;
        // console.log(total);

        // 计算总页数
        this.totalPages = Math.ceil(total / this.GoodParams.pagesize)
            // console.log(totalPages);

        this.setData({
            // 
            goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })
        wx.stopPullDownRefresh();

    },
    onLoad: function(options) {
        // console.log(options);
        this.GoodParams.cid = options.cid;
        this.goodsFetch()

    },
    handleTarBarItem(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        // console.log({ tabs });
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        })
    },
    onReachBottom() {
        if (this.GoodParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一条数据',
            })
        } else {
            this.GoodParams.pagenum++;
            this.goodsFetch()
        }
    },
    onPullDownRefresh() {
        this.setData({
                goodsList: []
            }),
            this.GoodParams.pagenum = 1;
        this.goodsFetch()


    }

})