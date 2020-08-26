<template>
    <transition
      :css="false"
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
  methods: {
    enter (el, done) {
      this.$nextTick(() => {
        Velocity(el, 'transition.slideUpIn', { duration: 400 }, function () {
          done()
        })
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', { duration: 400 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped>

</style>
