<template>
  <TransitionItem>
    <div class="account">
      <AccountHeader @getSwitchNum="getSwitchNum"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </TransitionItem>
</template>

<script>
import AccountHeader from '../components/account/AccountHeader'
import AccountBottom from '../components/account/AccountBottom'
import TransitionItem from '../components/TransitionItem'
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
    AccountBottom,
    TransitionItem
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
</style>
