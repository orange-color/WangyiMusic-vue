<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left" @click.stop="mode">
            <div class="mode loop" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲循环</p>
            <p v-else-if="this.modeType === 2">随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click.stop="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="IScroll">
            <ul>
              <li class="item" v-for="(value, index) in songs" :key="value.id">
                <div class="item-left" @click.stop="play(index)">
                  <div class="item-play" ref="play" :class="{'active':isPlay(index)}"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" ref="favorite" :class="{'active':isFavorite(value)}" @click.stop="favorite(value,index)"></div>
                  <div class="item-close" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data: function () {
    return {}
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownBigOut', 500, function () {
        done()
      })
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
    del (index) {
      const currentIndex = this.currentIndex
      // 设置激活样式匹配 currentIndex
      if (this.isPlaying === true && this.songs.length > 1) {
        if (index === currentIndex) {
          this.$refs.play[currentIndex + 1].classList.add('active')
        } else if (index < currentIndex) {
          this.setCurrentIndex(currentIndex - 1)
        }
      }
      // 删除 songs 对应的数据
      this.setDelSong(index)
    },
    delAll () {
      // 删除 songs 所有数据
      this.setDelSong()
    },
    // 切换播放状态
    play (index) {
      const currentIndex = this.currentIndex
      if (index === currentIndex) {
        this.setIsPlaying(!this.isPlaying)
      } else {
        this.setCurrentIndex(index)
        this.setIsPlaying(true)
      }
    },
    // 监听播放按钮样式变化
    isPlay (index) {
      if (this.isPlaying) {
        return index === this.currentIndex
      } else {
        return false
      }
    },
    favorite (value, index) {
      this.setFavoriteSong(value)
      this.$refs.favorite[index].classList.toggle('active')
    },
    // 初始化收藏样式
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
      'isShowListPlayer',
      'songs',
      'currentIndex',
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
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.IScroll.refresh()
      }
    },
    songs () {
      if (this.songs.length === 0) {
        this.setFullScreen(false)
        this.setMiniPlayer(false)
        this.setListPlayer(false)
        this.setIsPlaying(false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .list-player{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5) !important;
    @include bg_sub_color;
    .player-wrapper{
      position: absolute;
      left: 5%;
      bottom: 50px;
      width: 90%;
      @include bg_sub_color;
      border-radius: 20px;
      border: 1px solid #000;
      .player-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100px;
        padding: 0 20px;
        box-sizing: border-box;
        .top-left{
          display: flex;
          align-items: center;
          .mode{
            width: 56px;
            height: 56px;
            margin-right: 10px;
            &.loop{
              @include bg_img('../../assets/images/small_loop');
            }
            &.one{
              @include bg_img('../../assets/images/small_one');
            }
            &.random{
              @include bg_img('../../assets/images/small_shuffle');
            }
          }
          p{
            @include font_size($font_medium_s);
            @include font_color;
          }
        }
        .top-right{
          .del{
            width: 86px;
            height: 86px;
            @include bg_img('../../assets/images/small_del')
          }
        }
      }
      .player-middle{
        overflow: hidden;
        width: 100%;
        height: 700px;
        padding: 0 20px;
        box-sizing: border-box;
        ul{
          .item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100px;
            padding-right: 20px;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            .item-left{
              display: flex;
              align-items: center;
              width: 80%;
              .item-play{
                width: 56px;
                height: 56px;
                margin-right: 20px;
                @include bg_img('../../assets/images/small_play');
                &.active{
                  @include bg_img('../../assets/images/small_pause');
                }
              }
              p{
                width: 80%;
                @include font_size($font_medium_s);
                @include font_color;
                @include no-wrap;
              }
            }
            .item-right{
              display: flex;
              align-items: center;
              flex-basis: 46px;
              .item-favorite{
                width: 46px;
                height: 46px;
                @include bg_img('../../assets/images/small_un_favorite');
                &.active{
                  @include bg_img('../../assets/images/small_favorite')
                }
              }
              .item-close{
                width: 46px;
                height: 46px;
                margin-left: 20px;
                @include bg_img('../../assets/images/small_close')
              }
            }
          }
        }
      }
      .player-bottom{
        width: 100%;
        height: 100px;
        padding: 0 20px;
        line-height: 100px;
        box-sizing: border-box;
        //@include bg_color;
        p{
          text-align: center;
          color: #000;
          @include font_size($font_medium);
        }
      }
    }
  }
</style>
