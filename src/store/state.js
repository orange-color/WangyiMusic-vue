import mode from './modeType'
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,
  modeType: mode.loop,
  songs: [],
  isSongsInit: false,
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  lyricAuthor: [],
  currentTime: 0,
  favoriteList: [],
  historyList: [],
  voiceVolume: 0.5,
  iScroll: null,
  isRememberPW: false,
  errorMessage: '',
  isShowError: false
}
