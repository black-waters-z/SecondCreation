module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/recommended", // 此项是用来配置vue.js风格
    "eslint:recommended", //继承Eslint中推荐的（打钩的）规则项
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {},
};
