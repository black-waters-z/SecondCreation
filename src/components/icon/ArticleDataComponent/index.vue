<template>
    <view>
        <view style="width: 100%; height:500rpx">
            <l-echart ref="chartRef" @finished="initChart" style="height: 100%"></l-echart>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const chartRef = ref<any>(null);
let myChart: any = null;

// 初始化并设置图表配置
const initChart = async () => {
    // H5/App 可直接调用，无需传 echarts；小程序需传入 echarts 库
    // 这里默认兼容 H5/App，如需小程序支持，可按 lime-echart 文档传入 echarts。
    myChart = await chartRef.value!.init();

    const option = {
        title: {
            text: 'ECharts 示例',
        },
        tooltip: {},
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E', 'F'],
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
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
