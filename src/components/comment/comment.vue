<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 16:32:15
 * @LastEditTime: 2019-08-31 13:53:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="comment-component">
    <div class="content">
       <textarea v-model="content" placeholder="写下你的评论..."></textarea>
       <p class="length">还可以输入{{length}}字</p>
    </div>
    <p class="clearfix">
      <span class="comment" @click="comment">评论</span>
      <span class="quit">取消</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      length:500
    };
  },
  watch:{
    content(newVal,oldVal){
      let length = newVal.length;
      if(length <=500){
        this.length = 500 - length;
      }else{
        this.content = newVal.substr(0,500);
      }
    }
  },
  props: {
    blogId: {
      type: String //博客id
    },
    commentType: {
      type: Number,
      default: 0 //0 评论博客 1 回复评论 2 评论回复
    },
    commentObj:{
      type:Object //评论Object
    },
    replyCommentObj:{
      type:Object //回复评论Object
    }
  },
  mounted() {},
  methods: {
    //判断是否登录
    checkLogin(){
       if (!this.$cookie.get("login_token")) {
        this.$cookie.set("login_redirect", this.$route.name);
        this.$router.push({ path: "/login" });
        return true;
      }
      return false;
    },
    //评论
    comment() {
      if(this.checkLogin()){
        return false;
      }
      if (!this.content) {
        this.showToast("请输入内容");
        return false;
      }
      
      if (this.commentType == 0) {
        //评论博客
        this.$emit("comment",{
            blogId: this.blogId, content: this.content 
         });
      } else if (this.commentType == 1) {
        //回复评论
        this.$emit("comment", {
          content: this.content,
          commentObj:this.commentObj,//评论Object
        });
      }else if(this.commentType == 2){
        //评论回复
          //回复评论
        this.$emit("comment", {
          content: this.content,
          commentObj:this.commentObj,//评论Object
          replyCommentObj:this.replyCommentObj,//回复评论Object
        });
      }
      if(this.commentObj){
        //隐藏回复框
        this.commentObj.show_comment = false;
      }
       if(this.replyCommentObj){
        //隐藏回复框
        this.replyCommentObj.show_comment = false;
      }

      this.content = "";
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./comment.scss";
</style>