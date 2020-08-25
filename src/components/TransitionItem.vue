<template>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <slot></slot>
    </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'TransitionItem',
  props: {
    delay: {
      type: Number,
      default: 500,
      require: true
    }
  },
  methods: {
    beforeEnter (el) {
      Velocity(el, { opacity: 0 }, { duration: this.delay })
    },
    enter (el, done) {
      this.$nextTick(() => {
        Velocity(el, 'transition.slideUpIn', { duration: 500 }, function () {
          done()
        })
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', { duration: 200 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped>

</style>
