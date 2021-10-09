// pages/game/game.js
const app = getApp();
Page({
    data: {
        userInfo: {},
        roomName: '', // 房间名
        personNum: '', //房间人数
        prizeList: [],
        awardList: [],
        userList: [ {
            userName: "阙嘉毅",
            userImage: "http://192.168.50.51:5000/file/download/que.jpg"
        },
        {
            userName: "余佳硕",
            userImage: "http://192.168.50.51:5000/file/download/shuo.png"
        },     
        ],
        inviteCode: '',
        gamername: "",
        hasPutDice: false,
        hasDiceEffect: false,
        prizeType: "",
        prizeIndex: 0,
        diceResult: [],
        roomId: '',
        judgement: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        console.log(option)
        var temp = option.invitecode
        this.setData({
            inviteCode: option.invitecode,
            roomName: app.globalData.roomName, // 房间名
            personNum: app.globalData.personNum, //房间人数
            prizeList: app.globalData.prizeList,
           
        })
        // var that = this;
        // var times = 0
        // var i = setInterval(function () {
        //     while (isStartPage) {
        //         times++
        //         if (time > 2) {
        //             wx.request({
        //                 url: "http://192.168.50.51:5000/user/isok",
        //                 method: "POST",
        //                 header: {
        //                     "content-type": "application/json",
        //                     "Authorization": "Bearer " + app.globalData.token
        //                 },
        //                 data: {
        //                     "roomid": that.roomId,
        //                 },
        //                 success: function (res) {
        //                     console.log(res.data)
        //                 }
        //             })
        //             clearInterval(i)
        //         }
        //     }
        // }, 1000)
    },
    onUnload: function () {
        // Do something when page close.
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
                
                console.log(res.data.data.awardList.length)
                if(res.data.data.awardList.length == 0){
                    that.setData({
                        judgement: false
                    })
                }
                that.setData({
                    prizeType: res.data.data.resname,
                    prizeIndex: res.data.data.reslevel - 1,
                    diceResult: res.data.data.dicelist,
                    awardList: res.data.data.awardList,
                })
                console.log(res.data.data.awardList)
            }
        })
    },
    takeAward: function () {
        var that = this;
         wx.request({
            url: "http://192.168.50.51:5000/user/drop",
            method: "POST",
            header: {
                "content-type": "application/json",
                "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomId: app.globalData.roomId,
                filename: 'no',
            },
            success: function (res) {
                console.log(res.data)
            }
        })
        that.setData({
            hasSelectAward: true,
        })
        
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
    selectAward: function (e) {
        //上传服务器
        var that = this;
        console.log(e.currentTarget.dataset.awardindex)
        console.log(e.currentTarget.dataset.alist[e.currentTarget.dataset.awardindex].prizeId)
        wx.request({
            url: "http://192.168.50.51:5000/user/chooseprize",
            method: "POST",
            header: {
                "content-type": "application/json",
                "Authorization": "Bearer " + app.globalData.token
            },
            data: {
                roomid: app.globalData.roomId,
                prizeid: e.currentTarget.dataset.alist[e.currentTarget.dataset.awardindex].prizeId,
            },
            success: function (res) {
                console.log(res.data)
                
            }
        })
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
    imgResult: function (imgUrl) {
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
                if(res.data.data.awardList.length == 0){
                    that.setData({
                        judgement: false
                    })
                }
                that.setData({
                    prizeType: res.data.data.resname,
                    prizeIndex: res.data.data.reslevel - 1,
                    diceResult: res.data.data.dicelist,
                    awardList: res.data.data.awardList,
                    hasDiceEffect: false,
                    hasPutDice: true,
                })
            }
        })
    },
    toRemainAward: function () {
        wx.navigateTo({
            url: '../remainAward/remainAward'
        })
    },
    toMyAward: function () {
        wx.navigateTo({
            url: '../myAward/myAward'
        })
    }
})