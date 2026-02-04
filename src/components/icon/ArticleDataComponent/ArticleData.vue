<template>
    <view class="article-data">
        <view class="article-data__info">
            <text class="article-data__info--title">文章标题</text>
            <navigator class="article-data__info--link" url="#" open-type="navigate">
                <text>前往查看文章</text><uni-icons type="arrow-right" size="20"></uni-icons>
            </navigator>
        </view>
        <view class="article-data__chart-choose">
            <choose-tab></choose-tab>
        </view>
        <view class="article-data__chart" style="width: 100%; height:500rpx">
            <l-echart ref="chartRef" @finished="initChart" style="height: 100%"></l-echart>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChooseTab from "@/components/base/ChooseTab/index.vue"
const chartRef = ref<any>(null);
let myChart: any = null;

// 初始化并设置图表配置
const initChart = async () => {
    myChart = await chartRef.value!.init();

    const option = {
        tooltip: {},
        xAxis: {
            data: ['1月25日', '1月26日', '1月27日', '1月28日', '1月29日'],
        },
        yAxis: {},
        series: [
            {
                name: '点赞数',
                type: 'bar',
                data: [5, 20, 36, 10, 10],
                itemStyle: {
                    color: '#ff69b4' // 粉色
                }
            },
            {
                name: '收藏数',
                type: 'bar',
                data: [5, 25, 20, 4, 0],
                itemStyle: {
                    color: '#000000' // 黑色
                }
            },
            {
                name: '评论数',
                type: 'bar',
                data: [1, 2, 3, 1, 0],
                itemStyle: {
                    color: '#808080' // 灰色
                }
            },

        ],
    };

    myChart.setOption(option);
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
    justify-content: center;
    width: 100%;
    height: 100%;

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
    }
}
</style>