<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back()"></div>
    <ul slot="center" class="header-title">
      <li :class="{'active': (switchNum === 0)}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{'active': (switchNum === 1)}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'AccountHeader',
  data: function () {
    return {
      switchNum: 0
    }
  },
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('getSwitchNum', num)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/mixin.scss';
  .header-left{
    @include bg-img('../../assets/images/back')
  }
  .header-right{
    @include bg-img('../../assets/images/more')
  }
  .header-title{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 272px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    li{
      flex: 1 auto;
      height: 80px;
      line-height: 80px;
      font-weight: bold;
      @include font_size($font_small);
      color: #ffffff;
      text-align: center;
      &:first-of-type{
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,0.4);
      }
    }
  }
</style>
