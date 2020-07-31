<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div v-for="value in personalized" :key="value.id" class="item" @click.stop="selectItem(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  data: function () {
    return {
      path: '',
      playlist: {}
    }
  },
  props: {
    personalized: {
      type: Array,
      default: () => [],
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    type: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    selectItem (id) {
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .personalized{
    @include bg_sub_color;
    .personalized-top{
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include bg_sub_color();
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      h3{
        @include font_size($font_large);
        @include font_color;
        font-weight: bold;
      }
    }
    .personalized-list{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      padding: 20px 0;
      .item{
        width: 200px;
        img{
          width: 100%;
          height: 200px;
          border-radius: 20px;
        }
        p{
          @include clamp(2);
          margin-bottom: 20px;
          @include font_size($font_small);
          @include font_color;
          text-align: center;
        }
      }
    }
  }
</style>
