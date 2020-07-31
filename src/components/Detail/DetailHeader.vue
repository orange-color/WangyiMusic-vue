<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back()"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
import { mapActions } from 'vuex'
export default {
  name: 'SubHeader',
  components: {
    Header
  },
  methods: {
    ...mapActions([
      'setSongInit'
    ]),
    back () {
      this.setSongInit(false)
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      require: true
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
    text-align: center;
    line-height: 100px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap;
  }
</style>
