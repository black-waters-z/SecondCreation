<template>
    <view class="article-data">
        <view class="article-data__info">
            <text class="article-data__info--title">{{ articleData?.[0].article_name }}</text>
            <navigator class="article-data__info--link" :url="`/pages/article/index?id=${articleData?.[0].article_id}`"
                open-type="navigate">
                <text></text><uni-icons type="arrow-right" size="20"></uni-icons>
            </navigator>
        </view>
        <view class="article-data__chart-choose">
            <choose-tab @choose="chooseTabChange"></choose-tab>
        </view>
        <view class="article-data__chart">
            <l-echart ref="chartRef" @finished="initChart"></l-echart>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChooseTab from "@/components/base/ChooseTab/index.vue"
import { type ArticleDataDict } from "@/components/icon/ArticleDataComponent/type"
import { useChart } from "@/hooks/useChart"
const props = defineProps<{
    articleData: ArticleDataDict[],
}>()
const articleData = ref<ArticleDataDict[]>(props.articleData)
const chooseTab = ref<'date' | 'week' | 'month'>('date')
const { options } = useChart(articleData, chooseTab);

function chooseTabChange(value: 'date' | 'week' | 'month') {
    chooseTab.value = value;
    updateChart(options.value);
}

const chartRef = ref<any>(null);
let myChart: any = null;

// 初始化并设置图表配置
const initChart = async () => {
    if (!props.articleData || Object.keys(props.articleData).length === 0) {
        return; // 数据无效时不初始化图表
    }
    myChart = await chartRef.value!.init();

    const option = options.value

    myChart.setOption(option);
    // console.log('图表已初始化', option);
};

// 如果需要在其他地方更新图表数据
const updateChart = (newOption: Record<string, any>) => {
    if (myChart) {
        myChart.setOption(newOption);
    }
};
</script>

<style lang="scss" scoped>
.article-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;

        &--title {
            flex: 1;
            letter-spacing: 2rpx;
            font-size: 32rpx;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            padding-right: 20rpx;
        }

        &::before {
            content: '';
            display: block;
            background-color: $pink-400;
            width: 10rpx;
            height: 35rpx;
            border-radius: 5rpx;
            margin-right: 20rpx;
        }

        &--link {
            font-size: 26rpx;
            text-decoration: underline;
            color: $text-muted;
            font-style: italic;
        }
    }

    &__chart-choose {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    &__chart {
        width: 100%;
        box-sizing: border-box;
        background-color: $pink-50;
        margin: 20rpx 0;
        height: 500rpx
    }
}

@media screen and (min-width:600px) {
    .article-data {
        align-items: flex-start;
        background-color: white;


        &__chart {
            width: 1000rpx;
            height: 800rpx;
            margin-top: 20px;
            margin-left: 10px;
        }

        &__info--link {
            margin-right: 160rpx;
            transform: translateY(40px);
        }
    }

}
</style>