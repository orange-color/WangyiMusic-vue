<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li class="rank-group" v-for="(value,index) in category.titles" :key="index">
            <h3 class="group-title">{{value}}</h3>
            <ul class="normal-group" v-if="value === '官方榜'">
              <li v-for="(obj, i) in category[index]" :key="i" @click.stop="rankDetail(obj.id)">
                <div class="rank-left">
                  <img :src="obj.picUrl" alt="">
                  <p>{{obj.updateFrequency}}</p>
                </div>
                <div class="rank-right">
                  <ol>
                    <li v-for="(text, j) in obj.tracks" :key="j">{{j+1}}.{{text.first}} - {{text.second}}</li>
                  </ol>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li v-for="(obj, i) in category[index]" :key="i" @click.stop="rankDetail(obj.id)">
                <div class="group-top">
                  <img v-lazy="obj.picUrl" alt="">
                  <p>{{obj.updateFrequency}}</p>
                </div>
                <div class="group-bottom">{{obj.name}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <TransitionItem :delay="enterDelay">
      <router-view></router-view>
    </TransitionItem>
  </div>
</template>

<script>
import { getTopListDetail } from '../api/index'
import ScrollView from '../components/ScrollView'
import TransitionItem from '../components/TransitionItem'
export default {
  name: 'Rank',
  components: {
    ScrollView,
    TransitionItem
  },
  data: function () {
    return {
      category: {},
      enterDelay: 600
    }
  },
  created () {
    getTopListDetail().then((data) => {
      this.category = data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    rankDetail (id) {
      this.$router.push(`/home/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
  .rank{
    width: 100%;
    height: 100%;
    .rank-wrapper{
      overflow: hidden;
      position: fixed;
      top: 184px;
      right: 0;
      left: 0;
      @include position_bottom;
      @include bg_sub_color;
      .rank-group{
        width: 100%;
        padding: 10px 35px;
        box-sizing: border-box;
        h3{
          width: 100%;
          padding: 20px 5px;
          @include font_color;
          @include font_size($font_large);
          font-weight: bold;
        }
        .normal-group{
          margin-bottom: 30px;
          li{
            display: flex;
            align-items: center;
            width: 100%;
            padding: 10px 0;
            .rank-left{
              position: relative;
              padding-right: 15px;
              img{
                width: 210px;
                height: 210px;
                border-radius: 10px;
              }
              p{
                position: absolute;
                left: 10px;
                bottom: 10px;
                @include font_size($font_small);
                color: #fff;
              }
            }
            .rank-right{
              width: 60%;
              li{
                padding: 10px;
                @include no-wrap;
                @include font_size($font_medium_s);
                @include font_color;
              }
            }
          }
        }
        .other-group{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          li{
            width: 210px;
            padding-bottom: 30px;
            .group-top{
              position: relative;
              img{
                width: 210px;
                height: 210px;
                border-radius: 10px;
              }
              p{
                position: absolute;
                left: 10px;
                bottom: 10px;
                @include font_size($font_small);
                color: #ffffff;
              }
            }
            .group-bottom{
              width: 210px;
              margin-top: 10px;
              @include font_size($font_small);
              @include font_color;
            }
          }
        }
      }
    }
  }
</style>
