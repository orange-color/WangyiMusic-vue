<template>
  <div class="container" v-show="isShow">
    <p class="not-found" @click="refresh">
      页面丢了~ 尝试
      <span>刷新</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    refresh () {
      this.$forceUpdate()
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .container{
    position: fixed;
    top: 100px;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    @include bg_sub_color;
    @include font_size($font_medium);
    @include font_color;
    .not-found{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      span{
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
</style>
