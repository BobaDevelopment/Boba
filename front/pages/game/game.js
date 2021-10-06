// pages/game/game.js
const app = getApp();
Page({
    data: {
        userInfo: {},
        roomName: app.globalData.roomName, // 房间名
        personNum: app.globalData.personNum, //房间人数
        prizeList: app.globalData. prizeList,
        userList: [{userName:"番茄", userImage:"../../img/cover.png"}, {userName:"番茄", userImage:"../../img/cover.png"}, {userName:"番茄", userImage:"../../img/cover.png"}, {userName:"番茄", userImage:"../../img/cover.png"}, {userName:"番茄", userImage:"../../img/cover.png"},],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            roomName: "2021实验室中秋博饼"
          })
    },
})