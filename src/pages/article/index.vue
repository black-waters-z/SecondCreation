<template>
  <page-wrapper class="w-full article-index" have_no_more>
    <go-back class="w-full" show-logo>返回</go-back>
    <template #scroll>
      <whole-article :article="returnArticle?.article" :user-info="returnArticle?.userInfo">
        <template #collection>
          <collection-nav :source="returnArticle?.collection"></collection-nav>
        </template>
        <template #comment>
          <match-media :min-width="600" v-if="!isMobile">
            <post-comment @send-comment="sendComment" v-model:commentToward="commentData"></post-comment>
            <text class="comment--title">评论</text>
            <view class="article__comments">
              <comment-vue v-for="(comment, index) in comments" :key="index" :comment="comment"
                @comment-reply="replyComment" :ref="(el) => setCommentRef(el, comment.id)"></comment-vue>
            </view>
          </match-media>
        </template>
      </whole-article>
      <match-media :max-width="600" v-if="isMobile">
        <text class="comment--title">评论</text>
        <view class="article__comments">
          <comment-vue v-for="(comment, index) in comments" :key="index" :comment="comment"
            @comment-reply="replyComment" :ref="(el) => setCommentRef(el, comment.id)"></comment-vue>
        </view>
      </match-media>
    </template>
    <template #bottom>
      <match-media :max-width="600">
        <post-comment @send-comment="sendComment" v-model:commentToward="commentData"></post-comment>
      </match-media>
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
import { getArticleById, insertUserViewRecord } from "@/api/articleApi";
import { getArticleCommentList, postCommentFunction } from "@/api/articleCommentApi"
import type { ArticlePageData, FirstComment } from "./type";
import { isMobile } from "@/utils";
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
  await insertUserViewRecord({
    articleId: options?.id,
    duration: 0
  })
})


const commentData = ref<{ content: string, parent_id?: number, parent_name?: string, article_id: number, comment_type: 'first' | 'second' | 'child' }>({ content: '', article_id: 0, comment_type: 'first' })

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
    targetRef?.showSecondCommentOpen()
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

function replyComment(parent_id: number, parent_name: string, comment_type: 'first' | 'second' | 'child') {
  commentData.value.parent_id = parent_id
  commentData.value.parent_name = parent_name
  commentData.value.comment_type = comment_type
  // console.log(parent_id, parent_name, comment_type)
}

watch(commentData.value, (newValue) => {
  console.log(newValue)
})
</script>

<style lang="scss">
page {
  height: 100%;
}

.uni-swiper__warp {
  border-radius: 15px;
}

.comment--title {
  width: 100%;
  padding-left: 20rpx;
  letter-spacing: 4rpx;
  padding-top: 40rpx;
  font-size: 30rpx;
  font-weight: 700;
}

@media screen and (min-width:600px) {
  .article-index {
    .swiper-box {
      max-height: 590px !important;
    }
  }

  .article__comments {
    background-color: white;
    border-radius: 0 0 15px 15px;
    margin-top: 20rpx;
  }

  .comment--title {
    display: none;
  }


}
</style>
