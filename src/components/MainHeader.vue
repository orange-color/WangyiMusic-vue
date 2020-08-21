<template>
  <Header>
    <div class="header-left" slot="left"></div>
    <p class="header-title" slot="center">音乐</p>
    <div class="header-right" @click.stop="accountClick" slot="right"></div>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'mainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/home/account')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/variable.scss';
  @import '../assets/css/mixin.scss';
  .header-left{
    @include bg-img('../assets/images/logo')
  }
  .header-right{
    @include bg-img('../assets/images/account')
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_medium)
  }
</style>
