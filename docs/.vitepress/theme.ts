import { about, advanced, config, deploy, use } from "./catalogue";

export const theme =  {
  // https://vitepress.dev/reference/default-theme-config
  logo: {
    light: '/images/sealdice.svg',
    dark: '/images/sealdice-dark.svg',
  },
  nav: [
    {
      text: "首页",
      link: "/",
    },
    deploy,
    config,
    use,
    advanced,
    about,
  ],
  sidebar: {
    "/deploy/": deploy,
    "/config/": config,
    "/use/": use,
    "/advanced/": advanced,
    "/about/": about,
  },
  outline: {
    label: '页面导航',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/sealdice' }
  ],
  lastUpdated: {
    text: '上次更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  },
  search: {
    provider: 'local',
    options: {
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          noResultsText: '无法找到相关结果',
          resetButtonTitle: '清除查询条件',
          footer: {
            selectText: '选择',
            navigateText: '切换'
          }
        }
      },
    }
  },
}