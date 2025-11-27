<template>
  <view class="article-page">
    <head-nav></head-nav>
    <go-back></go-back>
    <whole-article :art_id="art_id"></whole-article>
    <view class="comment-box">
      <post-comment></post-comment>
      <comment-vue></comment-vue>
      <comment-vue></comment-vue>
      <comment-vue></comment-vue>
    </view>
  </view>
</template>

<script setup lang="ts">
import HeadNav from "@/components/common/HeadNav.vue";
import GoBack from "@/components/common/GoBack.vue";
import WholeArticle from "./components/WholeArticle.vue";
import PostComment from "./components/PostComment.vue";
import CommentVue from "./components/CommentVue.vue";
import { onLoad } from "@dcloudio/uni-app";

let art_id = 0;
onLoad((option) => {
  //总之就是开始查数据，查文章，查评论
  art_id = option?.art_id;
});
</script>

<style lang="scss" scoped>
.article-page {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;

  .comment-box {
    height: 80vh;
    overflow-y: auto;
    scrollbar-width: thin;
    z-index: 0;
  }
}
</style>
