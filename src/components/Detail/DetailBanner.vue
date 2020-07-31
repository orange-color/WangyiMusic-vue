<template>
    <div class="detail-top">
      <div class="img-container">
        <img v-lazy="path" alt="">
        <div class="mask" ref="mask"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DetailBanner',
  props: {
    path: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    changeMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
  .detail-top{
    position: relative;
    z-index: 10;
    width: 100%;
    height: 600px;
    overflow: hidden;
    img{
      width: 100%;
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0;
    }
  }
</style>
