import FavoriteComponent from "@/components/icon/FavoriteComponent/index.vue";
import LikeComponent from "@/components/icon/LikeComponent/index.vue";
import HistoryComponent from "@/components/icon/HistoryComponent/index.vue";
export const componentMap = {
  FavoriteComponent,
  LikeComponent,
  HistoryComponent,
};
export type componentKey = keyof typeof componentMap;
