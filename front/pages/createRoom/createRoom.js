// pages/createRoom/createRoom.js
const app = getApp();
Page({
  data: {
    roomName: '', // 房间名
    personNum: '', //房间人数
    prizeList: [],
    // avatarUrl: "../../img/addpic.png",
    imgs: [], //本地图片地址数组
    picPaths: [], //网络路径
    height: 0,
  },
  onLoad: function () {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 44,
    });
    const awardTemp = ["状元", "对堂", "三红", "二举", "一秀"]
    var that = this;
    for (var i = 0; i < 5; i++) {
      var obj = {
        awardType: awardTemp[i],
        awardList: [{
          avatarUrl: "../../img/addpic.png",
          awardName: '',
          awardNum: 0,
          level: i + 1,
        }]
      };
      that.data.prizeList.push(obj);
      that.data.prizeList.awardList
    }
    that.setData({
      prizeList: that.data.prizeList
    })
    app.globalData.prizeList = that.data.prizeList
  },

  //添加上传图片
  chooseImageTap: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album', e)
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera', e)
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type, e) {
    var that = this;
    var imgsPaths = that.data.imgs;
    var thatData = this.data.prizeList
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        thatData[e.currentTarget.dataset.awardIndex].awardList[0].avatarUrl = res.tempFilePaths[0]
        //   console.log(res.tempFilePaths[0]);
        that.setData({
          prizeList: thatData
        })
        app.globalData.prizeList = thatData
        console.log(app.globalData.prizeList)
        //   that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  // upImgs: function (imgurl, index) {
  //   var that = this;
  //   wx.uploadFile({
  //     url: 'http://192.168.50.51:5000/file/upload',//
  //     filePath: imgurl,
  //     name: 'file',
  //     header: {
  //       'content-type': 'multipart/form-data'
  //     },
  //     formData: null,
  //     success: function (res) {
  //       console.log(res) //接口返回网络路径
  //       var data = JSON.parse(res.data)
  //         that.data.picPaths.push(data['msg'])
  //         that.setData({
  //           picPaths: that.data.picPaths
  //         })
  //         console.log(that.data.picPaths)
  //     }
  //   })
  // },
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
  awardNameInput: function (e) {
    var thatData = this.data.prizeList
    thatData[e.currentTarget.dataset.awardIndex].awardList[0].awardName = e.detail.value
    this.setData({
      prizeList: thatData
    })
    console.log(this.data.prizeList)
    app.globalData.prizeList = thatData
  },

  awardNumInput: function (e) {
    var thatData = this.data.prizeList
    thatData[e.currentTarget.dataset.awardIndex].awardList[0].awardNum = e.detail.value
    this.setData({
      prizeList: thatData
    })
    app.globalData.prizeList = thatData
  },
  onBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  onEnter: function () {
    //上传服务器
    var that = this;
    wx.request({
      url: "http://192.168.50.51:5000/user/createroom",
      method: "POST",
      header: {
        "content-type": "application/json",
        "Authorization": "Bearer " + app.globalData.token
      },
      data: {
        "roomname": app.globalData.roomName,
        "roomusernum": app.globalData.personNum,
        "prizeList": app.globalData.prizeList
      },
      success: function (res) {
        console.log(res.data)
        // console.log(res) //接口返回网络路径
        // var data = JSON.parse(res.data)
        // that.data.picPaths.push(data['msg'])
        // that.setData({
        //   picPaths: that.data.picPaths
        // })
        // console.log(that.data.picPaths)
      }
    })
    wx.reLaunch({
      url: '../game/game'
    })
  },
  

})