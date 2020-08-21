<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="iscroll">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in list" :key="index" ref="groupList">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul class="group-items">
              <li v-for="(obj, i) in value" :key="i" class="item" @click.stop="selectSinger(obj.id)">
                <img v-lazy="obj.picUrl" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <div class="fix-title" v-show="fixTitle!==''" ref="fixTitle">{{fixTitle}}</div>
      <ul class="list-keys" ref="keyList">
        <li
          v-for="(value, index) in keys"
          :key="index"
          :class="{'active':currentIndex===index}"
          @click.stop="keyDown(index)"
          @touchstart.stop="touchstart($event)"
          @touchmove.stop="touchmove($event)"
          :data-key="index"
        >{{value}}</li>
      </ul>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  data: function () {
    return {
      keys: [],
      list: [],
      currentIndex: 0,
      groupsTop: [],
      isKeyMove: false,
      beginY: 0,
      scrollY: 0,
      titleHeight: 0
    }
  },
  components: {
    ScrollView
  },
  created () {
    getAllArtists().then((obj) => {
      this.keys = obj.keys
      this.list = obj.list
    }).catch(function (err) {
      console.log(err)
    })
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.groupList.forEach((item) => {
          this.groupsTop.push(item.offsetTop)
        })
      })
      this.$nextTick(() => {
        this.titleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  methods: {
    keyDown (index) {
      this.currentIndex = index
      this.$refs.iscroll.scrollTo(0, -this.groupsTop[index] - 1, 2000)
    },
    touchstart (e) {
      this.isKeyMove = (parseInt(e.target.dataset.key) === this.currentIndex)
      this.beginY = e.touches[0].clientY
    },
    touchmove (e) {
      if (!this.isKeyMove) return
      const y = e.touches[0].clientY
      const offsetNum = (y - this.beginY) / e.target.offsetHeight
      let index = Math.floor(offsetNum) + parseInt(e.target.dataset.key)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this.keyDown(index)
    },
    selectSinger (id) {
      this.$router.push(`/home/singer/detail/${id}/singer`)
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY > 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  mounted () {
    this.$refs.iscroll.scrolling((y) => {
      this.scrollY = y
      if (y > 0 || y < this.$refs.iscroll.maxScrollY()) return
      const groupsTop = this.groupsTop
      let currentIndex = this.currentIndex
      const y0 = -groupsTop[currentIndex]
      const y1 = -groupsTop[currentIndex + 1]
      if (y > y0) {
        // 下拉
        --currentIndex
        // 标题固定到顶部
        this.$refs.fixTitle.style.top = 0 + 'px'
      } else if (y <= y1) {
        // 上拉
        ++currentIndex
        // 标题固定到顶部
        this.$refs.fixTitle.style.top = 0 + 'px'
      } else {
        // currentIndex 不变
        // 标题上推
        const isTitleY = y - y1
        if (isTitleY <= this.titleHeight && isTitleY > 0) {
          this.$refs.fixTitle.style.top = isTitleY - this.titleHeight + 'px'
        }
      }
      this.currentIndex = currentIndex
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .singer {
    width: 100%;
    height: 100%;
    .singer-wrapper{
      position: fixed;
      top: 184px;
      @include position_bottom;
      left: 0;
      right: 0;
      @include bg_sub_color;
      overflow: hidden;
      .list-wrapper{
        .list-group{
          .group-title{
            width: 100%;
            padding: 0 40px;
            height: 70px;
            line-height: 70px;
            box-sizing: border-box;
            @include bg_color;
            @include font_size($font_medium);
            color: #fff;
          }
          .group-items{
            .item{
              display: flex;
              align-items: center;
              height: 100px;
              padding: 10px 20px;
              border-bottom: 1px solid #ccc;
              img{
                width: 100px;
                height: 100px;
                margin-right: 20px;
                border-radius: 50%;
              }
              p{
                @include font_size($font_medium);
                @include font_color;
              }
            }
          }
        }
      }
      .fix-title{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 40px;
        height: 70px;
        line-height: 70px;
        @include bg_color;
        @include font_size($font_medium);
        color: #fff;
      }
      .list-keys{
        position: fixed;
        top: 55%;
        right: 0;
        padding: 0 15px 0 20px;
        box-sizing: border-box;
        transform: translateY(-50%);
        li{
          width: 35px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          @include font_size($font_small);
          @include font_color;
          &.active{
            @include bg_color;
            border-radius: 50%;
          }
        }
      }
    }
  }
  /*transition标签的过渡动画效果*/
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-enter-active{
    transition: all .5s linear 350ms;
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
    transition: all .5s ease-in-out;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(100%);
  }
</style>
