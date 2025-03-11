---
sidebar_position: 11
---

# DropdownMenu

드롭다운 메뉴를 제공하는 컴포넌트입니다. 계층적인 메뉴 구조, 아이콘, 단축키, 하위 메뉴 등을 지원합니다.

## 기본 사용법

```jsx
import { DropdownMenu } from 'react-common-components-library';
import { useState } from 'react';

function DropdownMenuExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu
      title="내 계정"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      sections={[
        {
          items: [
            { 
              id: 'profile', 
              label: '프로필', 
              icon: <ProfileIcon />, 
              onClick: () => console.log('프로필 클릭됨') 
            },
            { 
              id: 'settings', 
              label: '설정', 
              icon: <SettingsIcon />,
              shortcut: '⌘S', 
              onClick: () => console.log('설정 클릭됨') 
            },
          ]
        },
        {
          items: [
            { 
              id: 'logout', 
              label: '로그아웃', 
              icon: <LogoutIcon />, 
              onClick: () => console.log('로그아웃 클릭됨') 
            },
          ]
        }
      ]}
      trigger={
        <button onClick={() => setIsOpen(!isOpen)}>
          계정 메뉴
        </button>
      }
    />
  );
}
```

## 서브메뉴 사용법

마우스를 메뉴 항목 위에 올리면 서브메뉴가 자동으로 표시됩니다:

```jsx
import { DropdownMenu } from 'react-common-components-library';
import { useState } from 'react';

function DropdownWithSubmenuExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu
      title="지원 메뉴"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      sections={[
        {
          items: [
            { 
              id: 'support', 
              label: '고객 지원', 
              icon: <SupportIcon />,
              // subItems 속성을 사용하여 서브메뉴 정의
              subItems: [
                {
                  id: 'help',
                  label: '도움말 센터',
                  icon: <HelpIcon />,
                  onClick: () => console.log('도움말 센터 클릭됨')
                },
                {
                  id: 'chat',
                  label: '실시간 채팅',
                  icon: <ChatIcon />,
                  onClick: () => console.log('실시간 채팅 클릭됨')
                },
                {
                  id: 'email',
                  label: '이메일 지원',
                  icon: <EmailIcon />,
                  onClick: () => console.log('이메일 지원 클릭됨')
                }
              ]
            }
          ]
        }
      ]}
      trigger={
        <button onClick={() => setIsOpen(!isOpen)}>
          지원 메뉴
        </button>
      }
    />
  );
}
```

## 위치 설정

드롭다운 메뉴의 위치를 다양한 방식으로 설정할 수 있습니다:

```jsx
import { DropdownMenu } from 'react-common-components-library';
import { useState } from 'react';

function PositionedDropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu
      title="메뉴 위치 예제"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="bottom-end" // 'bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start' 중 선택
      sections={[
        {
          items: [
            { id: 'item1', label: '항목 1', onClick: () => {} },
            { id: 'item2', label: '항목 2', onClick: () => {} },
          ]
        }
      ]}
      trigger={<button onClick={() => setIsOpen(!isOpen)}>메뉴 열기</button>}
    />
  );
}
```

## 섹션 제목 사용법

메뉴 항목을 섹션으로 그룹화하고 제목을 추가할 수 있습니다:

```jsx
import { DropdownMenu } from 'react-common-components-library';
import { useState } from 'react';

function SectionedDropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      sections={[
        {
          title: "계정 설정",
          items: [
            { id: 'profile', label: '프로필', onClick: () => {} },
            { id: 'settings', label: '설정', onClick: () => {} },
          ]
        },
        {
          title: "지원",
          items: [
            { id: 'help', label: '도움말', onClick: () => {} },
            { id: 'feedback', label: '피드백 보내기', onClick: () => {} },
          ]
        }
      ]}
      trigger={<button onClick={() => setIsOpen(!isOpen)}>메뉴 열기</button>}
    />
  );
}
```

## 서브메뉴 동작 방식

서브메뉴는 다음과 같은 특성을 가지고 있습니다:

1. **마우스 호버로 표시**: 메뉴 항목에 마우스를 올리면 서브메뉴가 표시됩니다.
2. **지연 타이머**: 마우스가 서브메뉴와 메인 메뉴 항목 사이를 이동할 때 약간의 지연 시간이 있어 실수로 서브메뉴가 닫히는 것을 방지합니다.
3. **모바일 대응**: 작은 화면에서는 서브메뉴가 하단에서 슬라이드 업되는 방식으로 표시됩니다.
4. **화살표 표시**: 서브메뉴가 있는 항목은 오른쪽에 화살표 아이콘이 표시됩니다.

## API 참조

### DropdownMenuProps

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `ReactNode` | - | 드롭다운 메뉴 제목 |
| `sections` | `DropdownMenuSection[]` | 필수 | 드롭다운 메뉴 섹션들 |
| `isOpen` | `boolean` | 필수 | 메뉴 열림 상태 |
| `onClose` | `() => void` | 필수 | 메뉴 닫기 핸들러 |
| `trigger` | `ReactNode` | - | 트리거 요소 (드롭다운을 열기 위한 버튼/요소) |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `menuClassName` | `string` | '' | 메뉴 컨테이너에 적용할 추가 CSS 클래스 |
| `width` | `string` | '300px' | 메뉴의 너비 |
| `position` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'right-start' \| 'left-start'` | 'bottom-start' | 메뉴가 트리거 요소 기준으로 표시될 위치 |

### DropdownMenuSection

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | - | 섹션 제목 (선택적) |
| `items` | `DropdownMenuItem[]` | 필수 | 섹션에 포함된 메뉴 항목들 |
| `className` | `string` | '' | 섹션에 적용할 추가 CSS 클래스 |

### DropdownMenuItem

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `id` | `string` | 필수 | 메뉴 항목의 고유 ID |
| `label` | `string` | 필수 | 메뉴 항목에 표시될 레이블 |
| `icon` | `ReactNode` | - | 항목의 아이콘 |
| `shortcut` | `string` | - | 단축키 표시 |
| `onClick` | `() => void` | - | 항목 클릭 시 실행할 함수 |
| `hasSubmenu` | `boolean` | false | 하위 메뉴가 있는지 여부 |
| `subItems` | `DropdownMenuItem[]` | - | 하위 메뉴 항목들. 메뉴 항목에 마우스를 올리면 표시됨 |
| `disabled` | `boolean` | false | 비활성화 여부 |
| `className` | `string` | '' | 항목에 적용할 추가 CSS 클래스 |

## 접근성

DropdownMenu 컴포넌트는 접근성을 고려하여 설계되었습니다:

- Escape 키를 눌러 메뉴를 닫을 수 있습니다.
- 서브메뉴를 포함한 메뉴 항목은 적절한 ARIA 속성을 사용하여 스크린 리더 호환성을 보장합니다.
- 키보드 사용자를 위한 탐색 기능이 구현되어 있습니다. 