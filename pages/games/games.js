import api from '../../api/api.js'
import util from '../../utils/util.js'
var localData = require('../../data/getData.js')
Page({
  data: {
    gamesData: [],
    current: 0,
    playId: -1
  },
  onLoad: function () {
    api.getGamesIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data
          this.getGames(idList)
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '醉挽大战'
    })
    console.log('111');
    console.log('localData', localData.getGamesData());
  },
  getGames: function (idList) {
    let gamesData = this.data.gamesData
    if (idList.length > 0) {
      api.getGameDetailById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let game = res.data.data
            game.contentType = 'story'
            game.story = util.filterContent(game.story)
            game.maketime = util.formatMakettime(game.maketime)
            gamesData.push(game)
          }
          this.getGames(idList)
        } 
      })
    } else {
      this.setData({ gamesData })
    }
  },
  handleChange: function (e) {
    let current = e.detail.current
    let length = this.data.gamesData.length

    if (current === length) {
      this.setData({
        current: length
      })
      wx.navigateTo({
        url: '../history/history?page=games',
        success: () => {
          this.setData({
            current: length - 1
          })
        }
      })
    }
  },
  switchContent: function (e) {
    let id = e.currentTarget.dataset.id
    let type = e.target.dataset.type

    let gamesData = this.data.gamesData
    let game = gamesData.find((game) => game.id === id)
    game.contentType = type

    this.setData({ gamesData })
  }
})