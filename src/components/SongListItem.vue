<template>
  <ul class="song-list">
    <li v-for="(value, index) in songs" :key="value.id" class="item" @click="selectMusic(index)">
      <img v-lazy="value.picUrl" alt="">
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SongListItem',
  data: function () {
    return {
      time: 0
    }
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  computed: {
    ...mapGetters([
      'isSongsInit'
    ])
  },
  created () {
    this.setSongsInit(false)
  },
  methods: {
    // 全局共享数据工具 actions 方法的辅助函数 mapActions
    // 用于简化 this.$store.dispatch('xxx', true)，之后只需 this.xxx 即可调用 actions 中的方法
    ...mapActions([
      'setFullScreen', // 将 `this.setFullScreen(true)` 映射为 `this.$store.dispatch('setFullScreen', true)`
      'setMiniPlayer',
      'getSongDetail',
      'setCurrentIndex',
      'setSongsInit'
    ]),
    selectMusic (index) {
      if (!this.isSongsInit) {
        const ids = this.songs.map(function (obj) {
          return obj.id
        })
        this.getSongDetail({ ids: [ids], index: index })
        this.setSongsInit(true)
      } else {
        this.setCurrentIndex(index)
      }
      this.setFullScreen(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .song-list{
    width: 100%;
    .item{
      display: flex;
      align-items: center;
      width: 100%;
      height: 200px;
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      img{
        width: 150px;
        height: 150px;
        margin-right: 20px;
        border-radius: 20px;
      }
      div{
        width: 75%;
        h3{
          @include font_size($font_large);
          @include font_color;
          @include no-wrap;
          font-weight: bold;
        }
        p{
          @include clamp(2);
          margin-top: 20px;
          @include font_size($font_small);
          @include font_color;
          opacity: 0.6;
        }
      }
    }
  }
</style>
