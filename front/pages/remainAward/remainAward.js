// pages/remainAward/remainAward.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        awardList: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: "http://192.168.50.51:5000/user/leftprize",
            method: "POST",
            header: {
                "content-type": "application/json",
                "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomid: app.globalData.roomId
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    awardList: res.data.data.awardList
                })
                
            }
        })
    },
    backGame: function() {
        wx.navigateBack({
            delta: 2
        })
    },
    toMyAward: function() {
        wx.redirectTo({
            url: '../myAward/myAward'
          })
    },
    backHome() {
        wx.request({
            url: "http://192.168.50.51:5000/user/leaveroom",
            method: "POST",
            header: {
              "content-type": "application/json",
              "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomId: app.globalData.roomId,
            },
            success: function (res) {
                console.log(res.data)
            }
          })
        wx.redirectTo({
            url: '../home/home'
        })
    },
})