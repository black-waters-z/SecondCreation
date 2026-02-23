import { type ArticleDataDict } from '@/components/icon/ArticleDataComponent/type';
import { computed, type Ref, watch } from 'vue';

export function useChart(source: Ref<ArticleDataDict[]>, groupBy: Ref<'date' | 'week' | 'month'>) {
  const dataUse = computed(() => {
    let dataUse;
    source.value.map((item) => {
      if (item[groupBy.value]) {
        dataUse = item;
      }
    });
    return dataUse;
  });

  const axis = computed(() => {
    const favorites = dataUse.value[groupBy.value]?.favorite ?? [];
    return favorites.map((item) => {
      return item.label;
    });
  });

  const favoritesData = computed(() => {
    const favorites = dataUse.value[groupBy.value]?.favorite ?? [];
    return favorites.map((item) => {
      return item.count;
    });
  });

  const likesData = computed(() => {
    const likes = dataUse.value[groupBy.value]?.like ?? [];
    return likes.map((item) => {
      return item.count;
    });
  });

  const commentsData = computed(() => {
    const comments = dataUse.value[groupBy.value]?.comment ?? [];
    return comments.map((item) => {
      return item.count;
    });
  });

  const options = computed(() => {
    return {
      tooltip: {},
      xAxis: {
        data: axis.value,
      },
      yAxis: {},
      series: [
        {
          name: '点赞数',
          type: 'bar',
          data: likesData.value ?? [],
          itemStyle: {
            color: '#ff69b4', // 粉色
          },
        },
        {
          name: '收藏数',
          type: 'bar',
          data: favoritesData.value ?? [],
          itemStyle: {
            color: '#000000', // 黑色
          },
        },
        {
          name: '评论数',
          type: 'bar',
          data: commentsData.value ?? [],
          itemStyle: {
            color: '#808080', // 灰色
          },
        },
      ],
    };
  });

  return {
    options,
  };
}
