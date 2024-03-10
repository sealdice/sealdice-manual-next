// @ts-ignore
import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";
import { cut } from "@node-rs/jieba";

export default hopeTheme({
  hostname: "http://localhost:8080",
  author: {
    name: "SealDice Team",
    url: "https://github.com/sealdice",
  },
  favicon: "/images/sealdice.svg",
  docsDir: "docs",

  navbar,
  logo: "/images/sealdice.svg",
  logoDark: "/images/sealdice-dark.svg",
  repo: "sealdice/sealdice-core",

  sidebar,

  breadcrumb: true,
  pageInfo: ["ReadingTime"],
  contributors: false,
  editLink: false,
  docsRepo: "sealdice/sealdice-manual-next",
  docsBranch: "main",
  displayFooter: false,
  home: "/index.md",
  pure: true,
  print: false,

  iconAssets: "iconfont",

  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    copyCode: {
      showInMobile: true,
    },
    mdEnhance: {
      hint: true,
      tabs: true,
      figure: true,
      imgMark: true,
      imgSize: true,
      align: true,
    },
    searchPro: {
      indexContent: true,
      autoSuggestions: true,
      indexOptions: {
        // 使用 jieba 分词
        tokenize: (text, fieldName) =>
          fieldName === "id" ? [text] : cut(text, true),
      },
    },
  },
});
