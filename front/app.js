App({
  globalData: {
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    userInfo: {},
    hasRoom: 0,
    roomValue: '', // 房间邀请码
    roomName: '', // 房间名
    personNum: '', //房间人数
    award: ["状元", "对堂", "三红", "二举", "一秀"],
    prizeList: [], //奖品清单
    token: "",
    inviteCode: "",
  },
  onLaunch() {
  },
})
