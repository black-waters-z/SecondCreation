<template>
  <page-wrapper class="w-full" show-head have_no_more>
    <template #scroll>
      <whole-article :article="returnArticle?.article" :user-info="returnArticle?.userInfo"></whole-article>
      <post-comment></post-comment>
      <comment-vue :comments="comments"></comment-vue>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/container/PageContainer.vue";
import WholeArticle from "./components/WholeArticle.vue";
import CommentVue from "./components/CommentVue.vue";
import PostComment from "./components/PostComment.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getArticleById } from "@/api/articleApi";
import type { ArticlePageData } from "./type";
const returnArticle = ref<ArticlePageData>({} as ArticlePageData)
onLoad(async (options) => {
  returnArticle.value = await getArticleById(options?.id)
})
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

<style lang="scss">
page {
  height: 100vh;
}

.uni-swiper__warp {
  border-radius: 15px;
}
</style>
