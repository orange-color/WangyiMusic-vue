<template>
  <swiper :options="swiperOptions" class="banner">
    <!--slides-->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="" />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperSlide
  },
  data: function () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          // 自动切换的事件间隔，单位 ms
          delay: 2000,
          // 当切换到最后一个slide时停止自动切换
          // 用户操作 swiper 之后，是否禁止 autoplay
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 监视器，子元素 swiperslide 变化后，自动初始化
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .banner{
    .item{
      img{
        width: 100%;
        height: 300px;
      }
    }
  }
</style>
<style lang="scss">
  @import '../../assets/css/mixin.scss';
  .banner{
    .swiper-pagination-bullet{
      width: 16px;
      height: 16px;
      background: #FFFFFF;
      opacity: 1;
    }
    .swiper-pagination-bullet-active{
      @include bg_color
    }
  }
</style>
