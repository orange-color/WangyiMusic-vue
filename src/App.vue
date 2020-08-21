<template>
  <div class="app">
    <keep-alive include="Login" exclude="Registration,Home">
      <router-view></router-view>
    </keep-alive>
    <CheckError></CheckError>
  </div>
</template>
<script>
import CheckError from './components/CheckError'
export default {
  name: 'App',
  components: {
    CheckError
  }
}
</script>
<style lang="scss" scoped>
  .app{
    width: 100%;
    height: 100%;
  }
</style>
