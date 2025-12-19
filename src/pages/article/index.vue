<template>
  <view class="article-page content w-100">
    <head-nav></head-nav>
    <go-back></go-back>
    <whole-article :art_id="art_id"></whole-article>
    <post-comment></post-comment>
    <view class="comment-box w-100">
      <comment-vue :comments="comments"></comment-vue>
      <comment-vue :comments="comments"></comment-vue>
      <comment-vue :comments="comments"></comment-vue>
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
import { ref } from "vue";

let art_id = 0;
onLoad((option) => {
  //总之就是开始查数据，查文章，查评论
  art_id = option?.art_id;
});

const comments = ref([
  {
    id: 0,
    content: "默认评论",
    user: "匿名用户",
    time: new Date("2022-01-01"),
    avatar: "",
    secondComment: [
      {
        id: 1,
        content: "默认二级评论1",
        user: "匿名用户1",
        time: new Date("2022-01-01"),
        avatar: "",
      },
      {
        id: 2,
        content: "默认二级评论2",
        user: "匿名用户2",
        time: new Date("2022-01-01"),
        avatar: "",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.article-page {
  scrollbar-width: none;

  .comment-box {
    overflow-y: auto;
    scrollbar-width: thin;
    z-index: 0;
    background-color: white;
  }
}
</style>
