<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="login-error" ref="loginError" v-show="getIsShowError">
      <p>
        <b @click.stop="close" class="close">x</b>
        提示：<span>{{getErrorMessage}}</span>
      </p>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'CheckError',
  computed: {
    ...mapGetters([
      'getErrorMessage',
      'getIsShowError'
    ])
  },
  methods: {
    ...mapActions([
      'setIsShowError'
    ]),
    close () {
      this.setIsShowError(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpIn', 500, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', 500, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .login-error{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.5);
    p{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 65%;
      padding: 100px 70px 60px 60px;
      background: #f9f9f9;
      @include font_size($font_medium_s);
      text-align: center;
      line-height: 45px;
      border: 1px solid #666666;
      box-shadow: 0 0 10px grey;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      span{
        color: red;
      }
      .close{
        position: absolute;
        right: 0;
        top: 0;
        padding: 20px 30px;
        @include font_size($font_medium);
        color: #333;
      }
    }
  }
</style>
