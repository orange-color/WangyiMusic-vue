<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="iscroll" :probeType="probeType">
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(value, index) in list"
            :key="index"
            ref="groupList"
          >
            <h2 class="group-title">{{ keys[index] }}</h2>
            <ul class="group-items">
              <li
                v-for="(obj, i) in value"
                :key="i"
                class="item"
                @click.stop="selectSinger(obj.id)"
              >
                <div class="lazy-img">
                  <lazy-component>
                    <img :src="obj.picUrl" alt="" />
                  </lazy-component>
                </div>
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
        {{ fixTitle }}
      </div>
      <ul class="list-keys" ref="keyList">
        <li
          v-for="(value, index) in keys"
          :key="index"
          :class="{ active: keyIndex === index }"
          @touchstart.stop="touchstart($event)"
          @touchmove.stop="touchmove($event)"
          @click.stop="keyDown(index)"
          :data-key="index"
        >
          {{ value }}
        </li>
      </ul>
    </div>
    <TransitionItem>
      <router-view></router-view>
    </TransitionItem>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
import TransitionItem from '../components/TransitionItem'
export default {
  name: 'Singer',
  data: function () {
    return {
      keys: [],
      list: [],
      currentIndex: 0,
      keyIndex: 0,
      groupsTop: [],
      isKeyMove: false,
      probeType: 3,
      beginY: 0,
      scrollY: 0,
      titleHeight: 0,
      touchTarget: 0,
      flag: false
    }
  },
  components: {
    ScrollView,
    TransitionItem
  },
  created () {
    getAllArtists()
      .then(obj => {
        this.keys = obj.keys
        this.list = obj.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.groupList.forEach(item => {
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
      this.flag = true
      const offset = Math.abs(index - this.keyIndex)
      this.keyIndex = index
      this.$refs.iscroll.scrollTo(0, -this.groupsTop[index] - 1, 200 * offset)
    },
    touchstart (e) {
      // string -> number
      this.isKeyMove = parseInt(e.target.dataset.key) === this.keyIndex
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
    setTimeout(() => {
      this.$refs.iscroll.scrolling(y => {
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
        if (!this.flag) {
          this.keyIndex = currentIndex
        }
      })
      this.$refs.iscroll.scrollEnd(() => {
        this.flag = false
      })
    }, 200)
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    top: 184px;
    @include position_bottom;
    left: 0;
    right: 0;
    @include bg_sub_color;
    overflow: hidden;
    .list-wrapper {
      .list-group {
        .group-title {
          width: 100%;
          padding: 0 40px;
          height: 70px;
          line-height: 70px;
          box-sizing: border-box;
          @include bg_color;
          @include font_size($font_medium);
          color: #fff;
        }
        .group-items {
          .item {
            display: flex;
            align-items: center;
            height: 100px;
            padding: 10px 20px;
            border-bottom: 1px solid #ccc;
            .lazy-img {
              width: 100px;
              height: 100px;
              margin-right: 20px;
              border-radius: 50%;
              overflow: hidden;
              background: #dddddd;
              div{
                width: 100%;
                height: 100%;
                img {
                  width: 100%;
                  height: 100%;
                  background: transparent;
                }
              }
            }
            p {
              @include font_size($font_medium);
              @include font_color;
            }
          }
        }
      }
    }
    .fix-title {
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
    .list-keys {
      position: fixed;
      top: 55%;
      right: 0;
      padding: 0 15px 0 20px;
      box-sizing: border-box;
      transform: translateY(-50%);
      li {
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        @include font_size($font_small);
        @include font_color;
        &.active {
          @include bg_color;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
