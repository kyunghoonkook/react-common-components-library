/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '시작하기',
      items: ['intro', 'installation'],
    },
    {
      type: 'category',
      label: '컴포넌트',
      items: [
        'components/accordion',
        'components/alert-dialog',
        'components/aspect-ratio',
        'components/avatar',
        'components/button',
        'components/checkbox',
        'components/collapsible',
        'components/command',
        'components/context-menu',
        'components/dialog',
        'components/dropdown-menu',
        'components/hovercard',
        'components/input',
        'components/label',
        'components/menubar',
        'components/navigation-menu',
      ],
    },
  ],
};

module.exports = sidebars; 