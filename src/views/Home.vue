<template>
    <div class="home">
      <MainHeader></MainHeader>
      <Tabbar></Tabbar>
      <keep-alive include="Recommend,Singer,Rank,Search">
        <router-view></router-view>
      </keep-alive>
      <Player></Player>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import Tabbar from '../components/Tabbar'
import Player from '../views/Player'
export default {
  name: 'Home',
  components: {
    MainHeader,
    Tabbar,
    Player
  }
}
</script>

<style scoped>

</style>
