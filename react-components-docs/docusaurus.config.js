// @ts-check
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Common Components Library",
  tagline: "모던하고 접근성 높은 React 컴포넌트 라이브러리",
  favicon: "img/favicon.png",

  // 배포 URL 설정
  url: "https://kyunghoonkook.github.io",
  // 메인 사용자 페이지에 배포하므로 baseUrl을 '/'로 설정
  baseUrl: "/",

  // GitHub pages 배포 설정
  organizationName: "kyunghoonkook", // GitHub 사용자명
  projectName: "kyunghoonkook.github.io", // GitHub Pages 저장소 이름
  trailingSlash: false,
  deploymentBranch: "main", // GitHub Pages 배포 브랜치

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    function customWebpackConfigPlugin(context, options) {
      return {
        name: 'custom-webpack-config-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                '@site': path.resolve(__dirname),
                'react-common-components-library': path.resolve(__dirname, 'src/mock-components'),
                'react-components-library': path.resolve(__dirname, 'src/mock-components'),
              },
              extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
            module: {
              rules: [
                {
                  test: /\.(js|jsx|ts|tsx|mjs)$/,
                  exclude: /node_modules/,
                  use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                      babelrc: false,
                      configFile: false,
                      presets: [
                        require.resolve('@babel/preset-env'),
                        require.resolve('@babel/preset-react'),
                        require.resolve('@babel/preset-typescript'),
                      ],
                      plugins: [
                        require.resolve('@babel/plugin-transform-runtime'),
                      ],
                      cacheDirectory: true,
                    },
                  },
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 소셜 카드 이미지 참조 제거
      // image: 'img/social-card.jpg',
      
      // 다크모드 설정 - 테마 전환을 위한 설정 추가
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      
      },

      navbar: {
        title: "React Common Components",
        logo: {
          alt: "React Common Components Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "문서",
          },
          {
            href: "https://github.com/kyunghoonkook/react-common-components-library",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "문서",
            items: [
              {
                label: "시작하기",
                to: "/docs/intro",
              },
              {
                label: "컴포넌트",
                to: "/docs/components/accordion",
              },
            ],
          },
          {
            title: "커뮤니티",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/kyunghoonkook/react-components-library",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} React Common Components Library. Built with Docusaurus.`,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
      },
    }),
};

module.exports = config; 