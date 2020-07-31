<template>
  <div class="detail-bottom">
    <ul>
      <li class="bottom-top" @click.stop="selectAllMusic">
        <div class="bottom-icon" :class="{'active':isPlaying}" @click.stop="play"></div>
        <div class="bottom-title">播放全部</div>
      </li>
      <li class="bottom-item" v-for="(value,index) in playlist" :key="value.id" @click.stop="selectMusic(index)">
        <div class="item-left">
          <h3>{{value.name}}</h3>
          <p>{{value.al.name}} - {{value.ar[0].name}}</p>
        </div>
        <div class="item-right"></div>
      </li>
    </ul>
    <div class="bottom-top2" @click.stop="selectAllMusic" ref="elePlayAll">
      <div class="bottom-icon" :class="{'active':isPlaying}" @click.stop="play"></div>
      <div class="bottom-title">播放全部</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  data: function () {
    return {
      playAllHeight: 0
    }
  },
  methods: {
    // 全局共享数据工具 actions 方法的辅助函数 mapActions
    // 用于简化 this.$store.dispatch('xxx', true)，之后只需 this.xxx 即可调用 actions 中的方法
    ...mapActions([
      'setFullScreen', // 将 `this.setFullScreen(true)` 映射为 `this.$store.dispatch('setFullScreen', true)`
      'setMiniPlayer',
      'getSongDetail',
      'setCurrentIndex',
      'setIsPlaying',
      'setSongInit'
    ]),
    selectMusic (index) {
      if (!this.isSongsInit) {
        this.songsInit(index)
      } else {
        this.setCurrentIndex(index)
      }
      this.setFullScreen(true)
    },
    selectAllMusic () {
      if (!this.isSongsInit) {
        this.songsInit(0)
      } else {
        this.setCurrentIndex(0)
      }
      this.setFullScreen(true)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    songsInit (index) {
      const ids = this.playlist.map(function (obj) {
        return obj.id
      })
      this.getSongDetail({ ids: [ids], index: index })
      this.setSongInit(true)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'isSongsInit'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .detail-bottom{
    position: relative;
    overflow: hidden;
    @include bg_sub_color;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    ul{
      width: 100%;
      li{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
      }
      .bottom-top{
        display: flex;
        align-items: center;
        .bottom-icon{
          width: 60px;
          height: 60px;
          margin-right: 20px;
          @include bg_img('../../assets/images/small_play');
          &.active{
            @include bg_img('../../assets/images/small_pause')
          }
        }
        .bottom-title{
          @include font_size($font_large);
          @include font_color;
        }
      }
      .bottom-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-left{
          width: 90%;
          h3{
            @include font_color;
            @include font_size($font_medium);
            @include no-wrap;
          }
          p{
            margin-top: 10px;
            @include font_color;
            @include font_size($font_small);
            @include no-wrap;
            opacity: 0.8;
          }
        }
        .item-right{
          width: 50px;
          height: 50px;
          @include bg_img('../../assets/images/small_play')
        }
      }
    }
    .bottom-top2{
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px;
      @include bg_sub_color;
      border-bottom: 1px solid #cccccc;
      box-sizing: border-box;
      opacity: 0;
      .bottom-icon{
        width: 60px;
        height: 60px;
        margin-right: 20px;
        @include bg_img('../../assets/images/small_play');
        &.active{
          @include bg_img('../../assets/images/small_pause')
        }
      }
      .bottom-title{
        @include font_size($font_large);
        @include font_color;
      }
    }
  }
</style>
