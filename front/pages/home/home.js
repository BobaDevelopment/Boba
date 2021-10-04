const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    hasRoom: 0,
    focusIndex: 0, // 光标所在位置
    roomValue: '', // 房间邀请码
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  createRoom: function() {
    wx.navigateTo({
      url: "../createRoom/createRoom"
    })
    this.setData({
      hasRoom: 0
    })
    
  },
  enterRoom: function() {
    this.setData({
      hasRoom: 1
    })
  },
  onBack: function() {
    this.setData({
      hasRoom: 0,
      focusIndex: 0, // 光标所在位置
      roomValue: '', // 实际输入的值
    })
  },
  onEnter: function() {

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        console.log(app.globalData.hasUserInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  setValue (e) {
    // 设置光标
    var roomValue = e.detail.value
    app.globalData.roomValue = e.detail.value;
    this.setData({
      roomValue: roomValue,
      focusIndex: roomValue.length,
      focus: roomValue.length < 6,
    })
  },
  inputBlur (e) {
    if (e.detail.value.length === 6) {
      this.triggerEvent('complated', {
        roomValue: e.detail.value
      })
    }
  },
})

