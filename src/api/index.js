// 这个 JS 文件就是专门用于管理请求各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSong = () => Network.get('/personalized/newsong')
export const getPlaylist = (data) => Network.get('/playlist/detail', data)
export const getAlbum = (data) => Network.get('/album', data)
export const getSongDetail = (data) => Network.get('/song/detail', data)
export const getSongLyric = (data) => Network.get('/lyric', data)
export const getSongUrl = (data) => Network.get('/song/url', data)
// 封装获取热门歌手方法
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists?offset=0&limit=10').then(function (data) {
      resolve(data.artists.splice(0, 10))
    }).catch(function (err) {
      reject(err)
    })
  })
}
// 封装获取歌手列表方法
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    Network.get(`/artist/list?offset=0&limit=10&type=-1&area=-1&initial=${letter}`)
      .then(function (data) {
        resolve(data.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 并发获取热门歌手和歌手列表
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getSingerDetail = (data) => Network.get('/artists', data)
// 获取排行榜列表
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/toplist/detail').then(data => {
      const category = {
        officialList: [
          { name: '云音乐飙升榜', key: 3 },
          { name: '云音乐新歌榜', key: 0 },
          { name: '网易原创歌曲榜', key: 2 },
          { name: '云音乐热歌榜', key: 1 }
        ],
        recList: [
          { name: '云音乐说唱榜', key: 23 },
          { name: '云音乐电音榜', key: 25 },
          { name: '云音乐欧美新歌榜', key: 32 },
          { name: '抖音排行榜', key: 26 },
          { name: '云音乐ACG音乐榜', key: 22 },
          { name: '云音乐古典音乐榜', key: 24 }
        ],
        globalList: [
          { name: '美国Billboard周榜', key: 6 },
          { name: 'UK排行榜周榜', key: 5 },
          { name: 'Beatport全球电子舞曲榜', key: 21 },
          { name: '日本Oricon数字单曲周榜', key: 10 },
          { name: 'iTunes榜', key: 8 },
          { name: '英国Q杂志中文版周榜', key: 29 }
        ],
        otherList: [
          { name: 'KTV唛榜', key: 7 },
          { name: '法国 NRJ Vos Hits 周榜', key: 19 },
          { name: '新声榜', key: 27 },
          { name: '云音乐韩语榜', key: 28 },
          { name: '电竞音乐榜', key: 30 },
          { name: '云音乐欧美热歌榜', key: 31 }
        ],
        titles: {
          officialList: '官方榜',
          recList: '推荐榜',
          globalList: '全球榜',
          otherList: '更多榜单'
        }
      }
      for (const type in category) {
        if (type === 'titles') break
        const items = category[type]
        const itemsLength = category[type].length
        for (let i = 0; i < itemsLength; i++) {
          let flag = false
          data.list.forEach(function (value) {
            if (items[i].name === value.name) {
              category[type][i].id = value.id
              category[type][i].tracks = value.tracks
              category[type][i].picUrl = value.coverImgUrl
              category[type][i].updateFrequency = value.updateFrequency
              flag = true
            }
            if (flag) return false
          })
        }
      }
      resolve(category)
    }).catch(err => {
      reject(err)
    })
  })
}
export const getSearchSuggest = (keywords) => Network.get(`/search?keywords=${keywords}`)
export const getSearchHot = () => Network.get('/search/hot')
// 登陆注册相关API
export const getPhoneLogin = (phone, password) => Network.get(`/login/cellphone?phone=${phone}&password=${password}`)
export const getEmailLogin = (email, password) => Network.get(`/login?email=${email}&password=${password}`)
export const isCellphoneExistence = (phone) => Network.get(`/cellphone/existence/check?phone=${phone}`)
export const setRegistration = (data) => Network.get('/register/cellphone', data)
export const getVerificationCode = (phone) => Network.get(`/captcha/sent?phone=${phone}`)
