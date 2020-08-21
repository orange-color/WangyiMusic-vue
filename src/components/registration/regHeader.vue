<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back"></div>
    <div slot="center" class="header-center">注册 / 修改密码</div>
  </Header>
</template>

<script>
import Header from '../../components/Header'
export default {
  name: 'regHeader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-center{
    @include font_size($font_large);
     color: #ffffff;
    font-weight: bold;
   }
</style>
