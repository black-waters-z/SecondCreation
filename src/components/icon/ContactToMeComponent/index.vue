<template>
    <view class="contact-to-me-component">
        <SimpleTab @change-tab="changeTab" :tabs="tabs"></SimpleTab>
        <ContactToMe v-for="(item, idx) in result" :key="idx" :source="item"></ContactToMe>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { onMounted } from 'vue';
import ContactToMe from './ContactToMe.vue';
import { getContactNewData, type ContactReturn } from "@/api/contactApi"
import { ref } from 'vue';
import { type ContactToMeData } from './type';
import { tabs } from "@/components/base/ChooseTab/type"
import SimpleTab from '@/components/base/ChooseTab/SimpleTab.vue';
const wholeResult = ref<ContactReturn>({})
const result = ref<ContactToMeData[]>([])
const chooseTab = ref<string>()
onMounted(async () => {
    wholeResult.value = await getContactNewData()
    result.value = wholeResult.value.comment;
})

function changeTab(idx: number) {
    chooseTab.value = tabs[idx].name
    switch (chooseTab.value) {
        case '评论':
            result.value = wholeResult.value.comment;
            break;
        case '点赞':
            result.value = wholeResult.value.like;
            break;
        case '收藏':
            result.value = wholeResult.value.favorite;
            break;
        case '打赏':
            if (!wholeResult.value.tip) {
                result.value = []
                break;
            }
            result.value = wholeResult.value.tip;
            break;
        case '关注':
            if (!wholeResult.value.follow) {
                result.value = []
                break;
            }
            result.value = wholeResult.value.follow;
            break;
    }
}
</script>

<style lang="scss" scoped></style>