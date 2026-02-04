<template>
  <page-wrapper class="w-full" have_no_more>
    <go-back show-logo>返回</go-back>
    <template #scroll>
      <whole-article :article="returnArticle?.article" :user-info="returnArticle?.userInfo">
        <template #collection>
          <collection-nav :source="returnArticle?.collection"></collection-nav>
        </template>
      </whole-article>
      <post-comment></post-comment>
      <comment-vue v-for="(comment, index) in comments" :key="index" :comment="comment"></comment-vue>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/container/PageContainer.vue";
import WholeArticle from "./components/WholeArticle.vue";
import CommentVue from "./components/CommentVue.vue";
import CollectionNav from "./components/CollectionNav.vue";
import GoBack from "@/components/common/GoBack.vue";
import PostComment from "./components/PostComment.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getArticleById } from "@/api/articleApi";
import { getArticleCommentList } from "@/api/articleCommentApi"
import type { ArticlePageData, FirstComment } from "./type";
const returnArticle = ref<ArticlePageData>({} as ArticlePageData)
const comments = ref<FirstComment[]>([])
onLoad(async (options) => {
  returnArticle.value = await getArticleById(options?.id)
  comments.value = await getArticleCommentList(options?.id)
})
</script>

<style lang="scss">
page {
  height: 100vh;
}

.uni-swiper__warp {
  border-radius: 15px;
}
</style>
