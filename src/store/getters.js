export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    const obj = {
      name: '',
      singer: '',
      picUrl: null
    }
    if (state.songs.length !== 0) {
      return state.songs[state.currentIndex]
    }
    return obj
  },
  currentIndex (state) {
    return state.currentIndex
  },
  currentLyric (state) {
    return state.currentLyric
  },
  lyricAuthor (state) {
    return state.lyricAuthor
  },
  curTime (state) {
    return state.currentTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  },
  voiceVolume (state) {
    return state.voiceVolume
  },
  iScroll (state) {
    return state.iScroll
  },
  isSongsInit (state) {
    return state.isSongsInit
  },
  getIsRememberPW (state) {
    return state.isRememberPW
  },
  getErrorMessage (state) {
    return state.errorMessage
  },
  getIsShowError (state) {
    return state.isShowError
  }
}
