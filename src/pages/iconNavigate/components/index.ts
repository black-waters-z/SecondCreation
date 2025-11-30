import FavoriteComponent from "@/components/icon/FavoriteComponent.vue";

export const iconComponentMap = {
  FavoriteComponent,
} as const;

export type IconComponentKey = keyof typeof iconComponentMap;
