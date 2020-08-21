<template>
  <transition>
    <div class="account">
      <AccountHeader @getSwitchNum="getSwitchNum"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import AccountHeader from '../components/account/AccountHeader'
import AccountBottom from '../components/account/AccountBottom'
export default {
  name: 'Account',
  data: function () {
    return {
      /*
      * 0: favorite
      * 1: history
      * */
      switchNum: 0,
      songs: []
    }
  },
  components: {
    AccountHeader,
    AccountBottom
  },
  methods: {
    getSwitchNum (num) {
      this.switchNum = num
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .account{
    position: fixed;
    z-index: 777;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include bg_sub_color;
  }
  /*transition标签的过渡动画效果*/
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-enter-active{
    transition: all .5s linear 350ms;
  }
  .v-enter-to{
    opacity: 1;
    transform: translateX(0);
  }
  .v-leave{
    opacity: 1;
    transform: translateX(0);
  }
  .v-leave-active{
    transition: all .5s  ease-in-out;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(100%);
  }
</style>
