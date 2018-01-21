import api from '../../../api/api.js'

Page({
  data: {
    title: '',
    gamesData: []
  },
  onLoad: function (options) {
    this.setData({ 
      title: options.title
    })
    api.getGamesByMonth({
      query: {
        month: options.month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let gamesData = res.data.data
          this.setData({ gamesData })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  handleTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})