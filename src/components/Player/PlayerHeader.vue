<template>
    <div class="header">
      <div class="header-left" @click.stop="hiddenNormalPlayer"></div>
      <div class="header-title">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.singer}}</p>
      </div>
      <div class="header-right"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/mixin.scss';
  .header{
    position: relative;
    z-index: 12;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 20px;
    box-sizing: border-box;
    .header-left,.header-right{
      width: 84px;
      height: 84px;
    }
    .header-left{
      @include bg-img('../../assets/images/down')
    }
    .header-title{
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 70%;
      color: #FFFFFF;
      h3{
        @include font_size($font_large);
        white-space: nowrap;
        overflow: hidden;
      }
      p{
        margin-top: 5px;
        @include font_size($font_small);
        opacity: 0.6;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
</style>
