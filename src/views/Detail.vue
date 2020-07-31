<template>
  <div class="detail">
    <DetailHeader :title="playlist.name" ref="header"></DetailHeader>
    <DetailBanner :path="playlist.coverImgUrl" ref="banner"></DetailBanner>
    <div class="bottom" ref="bottom">
      <ScrollView ref="scrollView">
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
    currentY: 0
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
    const bannerclientH = this.$refs.header.$el.offsetHeight - this.$refs.bottom.offsetTop
    const defaultHeight = this.$refs.banner.$el.offsetHeight
    const elePlayAll = this.$refs.detailBottom.$el.children[1]
    this.$refs.scrollView.scrolling(offset => {
      this.currentY = offset
      if (offset > 0) {
        // + 向下滚动 放大
        const scale = 1 + offset / defaultHeight
        this.$refs.banner.$el.style.transform = `scale(${scale})`
        // bottom 头部样式恢复
        if (offset >= bannerclientH) {
          elePlayAll.style.opacity = 0
          elePlayAll.style.top = bannerclientH - offset + 'px'
        }
      } else {
        // - 向上滚动 缩小 模糊
        // banner 区域动画效果
        this.$refs.banner.$el.style.transform = `translateY(${offset / 2}px)`
        const scale = Math.abs(offset) / defaultHeight
        if (scale <= 1) {
          this.$refs.banner.changeMask(scale)
        }
        // bottom 头部吸顶效果
        if (offset <= bannerclientH) {
          elePlayAll.style.opacity = 1
          elePlayAll.style.top = bannerclientH - offset + 'px'
        }
      }
    })
    this.setSongsInit(false)
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
    ])
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
