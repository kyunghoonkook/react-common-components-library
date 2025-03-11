---
sidebar_position: 16
---

# NavigationMenu

NavigationMenu 컴포넌트는 웹사이트의 주요 네비게이션 영역을 구성하는 데 사용됩니다. 드롭다운 메뉴와 링크 목록을 포함할 수 있으며, 사용자가 웹사이트의 다양한 섹션으로 쉽게 이동할 수 있도록 도와줍니다.

## 기본 사용법

기본적인 네비게이션 메뉴 구현 예시입니다.

```jsx
import { NavigationMenu } from 'react-common-components-library';

function BasicExample() {
  return (
    <NavigationMenu
      items={[
        {
          label: 'Getting started',
          content: {
            title: 'Introduction',
            description: 'Re-usable components built using Radix UI and Tailwind CSS',
            links: [
              {
                title: 'Introduction',
                description: 'Re-usable components built using Radix UI and Tailwind CSS',
                href: '/docs/introduction',
              },
              {
                title: 'Installation',
                description: 'How to install dependencies and structure your app.',
                href: '/docs/installation',
              },
              {
                title: 'Typography',
                description: 'Styles for headings, paragraphs, lists...etc',
                href: '/docs/typography',
              },
            ],
          },
          active: true,
        },
        {
          label: 'Components',
          content: {
            links: [
              {
                title: 'Accordion',
                description: 'A vertically stacked set of interactive headings.',
                href: '/docs/components/accordion',
              },
              {
                title: 'Alert Dialog',
                description: 'A modal dialog that interrupts the user with important content.',
                href: '/docs/components/alert-dialog',
              },
              {
                title: 'Button',
                description: 'Displays a button or a component that looks like a button.',
                href: '/docs/components/button',
              },
            ],
          },
        },
        {
          label: 'Documentation',
          content: {
            links: [
              {
                title: 'API Reference',
                description: 'Complete API reference for all components.',
                href: '/docs/api-reference',
              },
              {
                title: 'Styling Guide',
                description: 'Learn how to customize the look and feel of components.',
                href: '/docs/styling-guide',
              },
            ],
          },
        },
        {
          label: 'Blog',
          href: '/blog',
        },
      ]}
    />
  );
}
```

## 커스텀 콘텐츠 사용

네비게이션 메뉴의 드롭다운에 커스텀 콘텐츠를 추가할 수 있습니다.

```jsx
import { NavigationMenu } from 'react-common-components-library';

function CustomContentExample() {
  return (
    <NavigationMenu
      items={[
        {
          label: 'Getting started',
          href: '/getting-started',
        },
        {
          label: 'Components',
          content: {
            customContent: (
              <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h2>Component Categories</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                    <h3>Layout</h3>
                    <ul>
                      <li>Container</li>
                      <li>Box</li>
                      <li>Grid</li>
                      <li>Stack</li>
                    </ul>
                  </div>
                  <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                    <h3>Forms</h3>
                    <ul>
                      <li>Input</li>
                      <li>Checkbox</li>
                      <li>Select</li>
                      <li>Radio</li>
                    </ul>
                  </div>
                  <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                    <h3>Feedback</h3>
                    <ul>
                      <li>Alert</li>
                      <li>Toast</li>
                      <li>Progress</li>
                      <li>Skeleton</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
          },
        },
        {
          label: 'Blog',
          href: '/blog',
        },
      ]}
    />
  );
}
```

## 단순 링크 사용

드롭다운 없이 단순 링크만 사용할 수도 있습니다.

```jsx
import { NavigationMenu } from 'react-common-components-library';

function SimpleLinksExample() {
  return (
    <NavigationMenu
      items={[
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'About',
          href: '/about',
        },
        {
          label: 'Services',
          href: '/services',
        },
        {
          label: 'Contact',
          href: '/contact',
        },
      ]}
    />
  );
}
```

## 너비 조정

NavigationMenu의 너비를 조정할 수 있습니다.

```jsx
import { NavigationMenu } from 'react-common-components-library';

function WidthExample() {
  return (
    <NavigationMenu
      width="800px"
      items={[
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'About',
          href: '/about',
        },
        {
          label: 'Services',
          href: '/services',
        },
        {
          label: 'Contact',
          href: '/contact',
        },
      ]}
    />
  );
}
```

## API 참조

### NavigationMenu

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | `NavigationItemProps[]` | 필수 | 네비게이션 메뉴 항목 목록 |
| `className` | `string` | '' | 네비게이션 메뉴에 적용할 추가 CSS 클래스 |
| `style` | `React.CSSProperties` | - | 네비게이션 메뉴에 적용할 스타일 |
| `width` | `string` | '100%' | 네비게이션 메뉴의 너비 |

### NavigationItemProps

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | 필수 | 네비게이션 항목 제목 |
| `content` | `NavigationContent` | - | 네비게이션 항목 콘텐츠 (드롭다운 메뉴) |
| `href` | `string` | - | 네비게이션 항목 링크 URL (content가 없을 경우 사용) |
| `active` | `boolean` | false | 현재 활성화된 항목인지 여부 |
| `className` | `string` | '' | 네비게이션 항목에 적용할 추가 CSS 클래스 |

### NavigationContent

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | - | 콘텐츠 제목 |
| `description` | `string` | - | 콘텐츠 설명 |
| `links` | `NavigationLink[]` | - | 콘텐츠 내 링크 목록 |
| `customContent` | `React.ReactNode` | - | 커스텀 콘텐츠 |

### NavigationLink

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | 필수 | 링크 제목 |
| `description` | `string` | - | 링크 설명 |
| `href` | `string` | 필수 | 링크 URL |

## 접근성

NavigationMenu 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

1. **키보드 접근성**: 모든 메뉴 항목은 키보드로 접근 가능하며, 탭 키를 사용하여 항목 간 이동이 가능합니다.

2. **ARIA 속성**: 적절한 `role`, `aria-haspopup`, `aria-expanded` 속성을 사용하여 스크린 리더가 메뉴 구조를 인식할 수 있도록 합니다.

3. **포커스 관리**: 메뉴가 열릴 때 첫 번째 메뉴 항목으로 포커스가 이동하고, 메뉴가 닫힐 때 이전 포커스된 요소로 되돌아갑니다.

4. **화면 판독기 지원**: 메뉴 항목과 설명은 화면 판독기에 의해 올바르게 해석됩니다.

5. **시맨틱 마크업**: 적절한 HTML 요소와 속성을 사용하여 의미론적으로 올바른 마크업을 제공합니다. 