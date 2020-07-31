<template>
  <div class="mini-player" v-show="this.isShowMiniPlayer" ref="miniPlayer">
    <div class="player-wrapper">
      <div class="player-left" @click.stop="showNormalPlayer">
        <img :src="this.currentSong.picUrl" alt="" ref="cd">
        <div class="player-title">
          <h3>{{currentSong.name}}</h3>
          <p>{{currentSong.singer}}</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play" @click.stop="play" ref="play"></div>
        <div class="list" @click.stop="show"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    show () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'isFullScreen',
      'isShowMiniPlayer',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 播放
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        // 暂停
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/mixin.scss';
  .mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    @include bg_color;
    .player-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .player-left{
        display: flex;
        flex: 1 auto;
        width: 80%;
        img{
          margin-right: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          animation: sport 5s linear infinite;
          animation-play-state: paused;
          &.active{
            animation-play-state: running;
          }
        }
        .player-title{
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 75%;
          h3{
            @include font_size($font_medium);
            @include font_color;
            font-weight: bold;
            @include no-wrap;
          }
          p{
            @include font_size($font_small);
            @include font_color;
            @include no-wrap;
            opacity: 0.6;
          }
        }
      }
      .player-right{
        display: flex;
        align-items: center;
        .play {
          width: 60px;
          height: 60px;
          @include bg_img('../../assets/images/play');
          &.active{
            @include bg_img('../../assets/images/pause');
          }
        }
        .list{
          width: 100px;
          height: 100px;
          @include bg_img('../../assets/images/list');
          margin-left: 10px;
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
