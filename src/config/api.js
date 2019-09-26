/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:52:01
 * @LastEditTime: 2019-09-19 14:12:38
 * @LastEditors: Please set LastEditors
 */
import service from './request'
import {
  cookie
} from '../tool/mUtils'

import {
  baseUrl
} from './env';

//api请求
import fetch from './fetch'
import {
  from
} from '_array-flatten@2.1.2@array-flatten';
//post 无参数
export const test1 = () => fetch('/info/menu_sort')
//post 参数type
export const test = (type, name) => fetch('/test1', {
  type: type //注释
})
//get 参数type
export const test2 = (type) => fetch('/test1', {
  type: type //注释
}, 'GET')

//登录
export const login = (account, password) => fetch('/user/login', {
  account: account, //手机号
  password: password, //密码
});

//注册
export const register = (nick_name, account, password) => fetch('/user/register', {
  nick_name: nick_name, //昵称
  account: account, //手机号
  password: password, //密码
});

//获取推荐列表
export const getRecommendList = (page, type, search = '') => fetch('/blog/list_recommend_blog', {
  page: page, //页码默认为1
  type: type, //0 首页 1 文化 2 娱乐 3 生活 4 健康 5体育 6 财经 7实事
  search: search //搜索内容
});

//添加帖子
export const addBlog = (title, content, cover, blog_type) => fetch('/blog/add_blog', {
  title: title, //标题
  content: content, //内容
  cover: cover, //封面
  type: 2, // 1 手机 2 PC
  blog_type: blog_type //1 文化 2 娱乐 3 生活 4 健康 5体育 6 财经 7实事
});
//博客详情
export const getBlogDetail = (blog_id) => fetch('/blog/detail_blog', {
  blog_id: blog_id, //博客id

});
//获取用户帖子
export const getUserBlogList = (host_id,page, hot = 0, search = '') => fetch('/user/get_user_blog', {
  page: page, //页码默认为1
  host_id: host_id, //查询用户id
  hot: hot,
  search: search
  
});

//添加评论
export const addBlogComment = (blog_id, content) => fetch('/blog/add_blog_comment', {
  blog_id: blog_id, //(必填)博客id
  content: content, //(必填)评论内容
});

//评论列表
export const getCommentList = (blog_id) => fetch('/blog/list_comment', {
  blog_id: blog_id, //(必填)博客id
});


//回复评论
export const addBlogCommentReply = (comment_id, content) => fetch('/blog/add_comment_reply', {
  comment_id: comment_id, //(必填)评论id,
  content: content //回复内容
});

//评论回复
export const addBlogReplyComment = (comment_id, reply_id, content) => fetch('/blog/add_reply_comment', {
  comment_id: comment_id, //(必填)评论id,
  reply_id: reply_id, //(必填)回复id
  content: content //回复内容
});

//点赞
export const likeBlog = (blog_id) => fetch('/blog/like_blog', {
  blog_id: blog_id, //博客id
});

//取消点赞
export const unlikeBlog = (blog_id) => fetch('/blog/unlike_blog', {
  blog_id: blog_id, //博客id
});

//用户详细信息
export const getUserDetail = (host_id) => fetch('/user/get_user_detail', {
  host_id: host_id, //用户id
});

//关注用户
export const followUser = (follow_id) => fetch('/user/follow_user', {
  follow_id: follow_id, //用户id
});

//取消关注用户
export const unfollowUser = (unfollow_id) => fetch('/user/unfollow_user', {
  unfollow_id: unfollow_id, //用户id
});

//用户帖子评论
export const getUserComment = (page) => fetch('/user/get_user_comment', {
  page: page, //默认1
});

//用户帖子点赞
export const getUserLike = (page) => fetch('/user/get_user_like', {
  page: page, //默认1
});

//关注列表
export const getFollowList = (host_id) => fetch('/user/get_follow_list', {
  host_id: host_id, //(必填)查询id
});

//粉丝列表
export const getFansList = (host_id) => fetch('/user/get_fans_list', {
  host_id: host_id, //(必填)查询id
});

//编辑个人信息
export const editUserInfo = (avatar, nick_name, sex, email, signature) => fetch('/user/edit_info', {
  avatar: avatar, //头像
  nick_name: nick_name, //昵称
  sex: sex, //性别
  email: email, //邮箱
  signature: signature, //签名
});

//上传图片
export const uploadImg = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl + "/base/upload_file",
      method: "post",
      data: data,
      async: true,
      contentType: false,
      processData: false,
      mimeType: "multipart/form-data",
      dataType: "json",
      success: function (res) {
        if (res.re_st == "success") {
          console.log("上传成功" + res.re_info);
          resolve(res.re_info);
        }
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}
