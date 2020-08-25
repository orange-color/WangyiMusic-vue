<template>
  <div class="detail" v-show="playlist.coverImgUrl !== undefined">
    <DetailHeader :title="playlist.name" ref="header"></DetailHeader>
    <DetailBanner :path="playlist.coverImgUrl" ref="banner"></DetailBanner>
    <div class="bottom" ref="bottom" v-show="playlist.tracks !== undefined">
      <ScrollView ref="scrollView" :probeType="probeType">
        <DetailBottom :playlist="playlist.tracks" ref="detailBottom"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlaylist, getAlbum, getSingerDetail } from '../api/index'
import DetailHeader from '../components/Detail/DetailHeader'
import DetailBanner from '../components/Detail/DetailBanner'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Detail',
  data: () => ({
    playlist: {},
    headerHeight: 0,
    currentY: 0,
    probeType: 3
  }),
  components: {
    DetailHeader,
    DetailBanner,
    DetailBottom,
    ScrollView
  },
  created () {
    const type = this.$route.params.type
    if (type === 'personalized' || type === 'rank') {
      getPlaylist({ id: this.$route.params.id }).then(data => {
        this.playlist = data.playlist
      }).catch(err => {
        console.log(err)
      })
    } else if (type === 'albums') {
      getAlbum({ id: this.$route.params.id }).then(data => {
        this.playlist = {
          name: data.album.name,
          coverImgUrl: data.album.picUrl,
          tracks: data.songs
        }
      }).catch(err => {
        console.log(err)
      })
    } else if (type === 'singer') {
      getSingerDetail({ id: this.$route.params.id }).then(data => {
        this.playlist = {
          name: data.artist.name,
          coverImgUrl: data.artist.picUrl,
          tracks: data.hotSongs
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    // 由于detail在请求到数据后在显示，这样需要一定的时间，故mounted需要进行延迟
    const timerId = setInterval(() => {
      if (this.$refs.bottom.offsetTop) {
        this.initDetail()
        this.setSongsInit(false)
        clearInterval(timerId)
      }
    }, 200)
  },
  computed: {
    ...mapGetters([
      'isFullScreen'
    ])
  },
  watch: {
    // 修复播音乐放器界面退出后，bottom 顶部不吸顶 bug
    isFullScreen (newValue) {
      if (newValue) {
        this.$refs.scrollView.scrollTo(0, this.currentY)
      }
    }
  },
  methods: {
    ...mapActions([
      'setSongsInit'
    ]),
    initDetail () {
      const oBanner = this.$refs.banner.$el
      const bannerclientH = this.$refs.header.$el.offsetHeight - this.$refs.bottom.offsetTop
      const defaultHeight = oBanner.offsetHeight
      const oPlayAll2 = this.$refs.detailBottom.$el.children[1]
      this.$refs.scrollView.scrolling(offset => {
        this.currentY = offset
        // 初始位置 offset = 0
        if (offset >= 0) {
          // + 向下滚动 放大
          const scale = 1 + offset / defaultHeight
          oBanner.style.transform = `scale(${scale})`
        } else {
          // - 向上滚动 缩小 模糊
          // banner 区域动画效果
          oBanner.style.transform = `translateY(${offset / 2}px)`
          const scale = Math.abs(offset) / defaultHeight
          if (scale <= 1) {
            this.$refs.banner.changeMask(scale)
          }
          if (offset <= bannerclientH) {
            // bottom 头部吸顶效果
            oPlayAll2.classList.add('active')
            oPlayAll2.style.transform = `translateY(${bannerclientH - offset}px)`
          } else {
            // bottom 头部样式恢复
            oPlayAll2.classList.remove('active')
          }
        }
      })
    }
  },
  beforeDestroy () {
    this.$refs.scrollView.destroy()
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .detail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 888;
    @include bg_sub_color;
    .bottom{
      position: fixed;
      top: 500px;
      left: 0;
      @include position_bottom;
      right: 0;
      z-index: 11;
    }
  }
</style>
