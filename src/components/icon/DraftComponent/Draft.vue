<template>
    <navigator open-type="navigate" :url="`/pages/post/index?draft_id=${draft.id}`" class="draft" v-if="showNavigator">
        <view class="flex-1 draft-head">
            <view class="draft-title">{{ draft.title }}</view>
            <view class="draft-delete">
                <uni-icons type="trash-filled" size="22" @click.stop.prevent="deleteDraft"
                    @tap.stop.prevent></uni-icons>
            </view>
        </view>
        <view v-if="draft.created_at" class="draft-build-time">{{ new Date(draft.created_at).toLocaleDateString() }}
        </view>
    </navigator>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { deleteDraftById } from "@/api/draftApi";
import type { DraftListItem } from "./type";
import { ref } from "vue";

const props = defineProps<{
    draft: DraftListItem;
}>();

const showNavigator = ref<boolean>(true);
async function deleteDraft() {
    uni.showModal({
        title: '是否删除草稿？',
        content: '',
        showCancel: true,
        success: async ({ confirm, cancel }) => {
            if (confirm) {
                if (props.draft?.id) {
                    await deleteDraftById(props.draft.id);
                    uni.showToast({ title: '删除成功' });
                }
                showNavigator.value = false
            }
            if (cancel) {
                return;
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.draft {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    margin: 10rpx;
    padding: 20rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-bottom: 1px dashed $border-color;

    .draft-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-delete {
        margin-right: 20rpx;
    }

    .draft-build-time {
        font-size: 22rpx;
        color: $text-muted;
    }
}
</style>