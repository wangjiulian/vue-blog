<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 15:31:21
 * @LastEditTime: 2019-09-12 15:36:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="edit-info-wrapper">
    <header-top></header-top>
    <div class="edit-info-content">
      <p class="top-title">个人资料</p>
      <p class="tip">头像</p>
      <div class="div-avatar">
        <input @change="uploadAvatar" id="file" class="file" type="file" accept="jpg, png, jpeg" />
        <img src="../../assets/edit-avatar.png" class="cover-icon" />
        <img v-if="avatar" :src="avatar" class="avatar" />
      </div>
      <p class="tip">
        昵称
        <span class="right-tip">3-10字</span>
      </p>
      <input class="right-circle"  v-model="nick_name" />
      <p class="tip">性别</p>
      <select v-model="sex">
        <option value="1">男</option>
        <option value="2">女</option>
      </select>
      <p class="tip">邮箱</p>
      <input v-model="email" />
      <p class="tip">
        个人简介
        <span class="right-tip">3-100字</span>
      </p>
      <textarea v-model="signature" />
      <p class="save" @click="editInfo">确认提交</p>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import HeaderTop from "../../components/header/header";
import FooterBottom from "../../components/footer/footer";
import { emailReg } from "../../tool/mUtils";
import {
  getFollowList,
  getFansList,
  uploadImg,
  editUserInfo
} from "../../config/api";
export default {
  data() {
    return {
      avatar: "",
      nick_name: "",
      sex: "",
      email: "",
      signature: ""
    };
  },
  components: {
    HeaderTop,
    FooterBottom
  },
  mounted() {
    this.bindUserInfo();
  },
  methods: {
    //上传头像
    uploadAvatar() {
      var data = new FormData();
      data.append("type", "1");
      data.append("file", document.getElementById("file").files[0]);
      uploadImg(data)
        .then(res => {
          this.avatar = res;
        })
        .catch(err => {
          this.showToast(err);
        });
    },
    bindUserInfo() {
      var userInfo = JSON.parse(this.$cookie.get("user_info"));
      this.avatar = userInfo.avatar;
      this.nick_name = userInfo.nick_name;
      this.sex = userInfo.sex;
      this.email = userInfo.email;
      this.signature = userInfo.signature;
    },
    //编辑信息
    editInfo() {
      if (!this.avatar) {
        this.showToast("请上传头像");
        return;
      }
      if (!this.nick_name) {
        this.showToast("请输入昵称");
        return;
      }
      if (this.nick_name.length < 3) {
        this.showToast("昵称太短");
        return;
      }
      if (!this.sex) {
        this.showToast("请选择性别");
        return;
      }
      if (!this.email) {
        this.showToast("请输入邮箱");
        return;
      }
      if (!emailReg.test(this.email)) {
        this.showToast("邮箱格式不正确");
        return;
      }
      if (!this.signature) {
        this.showToast("请输入个人简介");
        return;
      }
      if (this.signature.length > 100) {
        this.showToast("个人简介3-100字");
        return;
      }
      this.showLoading();
      editUserInfo(
        this.avatar,
        this.nick_name,
        this.sex,
        this.email,
        this.signature
      )
        .then(res => {
          this.showToast("编辑成功");
          this.$cookie.set("user_info", res);
          this.hideLoading();
          this.$router.go(-1);
        })
        .catch(err => {
          this.showToast(err);
          this.hideLoading();
        });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./editInfo.scss";
</style>