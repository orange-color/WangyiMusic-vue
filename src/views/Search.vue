<template>
    <div class="search" @click.stop="blur">
      <div class="search-box">
        <input ref="inputBox" type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search" @click.stop="focus">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      </div>
      <div class="search-info">
        <ScrollView ref="infoScrollVue">
          <div>
            <div class="search-hot">
              <h3>热门搜索</h3>
              <ul>
                <li v-for="(value, index) in hots" :key="index" @click.stop="selectedHot(value.first)">{{value.first}}</li>
              </ul>
            </div>
            <div class="search-history">
              <ul>
                <li v-for="(value, index) in searchHistory" :key="index" @click.stop="selectedHot(value)">
                  <div>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
                    <p>{{value}}</p>
                  </div>
                  <img @click.stop="delHistory(index)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
                </li>
              </ul>
            </div>
          </div>
        </ScrollView>
      </div>
      <div class="search-suggest" v-show="keywords !== ''">
        <ScrollView ref="suggestScrollVue">
          <ul>
            <li v-for="value in list" :key="value.id" @click.stop="selectMusic(value.id)">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
              <p>{{value.name}} - {{value.artists[0].name}}</p>
            </li>
          </ul>
        </ScrollView>
      </div>
    </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchSuggest, getSearchHot } from '../api/index'
import { mapActions, mapGetters } from 'vuex'
import { getLocalStorage, setLocalStorage } from '../tools/tools'

export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data: function () {
    return {
      keywords: '',
      list: [],
      hots: [],
      searchHistory: [],
      windowViewY: 0
    }
  },
  computed: {
    ...mapGetters([
      'songs'
    ])
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'getSongDetail',
      'setCurrentIndex'
    ]),
    // 获取搜索关键词的信息
    search () {
      if (this.keywords === '') return
      // 获取搜索建议数据
      getSearchSuggest(this.keywords).then((data) => {
        this.list = data.result.songs
      }).catch(err => {
        console.log(err)
      })
    },
    selectMusic (ids) {
      this.$refs.inputBox.blur()
      this.setFullScreen(true)
      this.getSongDetail({ ids: [ids], index: 0 })
      if (this.searchHistory.length === 0) {
        this.searchHistory.push(this.keywords)
        setLocalStorage('searchHistory', this.searchHistory)
      } else {
        // 遍历searchHistory查重，然后再存储
        if (!this.searchHistory.includes(this.keywords)) {
          this.searchHistory.push(this.keywords)
          setLocalStorage('searchHistory', this.searchHistory)
        }
      }
      this.keywords = ''
    },
    selectedHot (value) {
      // 通过JS脚本给input的value传递值时，时不会触发input事件，需要手动触发
      this.keywords = value
      this.search()
    },
    delHistory (index) {
      this.searchHistory.splice(index, 1)
      setLocalStorage('searchHistory', this.searchHistory)
    },
    focus () {
      this.$refs.inputBox.focus()
    },
    blur () {
      this.$refs.inputBox.blur()
    }
  },
  directives: {
    throttle: {
      inserted: function (el, binding) {
        let timerId = null
        let flag = true
        // 给input元素绑定input事件，当value发生变化时，调用search（）方法
        el.addEventListener('input', function () {
          if (!flag) return
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            binding.value()
          }, 500)
        })
      }
    }
  },
  created () {
    getSearchHot().then((data) => {
      this.hots = data.result.hots
    }).catch(err => {
      console.log(err)
    })
    if (!getLocalStorage('searchHistory')) return
    this.searchHistory = getLocalStorage('searchHistory')
  },
  mounted () {
    // 处理移动端软键盘显示底部控件上移问题
    if (/Android/i.test(navigator.userAgent)) {
      this.windowViewY = document.body.offsetHeight
      window.onresize = () => {
        if (window.innerHeight < this.windowViewY) {
          this.setMiniPlayer(false)
        } else {
          this.setMiniPlayer(this.songs.length !== 0)
        }
      }
    }
    // 监听滚动开始事件，软键盘隐藏
    this.$refs.suggestScrollVue.scrollStart(() => {
      this.blur()
    })
    this.$refs.infoScrollVue.scrollStart(() => {
      this.blur()
    })
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/variable';
  @import '../assets/css/mixin';
  .search{
    position: fixed;
    top: 184px;
    right: 0;
    bottom: 0;
    left: 0;
    @include bg_sub_color;
    @include position_bottom;
    .search-box{
      position: relative;
      height: 60px;
      margin: 20px;
      background: #ebecec;
      border-radius: 30px;
      input{
        width: 100%;
        height: 100%;
        padding-left: 80px;
        padding-right: 40px;
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium_s);
        box-sizing: border-box;
      }
      img{
        position: absolute;
        top: 50%;
        left: 20px;
        width: 40px;
        height: 40px;
        transform: translateY(-50%);
      }
    }
    .search-info{
      position: absolute;
      top: 100px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      .search-hot{
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        margin-bottom: 20px;
        h3{
          padding: 10px 0;
          @include font_size($font_medium);
          font-weight: bold;
        }
        ul{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          li{
            padding: 0 25px;
            margin: 30px 20px 0 0;
            height: 50px;
            line-height: 50px;
            @include font_size($font_small);
            @include font_color;
            border: 1px solid #ccc;
            border-radius: 30px;
          }
        }
      }
      .search-history{
        width: 100%;
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid #ccc;
          div{
            display: flex;
            align-items: center;
            img{
              width: 40px;
              height: 40px;
              margin-right: 20px;
            }
            p{
              @include font_size($font_medium_s);
              @include font_color;
            }
          }
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .search-suggest{
      overflow: hidden;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 40px;
      box-sizing: border-box;
      @include bg_sub_color;
      li{
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;
        img{
          width: 40px;
          height: 40px;
          margin-right: 20px;
        }
        p{
          @include font_size($font_medium_s);
          @include font_color;
        }
      }
    }
  }
</style>
