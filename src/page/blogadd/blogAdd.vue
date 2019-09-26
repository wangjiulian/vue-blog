<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 13:38:53
 * @LastEditTime: 2019-09-12 17:40:21
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="blog-add-wrapper">
    <header-top></header-top>
    <div class="editor">
      <p class="title-tip">标题</p>
      <input class="title" v-model="title" placeholder />
        <p class="title-tip">文章类型</p>
      <select class="title" v-model="type">
        <option value="1">文化</option>
        <option value="2">娱乐</option>
        <option value="3">生活</option>
        <option value="4">健康</option>
        <option value="5">体育</option>
        <option value="6">财经</option>
        <option value="7">实事</option>
        
      </select>
      <div class="add-cover">
        <input id="file" accept=".jpg, .png" class="file" type="file" @change="uploadImgCover" />
        <img class="img-icon" src="../../assets/add_img.png" />
        <p>请上传封面</p>
        <p>最佳尺寸560*420</p>
        <span>上传封面（560*420像素)</span>
        <img v-if="img_cover" :src="img_cover" class="img-cover" />
      </div>
      <p class="detail-tip">
        文章正文
        <span>在这里填写详细的文章内容分享给大家</span>
      </p>
      <div class="summernote"></div>
      <p @click="release" class="release">确认发表</p>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import $ from "jquery";
import { baseUrl } from "../../config/env";
import { addBlog,uploadImg} from "../../config/api";
import HeaderTop from "../../components/header/header";
import FooterBottom from "../../components/footer/footer";
export default {
  data() {
    return {
      title: "",
      img_cover: "",
      type:''
    };
  },
  components: {
    HeaderTop,
    FooterBottom
  },
  mounted() {
    let _this = this;
    $(".summernote").summernote({
      lang: "zh-CN",
      placeholder: "请输入文章内容",
      height: 500,
      // width: 1094,
      minHeight: null,
      maxHeight: null,
      focus: true,
      toolbar: [
        ["style", ["style", "bold", "italic", "underline", "clear"]],
        ["font", ["strikethrough", "superscript", "subscript"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["height", ["height"]],
        ["insert", ["link", "picture", "video", "table"]],
        ["view", ["fullscreen", "codeview", "help"]]
      ],
      callbacks: {
        onImageUpload: function(files, editor, welEditable) {
          for (var i = files.length - 1; i >= 0; i--) {
            // sendFile(files[i], this);
            _this.sendFile(files[i], this);
          }
        }
      }
    });
    $(".summernote").summernote("code", "");
  },
  methods: {
    uploadImgCover() {
      var data = new FormData();
      data.append("type", "1");
      data.append("file", document.getElementById("file").files[0]);
      this.showLoading();
      uploadImg(data)
       .then((res) =>{
         this.hideLoading();
         this.img_cover = res;
      }).catch((err) => {
         this.hideLoading();
        this.showToast(err);
      })
    },
    sendFile(file, el) {
      var data = new FormData();
      data.append("type", "1");
      data.append("file", file);
      this.showLoading();
      uploadImg(data)
      .then((res) =>{
        this.hideLoading();
         $(".summernote").summernote("editor.insertImage", res);
      }).catch((err) => {
        this.hideLoading();
        this.showToast(err);
      })
    },
    
    release() {
      if (!this.title) {
        this.showToast("请上传标题");
        return false;
      }
      if (!this.type) {
        this.showToast("请选择文章类型");
        return false;
      }
      if (!this.img_cover) {
        this.showToast("请上传封面");
        return false;
      }
      let content = $(".summernote").summernote("code");
      if (!content) {
        this.showToast("请上传内容");
        return false;
      }
      this.showLoading();
      addBlog(this.title, content,this.img_cover, this.type)
        .then(res => {
          this.hideLoading();
          this.showToast(res);
          this.$router.go(-1);
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
@import "./blogAdd.scss";
</style>