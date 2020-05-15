import regeneratorRuntime from '../../lib/runtime/runtime';
import request from '../../network/request'

Page({

    data: {
        goods: []
    },
    timeid: -1,
    // 输入框的值改变就触发事件
    handleInput(e) {
        // console.log(e);
        const { value } = e.detail;
        if (!value.trim()) {
            return;
        }
        // 发送请求获取数据
        clearTimeout(this.timeid)
        this.timeid = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    async qsearch(query) {
        const res = await request({ url: '/goods/qsearch', data: { query } })
        console.log(res.data.message);
        this.setData({
            goods: res.data.message
        })
    }


})