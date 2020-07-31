<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
  @import '../assets/css/variable.scss';
  @import '../assets/css/mixin.scss';
  .tabbar{
    display: flex;
    justify-content: left;
    width: 100%;
    height: 84px;
    @include bg_sub_color;
    .item{
      flex: 1 auto;
      text-align: center;
      span{
        line-height: 84px;
        @include font_size($font_medium_s);
        @include font_color;
      }
      &.router-link-active{
        span{
          display: inline-block;
          height: 100%;
          @include font_active_color;
          border-bottom: 5px solid #000000;
          @include border_color;
          box-sizing: border-box;
          transition: all 1s
        }
      }
    }
  }
</style>
