let times = 0;
export default function request(options) {
    times++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...options,
            url: baseUrl + options.url,
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            },
            complete: function() {
                times--;
                if (times == 0) {
                    wx.hideLoading()
                }

            }

        })
    })
}