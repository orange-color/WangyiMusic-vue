<template>
  <div class="account-bottom">
    <div class="bottom-play" @click.stop="selectAllMusic" v-show="songLength !== 0">
      <span :class="{'active':isPlaying}"></span>
      <span>播放全部</span>
    </div>
    <div class="no-list" v-show="switchNum === 0 && songLength === 0">主人还没有收藏喜欢的歌曲哦~</div>
  <div class="no-list" v-show="switchNum === 1 && songLength === 0">主人你最可爱了，么么哒~</div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem :songs="(switchNum===0)?favoriteList:historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import SongListItem from '../SongListItem'
import ScrollView from '../ScrollView'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    SongListItem,
    ScrollView
  },
  data: function () {
    return {
      songLength: 0
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList',
      'isPlaying',
      'isSongsInit'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      require: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'getSongDetail',
      'setIsPlaying',
      'setSongsInit'
    ]),
    selectAllMusic () {
      this.setFullScreen(true)
      const songs = (this.switchNum === 0) ? this.favoriteList : this.historyList
      const ids = songs.map(function (obj) {
        return obj.id
      })
      this.getSongDetail({ ids: [ids], index: 0 })
    }
  },
  watch: {
    switchNum () {
      const songs = (this.switchNum === 0) ? this.favoriteList : this.historyList
      this.songLength = songs.length
      if (this.isSongsInit) {
        this.setSongsInit(false)
      }
    }
  },
  mounted () {
    this.songLength = this.favoriteList.length
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/mixin.scss';
  .account-bottom{
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    .bottom-play{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 280px;
      height: 80px;
      margin: 20px auto 10px;
      border: 1px solid #000;
      @include border_color;
      @include bg_sub_color;
      border-radius: 40px;
      span{
        display: inline-block;
        &:first-of-type{
          width: 46px;
          height: 46px;
          @include bg_img('../../assets/images/small_play');
          margin-right: 20px;
          &.active{
            @include bg_img('../../assets/images/small_pause');
          }
        }
        &:last-of-type{
          @include font_size($font_large);
          @include font_color;
        }
      }
    }
    .no-list{
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
      @include font_size($font_medium_s);
      @include font_color;
    }
    .bottom-wrapper{
      position: fixed;
      top: 210px;
      right: 0;
      @include position_bottom;
      left: 0;
      overflow: hidden;
    }
  }
</style>
