<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
import { mapGetters } from 'vuex'
export default {
  name: 'ScrollVue',
  data: function () {
    return {
      iscroll: null,
      routerPath: ''
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 1,
      require: true
    },
    time: {
      type: Number,
      default: 200,
      require: true
    }
  },
  methods: {
    // 提供一个监听的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 200)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    },
    currentY () {
      return this.iscroll.y
    },
    maxScrollY () {
      return this.iscroll.maxScrollY
    },
    scrollStart (fn) {
      this.iscroll.on('scrollStart', function () {
        fn()
      })
    },
    scrollEnd (fn) {
      this.iscroll.on('scrollEnd', function () {
        fn()
      })
    },
    destroy () {
      this.iscroll = null
    },
    isScrollClick () {
      const userAgent = navigator.userAgent
      if (/iPhone|iPad|iPod|Macintosh/i.test(userAgent)) return false
      if (/Chrome/i.test(userAgent)) return true
      if (/Android/i.test(userAgent)) return true
    }
  },
  mounted () {
    setTimeout(() => {
      this.iscroll = new IScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbars: false,
        // 设置回弹频率
        probeType: this.probeType,
        // 解决拖拽卡顿问题
        // 关闭回弹效果
        bounce: false,
        // bounceEasing: 'quadratic',
        // 动画速度
        deceleration: 0.005,
        // 回弹动画时间
        // bounceTime: 200,
        scrollX: false,
        scrollY: true,
        disableTouch: false,
        disableMouse: true,
        hScrollbar: false,
        vScrollbar: false,
        // 关闭阻止默认行为，如click
        // preventDefault: false
        click: this.isScrollClick()
      })
      // 1 创建一个观察者对象
      /*
        * MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
        * mutationList：发生变化的数组，存储发生了变化的子节点
        * observer：观察者对象
        * */
      var observer = new MutationObserver((mutationList, observer) => {
        this.iscroll.refresh()
      })
      // 2 指定观察内容信息
      const config = {
        // attributes: true, // 检测属性变化
        childList: true, // 观察目标子节点的变化，是否有添加或者删除
        subtree: true, // 观察后代节点，默认为 false
        attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
        // characterData: true // 节点内容或节点文本的变动
        // attributeOldValue: true, // 观察 attributes 变动，是否需要记录变化前的属性值
        // characterDataOldValue: true // 观察 characterData 变动，是否需要记录变动前的值
      }
      // 3 告诉观察者需要观察谁，观察什么内容
      /*
        * 参数1：告诉观察者对象需要观察谁
        * 参数2：告诉观察者对象需要观察什么内容
        * */
      observer.observe(this.$refs.wrapper, config)
    }, 100)
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer'
    ])
  },
  watch: {
    // miniPlayer 显示/隐藏时，底部间隙预留，同时刷新iScroll，重新计算可滚动范围
    // wrapper元素设置bottom属性为@include position_bottom;
    isShowMiniPlayer (newValue) {
      document.documentElement.setAttribute('data-mini', newValue)
      this.refresh()
    }
  },
  // 针对 keep-alive 包裹的组件的钩子函数
  activated () {
    // 页面切换时到缓存组件时，刷新滚动条
    this.refresh()
  }
}
</script>

<style scoped lang="scss">
  #wrapper{
    width: 100%;
    height: 100%;
  }
</style>
