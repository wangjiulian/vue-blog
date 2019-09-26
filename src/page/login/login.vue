<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:55:08
 * @LastEditTime: 2019-09-12 11:03:10
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="login-wrapper">
    <div class="login-content">
      <p class="tab">
        <router-link class="active" to="/">登录</router-link>
        <router-link class="circle" to="/register">注册</router-link>
      </p>

      <div class="login-info-content">
        <div class="login-input">
          <div class="div-input">
            <img src="../../assets/phone.png" />
            <input type="text" v-model="mobile" placeholder="手机号" />
          </div>
          <p></p>
          <div class="div-input">
            <img src="../../assets/passwd.png" />
            <input type="password" v-model="password" placeholder="密码" />
          </div>
        </div>
        <div class="login-tip clearfix">
          <span @click="rememberPwd">
            <input v-model="remember" name="remmember" class="remember" type="checkbox" />记住我
          </span>
          <span>登录遇到问题?</span>
        </div>
        <p class="login-btn" @click="login">登录</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mobileReg } from "../../tool/mUtils";
import { login } from "../../config/api";
export default {
  data() {
    return {
      mobile: "", //手机号
      password: "", //密码
      remember: '' //记住
    };
  },
  mounted() {
    //判断记住密码
    if (this.$cookie.get("remember")) {
      this.remember = true;
      this.mobile = this.$cookie.get("account");
      this.password = this.$cookie.get("password");
    } else {
      this.$cookie.remove("remember");
      this.$cookie.remove("account");
      this.$password.remove("password");
    }
  },
  methods: {
    //记住密码
    rememberPwd(){
      this.remember = this.remember ? '' : true;
    },
    login() {
      if (!this.mobile) {
        this.showToast("请输入手机号");
        return false;
      }
      if (!mobileReg.test(this.mobile)) {
        this.showToast("请输入正确手机号");
        return false;
      }
      if (!this.password) {
        this.showToast("请输入密码");
        return false;
      }
      this.showLoading();
      login(this.mobile, this.password)
        .then(res => {
          this.hideLoading();
          this.showToast("登录成功");
          this.$cookie.set("uid", res.uid);
          this.$cookie.set("login_token", res.login_token);
          this.$cookie.set("user_info", res);
          //判断是否记住密码
          if (this.remember) {
            this.$cookie.set("remember", "1");
            this.$cookie.set("account", this.mobile);
            this.$cookie.set("password", this.password);
          }
          let redirect = this.$cookie.get("login_redirect");
          if (redirect) {
            this.$router.push({
              path: redirect
            });
            return;
          }
          this.$router.push({
            path: "/"
          });
        })
        .catch(err => {
          this.hideLoading();
          this.showToast(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./login.scss";
</style>

