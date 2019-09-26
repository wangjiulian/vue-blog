<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:37:53
 * @LastEditTime: 2019-09-12 10:07:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="blog-detail-wrapper">
    <header-top></header-top>
    <div v-if="detail_info" class="detail-content">
      <div class="info">
        <p class="title">{{detail_info.title}}</p>
        <p class="tip">
          <span class="read-num">
            <img src="../../assets/read-num.png" />
            {{detail_info.read_num}}
          </span>
          <span class="release-time">
            <img src="../../assets/release-time.png" />
            {{detail_info.create_time | filterTime}}
          </span>
          <span class="comment-num">
            <img src="../../assets/comment-num.png" />
            {{detail_info.comment_num}}
          </span>
          <span class="like-num">
            <img src="../../assets/like-num.png" />
            {{detail_info.like_num}}
          </span>
        </p>
        <div v-html="detail_info.content" class="content"></div>
        <div class="right-container">
          <img
            @click="showUserDetail(detail_info.uid)"
            class="right_avatar"
            :src="detail_info.avatar|filterAvatar"
          />
          <span>{{detail_info.nick_name}}</span>
          <div class="imgs">
            <div @click="changeLike">
              <img :src="like_icon" />
            </div>
            <div @click="scrollComment">
              <img src="../../assets/comment.png" />
            </div>
          </div>
        </div>
      </div>
      <div id="comment-content" class="comment-content">
        <div  class="user">
          <img :src="user_info.avatar|filterAvatar" />
          <span>{{user_info.nick_name}}</span>
        </div>
        <comment @comment="addComment" :blog-id="blog_id"></comment>
      </div>
      <ul class="data">
        <li v-for="item in comment_list" :key="item.id">
          <img @click="showUserDetail(item.uid)" class="avatar" :src="item.avatar|filterAvatar" />
          <div class="comment-info">
            <p class="left">
              <span>{{item.nick_name}}</span>
              <span>{{item.comment_time | filterTimeParse}}</span>
            </p>
            <p class="content">{{item.content}}</p>
            <p class="feed">
              <span @click="showComment(item)">回复</span>
              <span>举报</span>
            </p>
            <comment
              v-if="item.show_comment"
              class="add-comment"
              @comment="addCommentReply"
              :comment-obj="item"
              comment-type="1"
            ></comment>
            <ul>
              <li v-for="childItem in item.reply_list" :key="childItem.id">
                <img @click="showUserDetail(childItem.uid)" class="avatar" :src="childItem.avatar|filterAvatar" />
                <div class="comment-info">
                  <p class="left">
                    <span>{{childItem.nick_name}}</span>
                    <span>{{childItem.comment_time | filterTimeParse}}</span>
                  </p>
                  <p class="content">{{ (childItem.feed_nick_name ? '@'+childItem.feed_nick_name+":" : '')+childItem.content}}</p>
                  <p class="feed">
                    <span @click="showComment(childItem)">回复</span>
                    <span>举报</span>
                  </p>
                  <comment
                    v-if="childItem.show_comment"
                    class="add-comment"
                    @comment="addReplyComment"
                    :comment-obj="item"
                    :reply-comment-obj="childItem"
                    comment-type="2"
                  ></comment>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {
  getBlogDetail,
  addBlogComment,
  getCommentList,
  addBlogCommentReply,
  likeBlog,
  unlikeBlog,
  addBlogReplyComment
} from "../../config/api";
import { getYYDDMML, timeParse } from "../../tool/mUtils";
import HeaderTop from "../../components/header/header";
import FooterBottom from "../../components/footer/footer";
import Comment from "../../components/comment/comment";
export default {
  data() {
    return {
      blog_id: "",
      detail_info: "",
      comment_list: [],
      user_info:''
    };
  },
  components: {
    FooterBottom,
    HeaderTop,
    Comment
  },
  computed: {
    like_icon() {
      if (this.detail_info) {
        return require(this.detail_info.like == 1
          ? "../../assets/like.png"
          : "../../assets/unlike.png");
      }
      return require("../../assets/unlike.png");
    }
  },
  mounted() {
    this.blog_id = this.$route.query.blog_id;
    if (this.blog_id) {
      this.$cookie.set("blog_id", this.blog_id);
    } else {
      this.blog_id = this.$cookie.get("blog_id");
      if (this.blog_id == "undefined") {
        this.$router.replace({ path: "/" });
      }
    }
    if(this.$cookie.get("user_info")){
       this.user_info = JSON.parse(this.$cookie.get("user_info"));
    }
   
    this.getDetailInfo();
    this.getComment();
  },
  filters: {
    filterTime(value) {
      if (value) {
        return getYYDDMML(value);
      }
    },
    filterTimeParse(value) {
      if (value) {
        return timeParse(value);
      }
    },
     filterAvatar(val) {
      return val ? val : require("../../assets/avatar.png");
    }
  },
  methods: {
    //获取博客详情
    getDetailInfo() {
      this.showLoading();
      getBlogDetail(this.blog_id)
        .then(res => {
          this.hideLoading();
          this.detail_info = res;
        })
        .catch(err => {
          this.hideLoading();
        });
    },
    //添加博客评论
    addComment(obj) {
      this.checkLogin();
      this.showLoading();
      addBlogComment(obj.blogId, obj.content)
        .then(res => {
          this.detail_info.comment_num = parseInt(this.detail_info.comment_num) + 1;
          this.hideLoading();
          this.showToast("评论成功");
          let userInfo = JSON.parse(this.$cookie.get("user_info"));
          //添加评论本地数据
          let item = {
            id: res,
            avatar: userInfo.avatar,
            nick_name: userInfo.nick_name,
            uid: userInfo.id,
            comment_time: parseInt(new Date().getTime() / 1000),
            content: obj.content,
            reply_list: [],
            show_comment:false
          };
          this.comment_list.push(item);
          this.$nextTick(() => {
            document.documentElement.scrollTop = document.body.scrollHeight;
          });
        })
        .catch(err => {
          this.hideLoading();
          this.showToast(err);
        });
    },
    //获取评论列表
    getComment() {
      getCommentList(this.blog_id)
        .then(res => {
          res.data_list.map(item => {
            item.show_comment = false;
            item.reply_list.map(child => {
              child.show_comment = false;
            });
          });
          this.comment_list.push(...res.data_list);
        })
        .catch(err => {});
    },
    //显示/隐藏回复评论
    showComment(item) {
      item.show_comment = !item.show_comment;
    },
    //添加评论回复
    addCommentReply(obj) {
      addBlogCommentReply(obj.commentObj.id, obj.content)
        .then(res => {
           this.detail_info.comment_num = parseInt(this.detail_info.comment_num) + 1;
          this.showToast('回复成功');
           let userInfo = JSON.parse(this.$cookie.get("user_info"));
          //添加评论本地数据
          let item = {
            id: res,
            avatar: userInfo.avatar,
            nick_name: userInfo.nick_name,
            uid: userInfo.id,
            comment_time: parseInt(new Date().getTime() / 1000),
            content: obj.content,
            show_comment:false
          };
          obj.commentObj.reply_list.push(item);
        })
        .catch(err => {
          this.showToast(err);
        });
    },
    //添加回复评论
    addReplyComment(obj){
      debugger;
       this.checkLogin();
       addBlogReplyComment(obj.commentObj.id,obj.replyCommentObj.id,obj.content)
       .then((res => {
          this.detail_info.comment_num = parseInt(this.detail_info.comment_num) + 1;
          this.showToast('回复成功');
           let userInfo = JSON.parse(this.$cookie.get("user_info"));
          //添加评论本地数据
          let item = {
            id: res,
            avatar: userInfo.avatar,
            nick_name: userInfo.nick_name,
            uid: userInfo.id,
            comment_time: parseInt(new Date().getTime() / 1000),
            content: obj.content,
            feed_avatar:obj.commentObj.avatar,
            feed_nick_name:obj.commentObj.nick_name,
            feed_uid:obj.commentObj.uid,
            show_comment:false
          };
          debugger;
          obj.commentObj.reply_list.push(item);
       })).catch((err) => {})
      

    },
    //修改点赞
    changeLike() {
      if(this.checkLogin()){
        return false;
      }
      if (this.detail_info) {
        let like = this.detail_info.like;
        this.showLoading();
        if (like == 1) {
          //取消点赞
          unlikeBlog(this.blog_id)
            .then(res => {
              this.detail_info.like = 2;
              this.detail_info.like_num = parseInt( this.detail_info.like_num) - 1;
              this.showToast(res);
              this.hideLoading();
            })
            .catch(err => {
              this.showToast(err);
              this.hideLoading();
            });
        } else {
          //点赞
          likeBlog(this.blog_id)
            .then(res => {
              this.detail_info.like = 1;
              this.detail_info.like_num = parseInt( this.detail_info.like_num) + 1;
              this.showToast(res);
              this.hideLoading();
            })
            .catch(err => {
              this.showToast(err);
              this.hideLoading();
            });
        }
      }
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
    //滑动到评论区
    scrollComment() {
      let top = document.getElementById("comment-content").offsetTop;
      document.documentElement.scrollTop = top - 80;
    },
    //判断是否登录
    checkLogin(){
       if (!this.$cookie.get("login_token") || !this.$cookie.get("uid")) {
        this.$cookie.set("login_redirect", this.$route.name);
        this.$router.push({ path: "/login" });
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./blogDetail.scss";
</style>

