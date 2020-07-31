<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span class="curtime" ref="currentTime">00:00</span>
        <div class="progress-box" @touchstart.stop.prevent="drag($event)">
          <div class="progress-bar" ref="bar">
            <div class="progress-line" ref="line">
              <div class="progress-dot"></div>
            </div>
          </div>
        </div>
        <span class="time" ref="totalTime">00:00</span>
      </div>
      <div class="bottom-controll">
        <div class="mode loop" @click.stop="mode" ref="mode"></div>
        <div class="prev" @click.stop="prev"></div>
        <div class="play" @click.stop="play" ref="play" :class="{'active':isPlaying}"></div>
        <div class="next" @click.stop="next"></div>
        <div class="favorite" @click.stop="favorite" ref="favorite" :class="{'active':isFavorite(currentSong)}"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formatTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  data: function () {
    return {
      isMove: false
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      require: true
    },
    currentTime: {
      type: Number,
      default: 0,
      require: true
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    // 进度条点击事件 和 拖拽事件
    drag (e) {
      const bar = this.$refs.bar
      const normalOffset = bar.offsetLeft
      const barWidth = bar.offsetWidth
      let currentOffset = e.touches[0].clientX
      let offsetX = currentOffset - normalOffset
      // 绑定 ontouchmove 事件
      document.ontouchmove = (e) => {
        e.stopPropagation()
        // 告诉 vue 现在在拖拽
        this.isMove = true
        currentOffset = e.touches[0].clientX
        offsetX = currentOffset - normalOffset
        if (offsetX < 0) {
          offsetX = 0
        } else if (offsetX > barWidth) {
          offsetX = barWidth
        }
        this.$refs.line.style.width = offsetX + 'px'
      }
      // 解除 ontouchmove ontouchend 绑定
      document.ontouchend = (e) => {
        e.stopPropagation()
        const radio = offsetX / barWidth
        this.setCurrentTime(radio * this.totalTime)
        this.isMove = false
        document.ontouchmove = null
        document.ontouchend = null
      }
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
      this.$refs.favorite.classList.toggle('active')
    },
    isFavorite (currentSong) {
      const result = this.favoriteList.find(function (curValue) {
        return curValue.id === currentSong.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'songs',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.className = 'mode loop'
      } else if (newValue === modeType.one) {
        this.$refs.mode.className = 'mode one'
      } else if (newValue === modeType.random) {
        this.$refs.mode.className = 'mode random'
      }
    },
    totalTime (newValue, oldValue) {
      if (!newValue) return
      const timeObj = formatTime(newValue)
      this.$refs.totalTime.innerText = timeObj.minute + ':' + timeObj.second
    },
    currentTime (newValue, oldValue) {
      // 填充 currentTime 数据
      const timeObj = formatTime(newValue)
      this.$refs.currentTime.innerText = timeObj.minute + ':' + timeObj.second
      // 播放进度同步进度条进度
      if (this.isMove) return
      const radio = newValue / this.totalTime
      this.$refs.line.style.width = this.$refs.bar.offsetWidth * radio + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .player-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    .bottom-progress{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 0 40px;
      box-sizing: border-box;
      span{
        @include font_size($font_small);
        color: #ffffff;
      }
      .progress-box{
        flex: 1 auto;
        height: 30px;
        margin: 0 30px;
        .progress-bar{
          height: 5px;
          margin-top: 12.5px;
          background: #cccccc;
          border-radius: 20px;
          .progress-line{
            position: relative;
            width: 0;
            height: 100%;
            background: #64e3ff;
            border-radius: 20px;
            .progress-dot{
              position: absolute;
              top: 50%;
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: #ffffff;
              margin-left: 100%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
    .bottom-controll{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 150px;
      padding: 0 40px 30px;
      box-sizing: border-box;
      &>div{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .mode{
        &.loop{
          @include bg_img('../../assets/images/loop');
        }
        &.one{
          @include bg_img('../../assets/images/one');
        }
        &.random{
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev{
        @include bg_img('../../assets/images/prev');
      }
      .play{
        width: 100px;
        height: 100px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
        &.active{
          @include bg_img('../../assets/images/favorite');
        }
      }
    }
  }
</style>
