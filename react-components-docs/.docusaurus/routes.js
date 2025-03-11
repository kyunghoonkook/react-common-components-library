import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '286'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a61'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '180'),
            routes: [
              {
                path: '/docs/components/accordion',
                component: ComponentCreator('/docs/components/accordion', '061'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/alert-dialog',
                component: ComponentCreator('/docs/components/alert-dialog', '647'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/aspect-ratio',
                component: ComponentCreator('/docs/components/aspect-ratio', 'c0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/avatar',
                component: ComponentCreator('/docs/components/avatar', '73d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', '494'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/checkbox',
                component: ComponentCreator('/docs/components/checkbox', '42d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/collapsible',
                component: ComponentCreator('/docs/components/collapsible', '6ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/command',
                component: ComponentCreator('/docs/components/command', '9d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/context-menu',
                component: ComponentCreator('/docs/components/context-menu', '943'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dialog',
                component: ComponentCreator('/docs/components/dialog', '9b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dropdown-menu',
                component: ComponentCreator('/docs/components/dropdown-menu', '96e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/hovercard',
                component: ComponentCreator('/docs/components/hovercard', '1e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/input',
                component: ComponentCreator('/docs/components/input', '59b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/label',
                component: ComponentCreator('/docs/components/label', '90d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/menubar',
                component: ComponentCreator('/docs/components/menubar', '44b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/navigation-menu',
                component: ComponentCreator('/docs/components/navigation-menu', '1e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popover',
                component: ComponentCreator('/docs/components/popover', 'ac2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/progress',
                component: ComponentCreator('/docs/components/progress', '8be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/radio-group',
                component: ComponentCreator('/docs/components/radio-group', 'c04'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/scroll-area',
                component: ComponentCreator('/docs/components/scroll-area', 'b50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/select',
                component: ComponentCreator('/docs/components/select', '41a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/separator',
                component: ComponentCreator('/docs/components/separator', '98e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/slider',
                component: ComponentCreator('/docs/components/slider', 'ec5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/switch',
                component: ComponentCreator('/docs/components/switch', 'ea5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tabs',
                component: ComponentCreator('/docs/components/tabs', '656'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/textarea',
                component: ComponentCreator('/docs/components/textarea', '7c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tooltip',
                component: ComponentCreator('/docs/components/tooltip', '85f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation',
                component: ComponentCreator('/docs/installation', 'b74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
