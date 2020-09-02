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
  SET_ERROR_MESSAGE,
  IS_SHOW_ERROR
} from './mutations-type'

export default {
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_SONG_DETAIL] (state, options) {
    state.songs = options.list
    if (options.index !== undefined) {
      state.currentIndex = options.index
    }
    state.currentSong = state.songs[state.currentIndex]
  },
  [SET_SONG_LYRIC] (state, flag) {
    state.currentLyric = flag
  },
  [SET_LYRIC_AUTHOR] (state, flag) {
    state.lyricAuthor = flag
  },
  [SET_DEL_SONG] (state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      state.songs = []
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
    state.currentSong = state.songs[index]
  },
  [SET_CURRENT_TIME] (state, value) {
    state.currentTime = value
  },
  [SET_FAVORITE_SONG] (state, item) {
    let result
    const arr = state.favoriteList
    for (let i = 0; i < arr.length; i++) {
      if (item.id === arr[i].id) {
        result = i
        break
      }
    }
    if (result === undefined) {
      state.favoriteList.push(item)
    } else {
      state.favoriteList.splice(result, 1)
    }
  },
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, item) {
    const result = state.historyList.find(function (value) {
      return value.id === item.id
    })
    if (result === undefined) {
      // 历史播放列表最大存储数据个数=30，超过则从最前面删除
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(item)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  },
  [SET_VOICE_VOLUME] (state, value) {
    if (value < 0) {
      value = 0
    } else if (value > 1) {
      value = 1
    }
    state.voiceVolume = value
  },
  [SET_SONGS_INIT] (state, value) {
    state.isSongsInit = value
  },
  [SET_ERROR_MESSAGE] (state, value) {
    state.errorMessage = value
  },
  [IS_SHOW_ERROR] (state, value) {
    state.isShowError = value
  }
}
