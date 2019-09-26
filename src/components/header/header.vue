<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 13:44:31
 * @LastEditTime: 2019-09-11 13:53:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="header-component">
    <router-link to="/">
      <img class="logo" src="../../assets/logo.png" />
    </router-link>
    <div class="login-info">
      <div v-if="is_login" @click="showUserDetail" class="login">
        <img class="avatar" :src="user_info.avatar|filterAvatar" />
        <span class="nick-name">{{user_info.nick_name}}</span>
        <div @click="quitOut" class="div-quit">
          <span>退出</span>
          <img src="../../assets/quit-icon.png"/>
        </div>
      </div>
      <div v-if="!is_login" class="un-login">
        <img src="../../assets/avatar.png" />
        <p>
          <router-link to="/login">登录/</router-link>
          <router-link to="/register">注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_login: true, //是否登录
      user_info: {}
    };
  },
  mounted() {
    this.bindUserInfo();
  },
  activated(){
    this.bindUserInfo();
  },
  filters: {
    filterAvatar(val) {
      return val ? val : require("../../assets/avatar.png");
    }
  },
  methods: {
    //绑定用户信息
    bindUserInfo() {
      this.is_login = this.$cookie.get("login_token") ? true : false;
      let userInfoStr = this.$cookie.get("user_info");
      if (userInfoStr) {
        this.user_info = JSON.parse(userInfoStr);
      }
    },
    //退出
    quitOut() {
      this.$cookie.remove("uid");
      this.$cookie.remove("login_token");
      this.$cookie.remove("user_info");
      this.$cookie.remove("login_redirect");
      this.is_login = false;
    },
    //显示用户详情
    showUserDetail() {
      this.$router.push({
        path: "mine",
        query: {
          uid: this.$cookie.get("uid")
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./header.scss";
</style>