export function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}
export function chooseAddress() {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}
export function openSetting() {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}
export function showModal({ content }) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res)
            }
        })
    })
}