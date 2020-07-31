<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
          <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
          <Songlist :songs="songs"></Songlist>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import Songlist from '../components/Recommend/Songlist'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    Songlist,
    ScrollView
  },
  methods: {
    fatherSelectItem (id, type) {
      // 编程式链接
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  data: function () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner().then(data => {
      this.banners = data.banners
    }).catch(function (err) {
      console.log(err)
    })
    getPersonalized().then(data => {
      this.personalized = data.result
    }).catch(function (err) {
      console.log(err)
    })
    getNewAlbum().then(data => {
      this.albums = data.albums.splice(0, 6)
    }).catch(function (err) {
      console.log(err)
    })
    getNewSong().then(data => {
      const list = []
      data.result.forEach(function (value) {
        // 注意：每次需重新创建 obj ，这样引用的地址不会指向同一个
        const obj = {}
        obj.name = value.name
        obj.id = value.id
        obj.picUrl = value.picUrl
        let singer = ''
        const artists = value.song.artists
        const artistsLength = artists.length
        for (let i = 0; i < artistsLength; i++) {
          if (i === 0) {
            singer = artists[i].name
          } else {
            singer += '/' + artists[i].name
          }
        }
        obj.singer = singer
        // 通过给list添加obj，然后再赋值给this.songs，因为每次获取数据会重新创建list
        list.push(obj)
      })
      this.songs = list
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .recommend{
    width: 100%;
    height: 100%;
    .recommend-wrapper{
      position: fixed;
      top: 184px;
      @include position_bottom;
      left: 0;
      right: 0;
      @include bg_sub_color;
      overflow: hidden;
    }
  }
  /*transition标签的过渡动画效果*/
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-enter-active{
    transition: all .5s linear 400ms;
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
    transition: all .5s linear;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(100%);
  }
</style>
