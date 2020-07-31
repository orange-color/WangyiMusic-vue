<template>
  <div class="container" v-show="isShow">
    <div class="loading"></div>
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loader',
  data: function () {
    return {
      title: '正在加载中...',
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    background: rgba(0,0,0,0.5);
    transform: translate(-50%,-50%);
    .loading{
      width: 100px;
      height: 100px;
      margin: 20px auto;
      border: 5px solid #ffffff;
      border-radius: 50%;
      border-right-color: deepskyblue;
      animation: loading 3s linear infinite;
    }
    .title{
      font-size: 26px;
      text-align: center;
      color: #ffffff;
    }
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
