<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView ref="scrollView">
        <div>
          <Banner :banners="banners" v-show="banners.length !== 0"></Banner>
          <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'" v-show="personalized.length !== 0"></Personalized>
          <Personalized :personalized="albums" :title="'最新音乐'" @select="fatherSelectItem" :type="'albums'" v-show="albums.length !== 0"></Personalized>
          <Songlist :songs="songs" v-show="songs.length !== 0"></Songlist>
        </div>
      </ScrollView>
    </div>
    <TransitionItem :delay="enterDelay">
      <router-view></router-view>
    </TransitionItem>
    <img src="" alt="" id="test">
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import Songlist from '../components/Recommend/Songlist'
import ScrollView from '../components/ScrollView'
import TransitionItem from '../components/TransitionItem'
export default {
  name: 'Recommend',
  data: function () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
      enterDelay: 500,
      isRefresh: false
    }
  },
  components: {
    Banner,
    Personalized,
    Songlist,
    ScrollView,
    TransitionItem
  },
  methods: {
    fatherSelectItem (id, type) {
      // 编程式链接
      this.$router.push({
        path: `/home/recommend/detail/${id}/${type}`
      })
    },
    async initRecommend () {
      await getBanner().then(data => {
        this.banners = data.banners
      }).catch(function (err) {
        console.log(err)
      })
      await getPersonalized().then(data => {
        this.personalized = data.result
      }).catch(function (err) {
        console.log(err)
      })
      await getNewAlbum().then(data => {
        this.albums = data.albums.splice(0, 6)
      }).catch(function (err) {
        console.log(err)
      })
      await getNewSong().then(data => {
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
  },
  created () {
    this.initRecommend()
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  #test{
    width: 200px;
    height: 200px;
    background: pink;
  }
  .recommend {
    width: 100%;
    height: 100%;
    .recommend-wrapper {
      position: fixed;
      top: 184px;
      @include position_bottom;
      left: 0;
      right: 0;
      @include bg_sub_color;
      overflow: hidden;
    }
  }
</style>
