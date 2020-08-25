<template>
    <div class="player">
      <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
      <MiniPlayer></MiniPlayer>
      <ListPlayer></ListPlayer>
      <audio ref="audio" :src="audioUrl" @timeupdate="timeupdate($event)" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { setLocalStorage, getLocalStorage, getRandom } from '../tools/tools'
export default {
  name: 'Player',
  data: function () {
    return {
      audioUrl: null,
      totalTime: 0,
      currentTime: 0
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historySong',
      'historyList',
      'voiceVolume',
      'isShowMiniPlayer'
    ])
  },
  created () {
    // 1 监听收藏列表变化
    const favoriteList = getLocalStorage('favoriteList')
    // 初始化收藏列表，localStorage初始化为 null
    if (!favoriteList) return
    this.setFavoriteList(favoriteList)
    // 2 监听历史播放列表变化
    const historyList = getLocalStorage('historyList')
    // 初始化收藏列表，localStorage初始化为 null
    if (!historyList) return
    this.setHistoryList(historyList)
  },
  mounted () {
    const Audio = this.$refs.audio
    Audio.ondurationchange = () => {
      this.totalTime = Audio.duration
      Audio.volume = this.voiceVolume
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList',
      'setVoiceVolume',
      'setIsPlaying'
    ]),
    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.random) {
        this.setCurrentIndex(getRandom(this.songs.length - 1, 0))
      }
      setTimeout(() => {
        this.$refs.audio.play()
      }, 100)
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 播放
        this.$refs.audio.play()
        this.setHistorySong(this.currentSong)
      } else {
        // 暂停
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      const Audio = this.$refs.audio
      Audio.ondurationchange = () => {
        this.totalTime = Audio.duration
        if (this.isPlaying) {
          Audio.play()
        } else {
          Audio.pause()
        }
      }
    },
    curTime (newValue) {
      this.$refs.audio.currentTime = newValue
    },
    currentSong (newValue) {
      const Audio = this.$refs.audio
      // vip 歌曲禁止播放
      if (!newValue.url) {
        this.setIsPlaying(false)
        return
      }
      this.audioUrl = newValue.url
      if (this.isPlaying) {
        // 添加到播放历史
        this.setHistorySong(newValue)
        // 设置音乐播放和总时长
        Audio.ondurationchange = () => {
          this.totalTime = Audio.duration
          Audio.play()
        }
      }
    },
    favoriteList (newValue) {
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue) {
      setLocalStorage('historyList', newValue)
    },
    voiceVolume (newValue) {
      this.$refs.audio.volume = newValue
    }
  }
}
</script>

<style scoped>
  .player{
    position: relative;
    z-index: 999;
  }
</style>
