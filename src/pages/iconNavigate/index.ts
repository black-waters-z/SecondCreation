import FavoriteComponent from "@/components/icon/FavoriteComponent/index.vue";
import LikeComponent from "@/components/icon/LikeComponent/index.vue";
export const componentMap = {
  FavoriteComponent,
  LikeComponent,
};
export type componentKey = keyof typeof componentMap;
