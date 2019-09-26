<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:55:08
 * @LastEditTime: 2019-09-12 11:21:41
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="login-wrapper">
    <div class="login-content">
      <p class="tab">
        <router-link class="circle"  to="/login">登录</router-link>
        <router-link to='/register' class="active">注册</router-link>
      </p>

      <div class="login-info-content">
        <div class="login-input">
           <div class="div-input">
            <img src="../../assets/nick-name.png" />
          <input type="text" v-model="nick_name" placeholder="你的昵称" />
          </div>
           <div class="div-input">
            <img src="../../assets/phone.png" />
          <input  v-model="mobile" placeholder="手机号" />
          </div>
           <div class="div-input">
            <img src="../../assets/passwd.png" />
          <input type="password" v-model="password" placeholder="设置密码" />
          </div>
        </div>
        <p class="login-btn" @click="register">注册</p>
        <p class="aggre-tip">点击“注册”即表示您同意并愿意遵守Blog</p>
        <p class="aggre-tip"><span class="privacy">用户协议</span>和<span class="privacy">隐私协议</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mobileReg } from "../../tool/mUtils";
import { register } from "../../config/api";
export default {
  data() {
    return {
      nick_name:'',
      mobile: "",
      password:'',
    };
  },
  methods: {
    register() {
      if (!this.nick_name) {
        this.showToast("请输入昵称");
        return;
      }
      if (this.nick_name.length < 3 || this.nick_name.length > 10) {
        this.showToast("昵称3到10个字");
        return;
      }
      if (!this.mobile) {
        this.showToast("请输入手机号");
        return;
      }
      if (!mobileReg.test(this.mobile)) {
        this.showToast("请输入正确手机号");
        return;
      }
      if (!this.password) {
        this.showToast("请输入密码");
        return;
      }
     
      this.showLoading();
      register(this.nick_name,this.mobile, this.password)
        .then(res => {
          this.showToast('注册成功');
          this.$cookie.set('uid',res.uid);
          this.$cookie.set('login_token',res.login_token);
          this.$cookie.set('user_info',res);
          this.hideLoading();
          this.$router.push({
            path:'/'
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
@import "./register.scss";
</style>

