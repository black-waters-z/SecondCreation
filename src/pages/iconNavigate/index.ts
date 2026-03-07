import FavoriteComponent from '@/components/icon/FavoriteComponent/index.vue';
import LikeComponent from '@/components/icon/LikeComponent/index.vue';
import HistoryComponent from '@/components/icon/HistoryComponent/index.vue';
import DraftComponent from '@/components/icon/DraftComponent/index.vue';
import ArticleManagerComponent from '@/components/icon/ArticleManagerComponent/index.vue';
import ArticleDataComponent from '@/components/icon/ArticleDataComponent/index.vue';
import SettingComponent from '@/components/icon/SettingComponent/index.vue';
import ProblemReplyComponent from '@/components/icon/ProblemReplyComponent/index.vue';
import ContactToMeComponent from '@/components/icon/ContactToMeComponent/index.vue';
import AttentionComponent from '@/components/icon/AttentionComponent/index.vue';
import AITalk from '@/components/icon/AITalk/index.vue';
export const componentMap = {
  FavoriteComponent,
  LikeComponent,
  HistoryComponent,
  DraftComponent,
  ArticleManagerComponent,
  ArticleDataComponent,
  SettingComponent,
  ProblemReplyComponent,
  ContactToMeComponent,
  AttentionComponent,
  AITalk,
};
export type componentKey = keyof typeof componentMap;
