import type { CommentInfo } from '@/components/shop/comment/type';
export interface GoodInfos {
  // 商品页
  id: number;
  description: string;
  choices: goodChoice[];
  comments: CommentInfo[];
}

export interface goodChoice {
  // 其中一个选择,商品的图片是放在轮播上的，【点击tag自动切换轮播到那个位置】
  id: number;
  name: string;
  price: number;
  swiperImg: string;
  //   库存
  stock: number;
}

// 定义富文本nodes数组，可直接在uniapp的<rich-text>组件中使用
export const richTextNodes = [
  // 标题
  {
    name: 'h2',
    attrs: {
      style: 'font-size: 18px; color: #333; font-weight: bold; margin: 10px 0; text-align: center;',
    },
    children: [
      {
        type: 'text',
        text: '粉黑系同人周边套装 心动开售',
      },
    ],
  },
  // 引言
  {
    name: 'p',
    attrs: {
      style: 'font-size: 15px; color: #666; line-height: 1.6; margin: 8px 0;',
    },
    children: [
      {
        type: 'text',
        text: '当热烈粉撞上酷感黑，次元热爱即刻具象化！',
      },
    ],
  },
  // 核心描述
  {
    name: 'p',
    attrs: {
      style: 'font-size: 15px; color: #666; line-height: 1.6; margin: 8px 0;',
    },
    children: [
      {
        type: 'text',
        text: '这款同人周边套装，以',
      },
      {
        type: 'text',
        text: '高还原角色元素',
        attrs: {
          style: 'color: #e63946; font-weight: bold;',
        },
      },
      {
        type: 'text',
        text: '为核心，粉黑撞色设计瞬间拉满视觉张力，甜酷氛围感直接拉满。',
      },
    ],
  },
  // 列表标题
  {
    name: 'p',
    attrs: {
      style: 'font-size: 15px; color: #333; font-weight: bold; margin: 12px 0 8px 0;',
    },
    children: [
      {
        type: 'text',
        text: '✨ 周边详情',
      },
    ],
  },
  // 列表项1：角色徽章
  {
    name: 'p',
    attrs: {
      style: 'font-size: 14px; color: #666; line-height: 1.6; margin: 4px 0; padding-left: 10px;',
    },
    children: [
      {
        type: 'text',
        text: '角色徽章：磨砂底衬搭配烫金线条，粉黑撞色边框勾勒出角色经典神态，别在背包、痛包上，走到哪里都是吸睛焦点。',
      },
    ],
  },
  // 列表项2：双面镭射票
  {
    name: 'p',
    attrs: {
      style: 'font-size: 14px; color: #666; line-height: 1.6; margin: 4px 0; padding-left: 10px;',
    },
    children: [
      {
        type: 'text',
        text: '双面镭射票：一面是角色飒爽名场面，黑粉渐变镭射层随光线流转折射幻彩；另一面印刻专属台词，质感拉满，收藏、摆拍两相宜。',
      },
    ],
  },
  // 列表项3：皮质挂件
  {
    name: 'p',
    attrs: {
      style: 'font-size: 14px; color: #666; line-height: 1.6; margin: 4px 0; padding-left: 10px;',
    },
    children: [
      {
        type: 'text',
        text: '皮质挂件：细腻皮质触感舒适，黑粉拼接造型小巧精致，挂在钥匙、耳机上，让次元陪伴随身携带。',
      },
    ],
  },
  // 品质说明
  {
    name: 'p',
    attrs: {
      style: 'font-size: 14px; color: #666; line-height: 1.6; margin: 10px 0;',
    },
    children: [
      {
        type: 'text',
        text: '每一款周边都经过精细打磨，色彩还原度高、不易掉色，是同人爱好者收藏、送礼的绝佳选择。',
      },
    ],
  },
  // 结尾
  {
    name: 'p',
    attrs: {
      style: 'font-size: 15px; color: #e63946; line-height: 1.6; margin: 10px 0; font-weight: 500;',
    },
    children: [
      {
        type: 'text',
        text: '戴上它，让粉黑酷飒风承包你的日常，把对角色的喜欢，变成触手可及的浪漫～',
      },
    ],
  },
];
