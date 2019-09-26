<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 17:06:19
 * @LastEditTime: 2019-09-19 14:54:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mine-wrapper">
    <div id="mine-header" class="mine-header">
      <router-link to="/">
        <img class="logo" src="../../assets/logo.png" />
      </router-link>
      <img class="avatar" :src="user_info.avatar|filterAvatar" />
      <span class="nick-name">{{user_info.nick_name}}<router-link  v-if="isSelf" to="/editinfo"><img class="edit" src="../../assets/edit.png"/></router-link></span>
      <p class="info">
        <span @click="showFollowAndFans(1)">{{user_info.fans_num}}粉丝</span>
        <span @click="showFollowAndFans()">{{user_info.follow_num}}关注</span>
        <span>{{user_info.blog_num}}文章</span>
      </p>
      <span class="signature">{{user_info.signature | filterSignature}}</span>
      <router-link v-if="isSelf" class="write" to="/blogadd">发表文章</router-link>
      <p v-if="!isSelf" @click="changeFollow" class="write follow">{{user_info.follow|filterFollow}}</p>
    </div>
    <div class="index_content">
      <div class="tabar">
        <ul>
          <li @click="changeTab(0)" :class="{active:tab_index == 0}">热门文章</li>
          <li @click="changeTab(1)" :class="{active:tab_index == 1}">{{isSelf|filtetTabTitle}}</li>
          <li v-if="isSelf" @click="changeTab(2)" :class="{active:tab_index == 2}">我的互动</li>
        </ul>
        <div v-if="show_blog" class="search">
          <input v-model='search' placeholder="搜索关键字" />
          <span>
            <img src="../../assets/serach-icon.png" />
          </span>
        </div>
      </div>
       <empty v-if="!blog_more_show || (!show_comment_div && !show_like_div)"></empty>
      <ul v-if="show_blog" class="content">
        <li v-for="item in blog_list" :key="item.id">
          <img v-if="item.imgs.length !=0 " :src="item.imgs[0]" class="cover" />
          <div class="info">
            <a @click="showDetail(item.id)" class="title">{{item.title}}</a>
            <p class="tip">
              {{item.create_time | filterTime}}
              <span>{{item.nick_name}}</span>
            </p>
            <span class="content">{{item.content}}</span>
          </div>
        </li>
      </ul>
      <div class="trends" v-if="!show_blog">
        <div v-if="show_comment_div" class="tab_div clearfix">
          <span class="tab_title">所有评论</span>
          <ul>
            <li @click="showDetail(item.blog_id)" v-for="(item,index) in comment_list" :key="index">
              <img :src="item.avatar | filterAvatar" />
              <span class="title">{{item.nick_name}}关于“{{item.blog_title}}”评论了你</span>
              <span class="time">{{item.comment_time | filterTimeParse}}</span>
            </li>
          </ul>
          <p  class="more" @click="loadCommentMore">{{comment_more}}</p>
        </div>
        <div v-if="show_like_div" class="tab_div clearfix">
          <span class="tab_title">所有的赞</span>
          <ul>
            <li v-for="(item,index) in like_list" :key="index">
              <img :src="item.avatar | filterAvatar" />
              <span class="title">{{item.nick_name}}赞了你的动态</span>
              <span class="time">{{item.like_time | filterTimeParse}}</span>
            </li>
          </ul>
          <p class="more" @click="loadLikeMore">{{like_more}}</p>
        </div>
      </div>
      <p v-if="show_blog && blog_more_show" @click="loadBlogMore" class="load-more">{{blog_more}}</p>
     
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import $ from "jquery";
import { getYYDDMM, timeParse } from "../../tool/mUtils";
import {
  getUserBlogList,
  getUserDetail,
  followUser,
  unfollowUser,
  getUserComment,
  getUserLike
} from "../../config/api";
import FooterBottom from "../../components/footer/footer";
import Empty from "../../components/empty/empty";
export default {
  data() {
    return {
      user_info: {}, //用户信息
      blog_list: [], //博客列表
      blog_page: 1, //当前分页
      blog_more: "", //博客查看更多
      blog_more_show:true,//显示更多
      tab_title:'我的文章',
      uid: "", //用户id
      isSelf: false, //是否是自己
      hot: 1, //0 普通文章 1热门文章
      tab_index: 0, // 0 热门文章  1 我的文章 2 我的互动
      show_blog: true, //显示博客/否则显示互动
      show_comment_div: true,
      show_like_div: true,
      comment_page: 1, //用户评论分页
      like_page: 1, //用户点赞分页
      like_more: "展开更多",
      comment_more: "展开更多",
      comment_list: [], //用户评论列表
      like_list: [], //用户点赞列表
      search: '', //搜索内容
    };
  },
  components: {
    FooterBottom,
    Empty
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.uid = this.$route.query.uid;
    if (typeof this.uid == "undefined") {
      this.$router.go(-1);
      return;
    }
    this.isSelf = this.uid == this.$cookie.get("uid");
    this.initData();
  },
  watch:{
    search(newVal, oldVal){
      this.page = 0;
      this.blog_list = [];
      this.getData();
    }
  },
  filters: {
    filterTime(value) {
      if (value) {
        return getYYDDMM(value);
      }
    },
    filterFollow(value) {
      return value == 1 ? "已关注" : "关注";
    },
    filterTimeParse(value) {
      if (value) {
        return timeParse(value);
      }
    },
    filterAvatar(val) {
      return val ? val : require("../../assets/avatar.png");
    },
    filterSignature(val){
      return val ? val : '这个人很懒，什么都没留下'
    },
    filtetTabTitle(isSelf){
      return isSelf ? '我的文章' : '他的文章';
    }
  },
  methods: {
    initData() {
      this.getData();
      this.getUserInfo();
    },
    //获取博客列表
    getData() {
      getUserBlogList(this.uid,this.blog_page, this.hot, this.search)
        .then(res => {
          this.blog_more_show = true;
          if (Object.prototype.toString.call(res) === "[object String]") {
            this.blog_more = "无更多数据";
            this.blog_more_show = (this.blog_list.length > 0);
            return;
          }
          this.blog_list.push(...res.data_list);
          this.blog_more = "点击查看更多";
        })
        .catch(err => {});
    },
    //加载帖子更多
    loadBlogMore() {
      this.blog_page++;
      this.getData();
    },
    //详细博客详情
    showDetail(id) {
      this.$router.push({
        name: "blogdetail",
        query: {
          blog_id: id
        }
      });
    },
    //用户信息
    getUserInfo() {
      getUserDetail(this.uid)
        .then(res => {
          this.user_info = res;
        })
        .catch(err => {});
    },
    //修改关注
    changeFollow() {
      if(this.checkLogin()){
        return false;
      }
      this.showLoading();
      if (this.user_info.follow == 1) {
        //取消关注
        unfollowUser(this.uid)
          .then(res => {
            this.user_info.follow = 2; //取消关注
            this.user_info.fans_num -= 1;
            this.hideLoading();
            this.showToast(res);
          })
          .catch(err => {
            this.hideLoading();
            this.showToast(err);
          });
      } else {
        //关注
        followUser(this.uid)
          .then(res => {
            this.user_info.follow = 1; //关注
            this.user_info.fans_num += 1;
            this.hideLoading();
            this.showToast(res);
          })
          .catch(err => {
            this.hideLoading();
            this.showToast(err);
          });
      }
    },
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;

      if (scroll < 0) {
        console.log("up");
      } else {
        console.log("down");
      }
    },
    //切换tab
    changeTab(index) {
      if (index == this.tab_index) {
        return;
      }
      this.hot = (index == 0 ? '1': ''); //判断获取热门文章
      this.show_blog = !(index == 2);
      this.blog_more_show = true;
      //重置帖子参数
      this.blog_list = [];
      this.blog_page = 1;
      this.blog_more = "点击查看更多";
      //重置互动
      this.comment_list = [];
      this.comment_page = 1;
      this.comment_more = "展开更多";
      this.like_list = [];
      this.like_page = 1;
      this.like_more = "展开更多";
      //设置当前tab
      this.tab_index = index;
      if (this.tab_index == 2) {
        //加载互动数据
        this.show_comment_div = false;
        this.show_like_div = false;
        this.getComment();
        this.getLike();
      } else {
        //加载帖子数据
        this.getData();
      }
    },
    //获取用户帖子评论
    getComment() {
      getUserComment(this.comment_page)
        .then(res => {
          if (Object.prototype.toString.call(res) === "[object String]") {
            this.show_comment_div = this.comment_list != 0;
            this.comment_more = "已加载全部";
            
            return;
          }
          this.comment_list.push(...res.data_list);
          this.comment_more = "展开更多";
        })
        .catch(err => {});
    },
    //获取用户点赞
    getLike() {
      getUserLike(this.like_page)
        .then(res => {
          if (Object.prototype.toString.call(res) === "[object String]") {
            this.show_like_div = this.like_list != 0;
            this.like_more = "已加载全部";

            return;
          }
          this.like_list.push(...res.data_list);
          this.like_more = "展开更多";
        })
        .catch(err => {});
    },
    //加载更多评论
    loadCommentMore() {
      this.comment_page++;
      this.getComment();
    },
    //加载更点赞
    loadLikeMore() {
      this.like_page++;
      this.getLike();
    },
    //显示关注/粉丝
    showFollowAndFans(type = "") {
      //type =1 粉丝，否则 关注
      this.$router.push({
        path: "/follow",
        query: {
          uid: this.uid,
          type: type
        }
      });
    },
    //判断是否登录
    checkLogin(){
       if (!this.$cookie.get("login_token")) {
        this.$cookie.set("login_redirect", this.$route.name);
        this.$router.push({ path: "/login" });
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="sass" scoped>
@import './mine.scss';
</style>