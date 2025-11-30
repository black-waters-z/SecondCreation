import FavoriteComponent from "@/components/icon/FavoriteComponent.vue";
import LikeComponent from "@/components/icon/LikeComponent.vue";
export const componentMap = {
  FavoriteComponent,
  LikeComponent,
};
export type componentKey = keyof typeof componentMap;
