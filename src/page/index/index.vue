<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 14:02:59
 * @LastEditTime: 2019-09-19 14:54:04
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="index-wrapper">
    <header-top>
     
    </header-top>
    <div class="index_content">
      <div class="tabar">
        <ul>
          <li @click="changeTab(0)" :class="{active:type == 0 }">首页</li>
          <li @click="changeTab(1)" :class="{active:type == 1 }">文化</li>
          <li @click="changeTab(2)" :class="{active:type == 2 }">娱乐</li>
          <li @click="changeTab(3)" :class="{active:type == 3 }">生活</li>
          <li @click="changeTab(4)" :class="{active:type == 4 }">健康</li>
          <li @click="changeTab(5)" :class="{active:type == 5 }">体育</li>
          <li @click="changeTab(6)" :class="{active:type == 6 }">财经</li>
          <li @click="changeTab(7)" :class="{active:type == 7 }">时事</li>
        </ul>
        <div class="search">
          <input v-model="search" placeholder="搜索关键字" />
          <span>
            <img src="../../assets/serach-icon.png" />
          </span>
        </div>
      </div>

      <ul class="content">
        <li v-for="item in blog_list" :key="item.id">
          <img v-if="item.imgs.length !=0 " :src="item.imgs[0]" class="cover" />
          <div class="info">
            <a @click="showDetail(item.id)" class="title">{{item.title}}</a>
            <p class="tip">
              {{item.create_time |filterTime}}
              <span>{{item.nick_name}}</span>
            </p>
            <span class="content">{{item.content}}</span>
            <!-- <div class="bottom">
              <span class="author">{{item.nick_name}}</span>
              <span class="like">点赞{{item.like_num}}</span>
              <span class="comment">评论{{item.comment_num}}</span>
            </div>-->
          </div>
        </li>
      </ul>
      <p v-if="more_show" @click="loadMore" class="load-more">{{more}}</p>
      <empty v-if="!more_show" style="margin-top:40px;"></empty>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import { getYYDDMM } from "../../tool/mUtils";
import { getRecommendList } from "../../config/api";
import HeaderTop from "../../components/header/header";
import FooterBottom from "../../components/footer/footer";
import Empty from "../../components/empty/empty";
export default {
  data() {
    return {
      blog_list: [],
      page: 1, //当前页码
      more: "点击查看更多",
      more_show:true, //显示更多
      is_login: true, //是否登录
      user_info: {},
      search:'',//查找内容
      type:0, //文章类型
    };
  },
  components: {
    HeaderTop,
    FooterBottom,
    Empty
  },
  mounted() {
    this.initData();
  },
  watch:{
    search(newVal, oldVal){
      this.page = 1;
      this.blog_list = [];
      this.getData();
    }
  },
  filters: {
    filterTime(value) {
      if (value) {
        return getYYDDMM(value);
      }
    }
  },
  activated(){
   this.bindUserInfo();
  },
  methods: {
    initData() {
      this.getData();
    },
    //切换tab
    changeTab(type){
      if(type == this.type){
        return false;
      }
      this.type = type;
      //重置数组
      this.blog_list = [];
      this.page = 1;
      this.getData();
    },
    //绑定用户信息
    bindUserInfo() {
      this.is_login = this.$cookie.get("login_token") ? true : false;
      let userInfoStr = this.$cookie.get("user_info");
      if (userInfoStr) {
        this.user_info = JSON.parse(userInfoStr);
      }
    },
    //获取博客列表
    getData() {
      this.showLoading();
      getRecommendList(this.page, this.type, this.search)
        .then(res => {
          this.more_show = true;
          this.hideLoading();
          if (Object.prototype.toString.call(res) === "[object String]") {
            this.more = "无更多数据";
            this.more_show = (this.blog_list.length > 0);
            return;
          }
          this.blog_list.push(...res.data_list);
          this.more = "点击查看更多";
        })
        .catch(err => {});
    },
    //加载更多
    loadMore() {
      this.page++;
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
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>