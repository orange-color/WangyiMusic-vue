<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img v-lazy="currentSong.picUrl" alt="">
      </div>
      <div class="canplay" v-show="!canPlay">
        <div class="canplay-wrapper">
          <div class="vip-link">
            <img v-lazy="currentSong.picUrl" alt="">
            <span>VIP</span>
          </div>
          <p>主人快加入 VIP 的队伍吧~</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NormalPlayer',
  data: function () {
    return {
      canPlay: true
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
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  methods: {
    ...mapActions([
      'setSongLyric',
      'setIsPlaying'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.slideUpIn', { duration: 500, delay: 200 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  computed: {
    // 全局共享数据工具 getters 方法的辅助函数 mapGetters
    // 用于简化 this.$store.getters.xxx，之后只需 this.xxx 即可调用 getters 中的方法
    ...mapGetters([
      'isFullScreen', // 把 `this.isFullScreen` 映射为 `this.$store.getters.isFullScreen`
      'currentSong'
    ])
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) return
      if (!newValue.url) {
        this.canPlay = false
      } else {
        this.canPlay = true
        this.setSongLyric(newValue.id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .normal-player{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    @include bg_color;
    .player-wrapper{
      position: relative;
      z-index: 21;
      width: 100%;
      height: 100%;
    }
    .player-bg{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 20;
      background: #000;
      overflow: hidden;
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        filter: blur(100px) hue-rotate(20deg);
        opacity: 0.8;
      }
    }
    .canplay {
      position: fixed;
      left: 0;
      top: 100px;
      right: 0;
      bottom: 0;
      z-index: 22;
      background: rgba(0,0,0,0.5);
      .canplay-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: #ffffff;
        border-radius: 20px;
        .vip-link {
          position: absolute;
          left: 50%;
          top: 20px;
          width: 450px;
          height: 450px;
          overflow: hidden;
          background: rgba(255, 255, 0, 0.4) url("../../assets/images/player-it666-disc.png") no-repeat;
          background-size: cover;
          border-radius: 50%;
          transform: translateX(-50%);
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 340px;
            height: 340px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
          span {
            position: absolute;
            left: 0;
            top: 50%;
            padding: 5px 15px;
            background: #ff0000;
            @include font_size($font_small);
            color: #ffffff;
            border-top-left-radius: 10px;
            border-bottom-right-radius: 10px;
            transform: translateY(-50%);
          }
        }
        p {
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 30px;
          padding: 20px 0;
          @include bg_color;
          @include font_size($font_medium_s);
          color: #ffffff;
          text-align: center;
          border-radius: 50px;
          animation: sport 5s linear infinite;
        }
      }
    }
  }
  @keyframes sport {
    0%{
      transform: scale(1);
    }
    30%{
      transform: scale(1.05);
    }
    50%{
      transform: scale(1);
    }
    70%{
      transform: scale(0.9);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
