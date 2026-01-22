<template>
    <page-wrapper class="w-full tag-nav letter-spacing-4" show-head>
        <go-back class="w-full"></go-back>
        <template #scroll>
            <view class="tag-nav__scroll">
                <IntroductionNav class="tag-nav__introduction">
                    {{ introduction[key] }}
                </IntroductionNav>
                <tag-container :tag-list="tagList"></tag-container>
            </view>

        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import TagContainer from './components/tagContainer.vue';
import IntroductionNav from '@/components/base/IntroductionNav/index.vue';
import { introduction } from './type';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { Tag as TagType } from './type';
import { onLoad } from '@dcloudio/uni-app';
import { listTags } from '@/api/tagApi';
import GoBack from '@/components/common/GoBack.vue';
let key: Ref<'work' | 'character' | 'cross'> = ref('work');
const tagList = ref<TagType[]>([])
onLoad(async (options) => {
    key.value = options?.type;
    const result = await listTags(key.value, true);
    tagList.value = result?.items;
})


</script>

<style lang="scss">
page {
    height: 100vh;
}

.tag-nav-one {
    margin: 6rpx 0;
}

.introduction-nav__icon {
    display: none;
}

.tag-nav {
    &__scroll {
        box-sizing: border-box;
        padding: 0 20px;
    }



    &__introduction {
        margin: 20px 0;
    }

    .introduction-nav__text {
        font-size: 33rpx;
    }
}
</style>