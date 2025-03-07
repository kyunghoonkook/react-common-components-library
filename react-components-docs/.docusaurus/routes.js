import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '962'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '623'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e9d'),
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
