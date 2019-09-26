<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 15:48:56
 * @LastEditTime: 2019-09-19 14:21:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="follow-wrapper">
    <header-top></header-top>
    <div class="content">
      <p class="top-title">{{title}}</p>
      <ul>
        <li v-for="(item,index) in data_list" :key="index">
          <img @click="showUserDetail(item.uid)" :src="item.avatar|filterAvatar" class="avatar" />
          <img @click="changeFollow(item)" class="follow" :src="item.follow|filterFollow" />
          <div class="detail">
            <span class="nick-name">
              {{item.nick_name}}
              
            </span>
            <p class="signature">{{item.signature | filterSinature}}</p>
          </div>
        </li>
        <!-- 占位 -->
        <li style="opacity: 0;" v-for="i in (3 - (data_list.length % 3))" :key="i + 1"></li>
      </ul>
      <empty v-if="data_list.length == 0"></empty>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import HeaderTop from "../../components/header/header";
import FooterBottom from "../../components/footer/footer";
import Empty from "../../components/empty/empty";
import {
  getFollowList,
  getFansList,
  followUser,
  unfollowUser
} from "../../config/api";
export default {
  components: {
    HeaderTop,
    FooterBottom,
    Empty
  },
  data() {
    return {
      data_list: [],
      host_id: "",
      type: "", //1粉丝 否则关注
      title: "我的关注"
    };
  },
  mounted() {
    this.host_id = this.$route.query.uid;
    this.type = this.$route.query.type;
    if (this.host_id) {
      this.getData();
      return;
    }
    this.$router.replace({ path: "/" });
  },
  filters: {
    filterSinature(val) {
      return val ? val : "这个人很懒，啥也没留下";
    },
    filterAvatar(val) {
      return val ? val : require("../../assets/avatar.png");
    },
    filterFollow(val) {
      if (val) {
        return val == 1
          ? require("../../assets/follow_follow.png")
          : require("../../assets/follow_unfollow.png");
      }
    }
  },
  methods: {
    getData() {
      if (this.type == 1) {
        //粉丝列表
        this.title = "我的粉丝";
        getFansList(this.host_id)
          .then(res => {
            if (Object.prototype.toString.call(res) === "[object String]") {
              return;
            }
            this.data_list.push(...res.data_list);
          })
          .catch(err => {});
        return;
      }
      getFollowList(this.host_id)
        .then(res => {
          if (Object.prototype.toString.call(res) === "[object String]") {
            return;
          }
          this.data_list.push(...res.data_list);
        })
        .catch(err => {});
    },
    //显示用户详情
    showUserDetail(uid) {
      this.$router.push({
        path: "mine",
        query: {
          uid: uid
        }
      });
    },
      //修改关注
    changeFollow(item) {
      if(this.checkLogin()){
        return false;
      }
      if(this.$cookie.get("uid") == item.uid){
        this.showToast(item.follow == 1 ? '自己不能取消关注自己' : '自己不能关注自己');
      return;
      }
      
      this.showLoading();
      if (item.follow == 1) {
        //取消关注
        unfollowUser(item.uid)
          .then(res => {
           item.follow = 2;
            this.hideLoading();
            this.showToast(res);
          })
          .catch(err => {
            this.hideLoading();
            this.showToast(err);
          });
      } else {
        //关注
        followUser(item.uid)
          .then(res => {
            item.follow = 1;
            this.hideLoading();
            this.showToast(res);
          })
          .catch(err => {
            this.hideLoading();
            this.showToast(err);
          });
      }
    },
     //判断是否登录
    checkLogin(){
       if (!this.$cookie.get("login_token") || !this.$cookie.get("uid") ) {
        this.$cookie.set("login_redirect", this.$route.name);
        this.$router.push({ path: "/login" });
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./follow.scss";
</style>