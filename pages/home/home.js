//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello'
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('click home');
  },
  onLoad: function () {
    console.log('home onLoad');
  }
})
