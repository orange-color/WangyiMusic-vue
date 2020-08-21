<template>
  <div class="registration">
    <regHeader></regHeader>
    <regBottom></regBottom>
  </div>
</template>

<script>
import regHeader from '../components/registration/regHeader'
import regBottom from '../components/registration/regBottom'
export default {
  name: 'Registration',
  components: {
    regHeader,
    regBottom
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .registration{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 13;
    @include bg_sub_color;
  }
</style>
