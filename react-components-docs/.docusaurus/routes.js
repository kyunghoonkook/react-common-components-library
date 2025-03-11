import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '6d6'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '75f'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '898'),
            routes: [
              {
                path: '/docs/components/accordion',
                component: ComponentCreator('/docs/components/accordion', '922'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/alert-dialog',
                component: ComponentCreator('/docs/components/alert-dialog', '296'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/aspect-ratio',
                component: ComponentCreator('/docs/components/aspect-ratio', '6cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/avatar',
                component: ComponentCreator('/docs/components/avatar', 'dc5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', 'd2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/checkbox',
                component: ComponentCreator('/docs/components/checkbox', '54f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/collapsible',
                component: ComponentCreator('/docs/components/collapsible', '5fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/command',
                component: ComponentCreator('/docs/components/command', '5bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/context-menu',
                component: ComponentCreator('/docs/components/context-menu', '146'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dialog',
                component: ComponentCreator('/docs/components/dialog', '11e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/dropdown-menu',
                component: ComponentCreator('/docs/components/dropdown-menu', 'ed9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/hovercard',
                component: ComponentCreator('/docs/components/hovercard', '5aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/input',
                component: ComponentCreator('/docs/components/input', 'f91'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/label',
                component: ComponentCreator('/docs/components/label', '1a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/menubar',
                component: ComponentCreator('/docs/components/menubar', 'afa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/navigation-menu',
                component: ComponentCreator('/docs/components/navigation-menu', '6bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/popover',
                component: ComponentCreator('/docs/components/popover', 'c97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/progress',
                component: ComponentCreator('/docs/components/progress', '6b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/radio-group',
                component: ComponentCreator('/docs/components/radio-group', 'a74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/scroll-area',
                component: ComponentCreator('/docs/components/scroll-area', '538'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/select',
                component: ComponentCreator('/docs/components/select', '9a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/separator',
                component: ComponentCreator('/docs/components/separator', '274'),
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
                component: ComponentCreator('/docs/components/switch', 'd7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tabs',
                component: ComponentCreator('/docs/components/tabs', '92d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/textarea',
                component: ComponentCreator('/docs/components/textarea', '6ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/components/tooltip',
                component: ComponentCreator('/docs/components/tooltip', '5e5'),
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
