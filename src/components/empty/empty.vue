<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 13:47:31
 * @LastEditTime: 2019-09-19 14:00:19
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="empty-component">
       <div class="empty-content">
         <img src="../../assets/empty.png" alt="">
        <p>{{title}}</p>
       </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'暂无数据'
        }
    }
}
</script>

<style lang='scss' scoped>
@import './empty.scss';
</style>