import {
  SET_FULL_SCREEN,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_LYRIC_AUTHOR,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST,
  SET_VOICE_VOLUME,
  SET_SONGS_INIT,
  IS_REMEMBER_PW,
  SET_ERROR_MESSAGE,
  IS_SHOW_ERROR
} from './mutations-type'

// 导入获取数据的api
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'

export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  async getSongDetail ({ commit }, options) {
    // 获取 song 信息
    const result = await getSongDetail({ ids: options.ids.join(',') })
    // 获取 song url 信息
    const urls = await getSongUrl({ id: options.ids.join(',') })
    // 对歌曲的url数据进行处理【乱序】，将id作为key，后面通过key查找绑定
    const urlObj = {}
    urls.data.forEach(function (value) {
      urlObj[value.id] = value
    })
    const list = []
    result.songs.forEach(function (song) {
      const obj = {}
      const id = song.id
      obj.name = song.name
      obj.id = id
      // 通过 key=id 查找音频 url 数据，绑定到 obj 上
      obj.url = urlObj[id].url
      // 通过 key=id 查找音频 type 数据，绑定到 obj 上
      obj.audioType = 'audio/' + urlObj[id].type
      let singer = ''
      song.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += ' / ' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = song.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, { list: list, index: options.index })
  },
  // 用于触发修改 currentLyric 和lyricAuthor 数据方法的方法
  async setSongLyric ({ commit }, id) {
    const value = await getSongLyric({ id: id })
    const { lyric, lyricAuthor } = getLyric(value)
    commit(SET_SONG_LYRIC, lyric)
    commit(SET_LYRIC_AUTHOR, lyricAuthor)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, value) {
    commit(SET_CURRENT_TIME, value)
  },
  setFavoriteSong ({ commit }, item) {
    commit(SET_FAVORITE_SONG, item)
  },
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistorySong ({ commit }, item) {
    commit(SET_HISTORY_SONG, item)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  },
  setVoiceVolume ({ commit }, value) {
    commit(SET_VOICE_VOLUME, value)
  },
  setSongsInit ({ commit }, value) {
    commit(SET_SONGS_INIT, value)
  },
  setIsRememberPW ({ commit }, value) {
    commit(IS_REMEMBER_PW, value)
  },
  setErrorMessage ({ commit }, value) {
    commit(SET_ERROR_MESSAGE, value)
  },
  setIsShowError ({ commit }, value) {
    commit(IS_SHOW_ERROR, value)
  }
}
// 返回歌词对象和歌词作者
function getLyric (value) {
  // 无歌词
  if (value.lrc === undefined) {
    return {
      lyric: {},
      lyricAuthor: ['暂无歌词']
    }
  }
  // 有歌词
  const lyric = parseLyric(value, 'lrc')
  if (value.tlyric.lyric) {
    const lyricCn = parseLyric(value, 'tlyric')
    for (const key in lyric) {
      lyric[key] += '<br>' + (lyricCn[key] || '')
    }
  }
  const lyricAuthor = []
  if (value.lyricUser && value.lyricUser.nickname) {
    lyricAuthor.push('歌词贡献者：' + value.lyricUser.nickname)
  }
  if (value.tlyricUser && value.tlyricUser.nickname) {
    lyricAuthor.push('歌词翻译者：' + value.transUser.nickname)
  }
  return { lyric, lyricAuthor }
}
// 歌词格式化
function parseLyric (value, type) {
  // 获取歌词数组
  const lyrics = value[type].lyric.split('\n')
  const timeReg = /\[\d*:[\d|.]*\]/g
  const minReg = /^\[\d*:/
  const secReg = /:[\d|.]*\]$/
  const obj = {}
  lyrics.forEach(function (lyric) {
    if (lyric.length === 0) return
    // 获取时间字符串数组
    const timeArr = lyric.match(timeReg)
    if (!timeArr) return
    // 获取歌词内容
    const lyricContent = lyric.replace(timeReg, '').trim()
    if (!lyricContent) return
    // 遍历时间字符串数组
    timeArr.forEach(function (timeStr, index) {
      // 获取歌词时间
      const min = timeStr.match(minReg)[0].substr(1, 2)
      const secStr = timeStr.match(secReg)[0]
      const sec = secStr.substr(1, secStr.length - 1)
      const time = parseInt(parseInt(min) * 60 + parseInt(sec))
      obj[time] = lyricContent
    })
  })
  // 返回歌词信息对象
  return obj
}
