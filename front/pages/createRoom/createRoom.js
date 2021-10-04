// pages/createRoom/createRoom.js
const app = getApp();
Page({
    data: {
        roomName: '', // 房间名
        personNum: '', //房间人数
    },
    roomNameInput: function (e) {
        app.globalData.roomName = e.detail.value;
        this.setData({
          roomName: e.detail.value
        })
        
    },
    roomNumInput: function (e) {
        app.globalData.personNum = e.detail.value;
        this.setData({
            personNum: e.detail.value
        })
    },
    onBack: function() {
        wx.navigateBack({
            delta: 2
          })
    },
    onEnter: function() {

    },
})