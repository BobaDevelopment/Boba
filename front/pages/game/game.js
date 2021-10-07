// pages/game/game.js
const app = getApp();
Page({
    data: {
        userInfo: {},
        roomName: '', // 房间名
        personNum: '', //房间人数
        prizeList: [],
        userList: [{
            userName: "番茄",
            userImage: "../../img/cover.png"
        }, {
            userName: "番茄",
            userImage: "../../img/cover.png"
        }, {
            userName: "番茄",
            userImage: "../../img/cover.png"
        }, {
            userName: "番茄",
            userImage: "../../img/cover.png"
        }, {
            userName: "番茄",
            userImage: "../../img/cover.png"
        }, ],
        inviteCode: '',
        gamername: "",
        hasPutDice: false,
        hasDiceEffect: false,
        prizeType: "",
        prizeIndex: 0,
        diceResult: [],
        roomId: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            roomName: app.globalData.roomName, // 房间名
            personNum: app.globalData.personNum, //房间人数
            prizeList: app.globalData.prizeList,
            inviteCode: app.globalData.inviteCode,
            prizeType: "榜眼",
            roomName: "2021实验室中秋博饼",
            diceResult: [1, 2, 3, 4, 5, 6],
        })
    },
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    chooseWxImage: function (type) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                that.upImgs(res.tempFilePaths[0]);
            }
        })
    },
    backHome() {
        wx.redirectTo({
            url: '../home/home'
        })
    },
    play: function (e) {
        var that = this;
        var times = 0;
        that.setData({
            hasDiceEffect: true,
        })
        var i = setInterval(function () {
            times++
            if (times >= 2) {
                that.setData({
                    hasDiceEffect: false,
                    hasPutDice: true,
                })
                clearInterval(i)
            }
        }, 1000)
        wx.request({
            url: "http://192.168.50.51:5000/user/drop",
            method: "POST",
            header: {
                "content-type": "application/json",
                "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomId: app.globalData.roomId,
                filename: "no",
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    prizeType: res.data.data.resname,
                    prizeIndex: res.data.data.reslevel - 1,
                    diceResult: res.data.data.dicelist
                })
            }
        })
    },
    takeAward: function () {
        var that = this;
        // console.log(that.prizeList)
        // console.log(app.globalData.prizeList)
        that.setData({
            hasSelectAward: true,
        })
        // that.getDiceResult()
    },
    getDiceResult: function () {
        //上传服务器
        var that = this;
        // wx.request({
        //     url: "http://192.168.50.51:5000/user/drop",
        //     method: "POST",
        //     header: {
        //         "content-type": "application/json",
        //         "Authorization": "Bearer " + app.globalData.token
        //     },
        //     data: {
        //     },
        //     success: function (res) {
        //         console.log(res.data)

        //     }
        // })
    },
    selectAward: function () {
        this.setData({
            hasSelectAward: false,
            hasPutDice: false
        })
    },
    backGame: function () {
        this.setData({
            hasSelectAward: false,
            hasPutDice: false
        })
    },
    upImgs: function (imgurl) {
        var that = this;
        wx.uploadFile({
            url: 'http://192.168.50.51:5000/file/upload',
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: null,
            success: function (res) {
                
                 //接口返回网络路径
                var data = JSON.parse(res.data)
                that.imgResult(data.data.filename)
            }
        })
    },
    imgResult: function(imgUrl){
        var that = this
        wx.request({
            url: "http://192.168.50.51:5000/user/drop",
            method: "POST",
            header: {
                "content-type": "application/json",
                "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomId: app.globalData.roomId,
                filename: imgUrl,
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    prizeType: res.data.data.resname,
                    prizeIndex: res.data.data.reslevel - 1,
                    diceResult: res.data.data.dicelist
                })
            }
        })
        that.setData({
            hasDiceEffect: false,
            hasPutDice: true,
        })
    }

})