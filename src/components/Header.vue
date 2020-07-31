<template>
  <div class="header" @click.stop="bgColor">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      index: 0,
      theme: ['theme', 'theme1', 'theme2']
    }
  },
  methods: {
    bgColor () {
      this.index++
      if (this.index >= this.theme.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/variable.scss';
  @import '../assets/css/mixin.scss';
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
    @include bg_color;
   .left,.right{
     width: 84px;
     height: 84px;
     *{
       width: 100%;
       height: 100%;
     }
   }
    .center{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
    }
  }
</style>
