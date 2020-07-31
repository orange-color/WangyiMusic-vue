<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="swiper">
    <swiper-slide class="cd">
      <div>
        <div class="cd-wrapper" ref="cdWrapper">
          <img v-lazy="currentSong.picUrl" alt="">
        </div>
        <p v-html="getFirstLyric()"></p>
      </div>
    </swiper-slide>
    <swiper-slide class="lyric">
      <div class="voice">
        <span class="voice-icon"></span>
        <div class="progress-box" @touchstart.stop.prevent="drag($event)">
          <div class="progress-bar" ref="voiceBar">
            <div class="progress-line" ref="voiceLine">
              <div class="progress-dot"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lyric-content">
        <ScrollView ref="iscroll">
          <ul ref="lyricBox" class="lyricBox">
            <li ref="lyric" v-for="(value,time) in this.currentLyric" :class="{'active': (currentLineNum===time)}" :key="time" v-html="value"></li>
            <li v-for="value in this.lyricAuthor" :key="value">{{value}}</li>
          </ul>
        </ScrollView>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data: function () {
    return {
      swiperOptions: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          // 自定义分类器类名
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // 监视器，子元素 swiperslide 变化后，自动初始化
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0',
      firstLyric: '0',
      isScrolling: false,
      timerId: null
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      require: true
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric',
      'lyricAuthor',
      'curTime'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 播放
        this.$refs.cdWrapper.classList.add('active')
      } else {
        // 暂停
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      if (this.currentLyric.length === 0) return
      // 1 歌词高亮同步
      const lineNum = Math.floor(newValue) + ''
      // 若歌词列表中查找不到当前时间的key，则递减查找前一句
      this.currentLineNum = this.getLyricActive(lineNum)
      // 2 歌词滚动同步
      if (this.isScrolling) return
      const activeLi = document.querySelector('.lyricBox>li.active')
      if (!activeLi) return
      this.$refs.iscroll.scrollTo(0, -activeLi.offsetTop, 1000)
    },
    // 初始化第一句歌词高亮
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.firstLyric = this.currentLineNum = key
        return false
      }
    }
  },
  methods: {
    ...mapActions([
      'setVoiceVolume'
    ]),
    getFirstLyric () {
      return this.currentLyric[0]
    },
    getLyricActive (lineNum) {
      if (parseInt(lineNum) <= parseInt(this.firstLyric)) {
        return this.firstLyric
      }
      const result = this.currentLyric[lineNum]
      if (result === undefined || result === null) {
        --lineNum
        return this.getLyricActive(lineNum)
      }
      return lineNum + ''
    },
    drag (e) {
      const voiceBar = this.$refs.voiceBar
      const barWidth = voiceBar.offsetWidth
      const normalOffset = voiceBar.offsetLeft
      let currentOffset = e.touches[0].clientX
      let offsetX = currentOffset - normalOffset
      document.ontouchmove = (e) => {
        e.stopPropagation()
        currentOffset = e.touches[0].clientX
        offsetX = currentOffset - normalOffset
        if (offsetX < 0) {
          offsetX = 0
        } else if (offsetX > barWidth) {
          offsetX = barWidth
        }
        this.$refs.voiceLine.style.width = offsetX + 'px'
        const radio = offsetX / barWidth
        this.setVoiceVolume(radio)
      }
      document.ontouchend = (e) => {
        e.stopPropagation()
        this.$refs.voiceLine.style.width = offsetX + 'px'
        const radio = offsetX / barWidth
        this.setVoiceVolume(radio)
        document.ontouchmove = null
        document.ontouchend = null
      }
    }
  },
  mounted () {
    this.$refs.iscroll.scrollStart(() => {
      this.timerId && clearTimeout(this.timerId)
      this.isScrolling = true
    })
    this.$refs.iscroll.scrollEnd(() => {
      if (!this.isScrolling) return
      this.timerId = setTimeout(() => {
        this.isScrolling = false
      }, 5000)
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin.scss';
  @import '../../assets/css/variable.scss';
  .swiper{
    position: fixed;
    top: 100px;
    bottom: 250px;
    left: 0;
    right: 0;
    .cd{
      position: relative;
      &>div{
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        .cd-wrapper{
          overflow: hidden;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 20px solid rgba(0,0,0,0.3);
          animation: sport 25s linear infinite;
          animation-play-state: paused;
          &.active{
            animation-play-state: running;
          }
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        p{
          margin-top: 50px;
          text-align: center;
          color: #cccccc;
          @include clamp(2);
          @include font_size($font_medium);
        }
      }
    }
    .lyric{
      position: relative;
      width: 100%;
      height: 100%;
      .voice{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 40px;
        box-sizing: border-box;
        opacity: 0.9;
        span{
          display: inline-block;
          width: 36px;
          height: 36px;
          background: url('../../assets/images/voice.png') no-repeat;
          background-size: cover;
        }
        .progress-box{
          flex: 1 auto;
          height: 30px;
          margin: 0 30px;
          .progress-bar{
            height: 5px;
            margin-top: 12.5px;
            background: #999;
            border-radius: 20px;
            .progress-line{
              position: relative;
              width: 50%;
              height: 100%;
              background: #cccccc;
              border-radius: 20px;
              .progress-dot{
                position: absolute;
                top: 50%;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #eeeeee;
                margin-left: 100%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
      .lyric-content{
        position: absolute;
        top: 100px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        ul{
          position: absolute;
          top: 370px;
          left: 0;
          width: 100%;
          padding-bottom: 100%;
          li{
            padding: 30px 60px;
            text-align: center;
            @include font_size($font_medium_s);
            color: #cccccc;
            box-sizing: border-box;
            &.active{
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  @keyframes sport {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import '../../assets/css/mixin.scss';
  .my-bullet{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ffffff;
    margin: 0 8px;
  }
  .my-bullet-active{
    width: 40px;
    border-radius: 15px;
    transition: all .5s linear;
    @include bg_color;
  }
</style>
