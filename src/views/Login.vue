<template>
  <div class="login">
    <Header>
      <div slot="center" class="header-center">登 录</div>
    </Header>
    <LoginBottom></LoginBottom>
  </div>
</template>

<script>
import Header from '../components/Header'
import LoginBottom from '../components/login/LoginBottom'
export default {
  name: 'Login',
  components: {
    Header,
    LoginBottom
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .login{
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    @include bg_sub_color;
    .header-center{
      color: #ffffff;
      font-weight: bold;
      @include font_size($font_large)
    }
  }
</style>
