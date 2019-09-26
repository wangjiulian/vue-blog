<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 11:46:39
 * @LastEditTime: 2019-09-11 14:36:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='scss'>
@import './style/mixin.scss';
html,
body {
  height: 100%;
}
#app {
  display: table;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #f0f2f5;
  color: #2c3e50;
  padding-bottom: 44px;
}

.avatar{
  border: 1px solid #fff;
  object-fit: cover;
}

 .top-title {
      position: relative;
      height: 28px;
      margin-top: 36px;
      margin-bottom: 62px;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
      line-height: 28px;
    }

    .top-title::after {
      @include ct;
      left: -6px;
      content: '';
      height: 55%;
      width: 3px;
      background: #000;

    }

@media (max-width: 1080px) {
  .index_content,
  .login-info {
    width: 770px !important;
  }
  .index_content {
    .info {
      padding-top: 20px !important;
    }
     .cover {
    width: 234px !important;
    height: 135px !important;
  }
  }

 
}

@media (max-width: 1440px) {
  .index_content,
  .login-info {
    width: 1026px !important;
  }
  .index_content {
    .info {
      padding-top: 20px !important;
    }
    .cover {
    width: 312px !important;
     height: 178.5px !important;
    
  }
  }
}
</style>
