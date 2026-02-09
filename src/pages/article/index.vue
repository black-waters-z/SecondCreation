<template>
  <page-wrapper class="w-full" have_no_more>
    <go-back class="w-full" show-logo>返回</go-back>
    <template #scroll>
      <whole-article :article="returnArticle?.article" :user-info="returnArticle?.userInfo">
        <template #collection>
          <collection-nav :source="returnArticle?.collection"></collection-nav>
        </template>
      </whole-article>
      <post-comment @send-comment="sendComment" v-model:commentToward="commentData"></post-comment>
      <comment-vue v-for="(comment, index) in comments" :key="index" :comment="comment" @comment-reply="replyComment"
        :ref="(el) => setCommentRef(el, comment.id)"></comment-vue>
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
import { ref, watch } from "vue";
import { getArticleById } from "@/api/articleApi";
import { getArticleCommentList, postCommentFunction } from "@/api/articleCommentApi"
import type { ArticlePageData, FirstComment } from "./type";
const returnArticle = ref<ArticlePageData>({} as ArticlePageData)
const comments = ref<FirstComment[]>([])
const commentRefs = ref<Record<number, InstanceType<typeof CommentVue> | null>>({});
const setCommentRef = (el: any, id: number) => {
  if (el) {
    commentRefs.value[id] = el;
  }
};

onLoad(async (options) => {
  returnArticle.value = await getArticleById(options?.id)
  comments.value = await getArticleCommentList(options?.id)
})
const commentData = ref<{ content: string, parent_id?: number, parent_name?: string, article_id: number }>({ content: '', article_id: 0 })

// 发布评论
async function sendComment(comment: string) {
  commentData.value.content = comment
  commentData.value.article_id = returnArticle.value.article?.id
  const inputData = {
    content: commentData.value.content,
    article_id: commentData.value.article_id,
    parent_id: commentData.value?.parent_id,
  }
  const result = await postCommentFunction(inputData) // 返回值应当为最祖先的评论id，以及创建后的comment的id值
  uni.showToast({
    title: '评论成功',
    icon: 'success',
    duration: 2000,
  })
  // 在原位置插入用户的评论，这里先用parent_id表示
  if (inputData.parent_id && result.grand_parent_id) {
    const targetRef = commentRefs.value[result.grand_parent_id];
    targetRef?.showSecondCommentClick(result.grand_parent_id)
    targetRef?.insertChild({
      parent_id: inputData.parent_id,
      id: result.comment_id,
      article_id: inputData.article_id,
      content: inputData.content,
      time: new Date(),
      like_count: 0,
      reply_count: 0,
      created_at: new Date(),
      user: {
        id: result.user.id,
        username: result.user.name,
        avatar_url: result.user.avatar,
      }
    },
    )
    console.log('插入成功')
  } else {
    comments.value.push({
      id: result.comment_id,
      article_id: inputData.article_id,
      content: inputData.content,
      time: new Date(),
      like_count: 0,
      reply_count: 0,
      created_at: new Date(),
      user: {
        id: result.user.id,
        username: result.user.name,
        avatar_url: result.user.avatar,
      }
    },)
  }

}

function replyComment(parent_id: number, parent_name: string) {
  commentData.value.parent_id = parent_id
  commentData.value.parent_name = parent_name
}

watch(commentData.value, (newValue) => {
  console.log(newValue)
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
