---
sidebar_position: 25
---

# Tabs

Tabs 컴포넌트는 동일한 공간에서 여러 컨텐츠 영역을 전환하여 표시할 수 있는 인터페이스를 제공합니다.

## 가져오기

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'react-common-components-library';

// 또는 중첩 구조로 사용
import { Tabs } from 'react-common-components-library';
// Tabs.List, Tabs.Trigger, Tabs.Content
```

## 기본 사용법

```jsx
<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <h3>Account 설정</h3>
    <p>계정 설정을 변경할 수 있습니다.</p>
  </Tabs.Content>
  <Tabs.Content value="password">
    <h3>비밀번호 변경</h3>
    <p>비밀번호를 변경할 수 있습니다.</p>
  </Tabs.Content>
</Tabs>
```

## 제어 컴포넌트로 사용

```jsx
function ControlledTabs() {
  const [tab, setTab] = useState('account');
  
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <p>계정 설정 내용</p>
      </Tabs.Content>
      <Tabs.Content value="password">
        <p>비밀번호 변경 내용</p>
      </Tabs.Content>
    </Tabs>
  );
}
```

## 프로필 설정 예제

```jsx
<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <div style={{ padding: '16px 0' }}>
      <p style={{ marginBottom: '24px', color: '#64748b' }}>
        Make changes to your account here. Click save when you're done.
      </p>
      
      <div style={{ marginBottom: '16px' }}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue="Pietro Schirano"
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          defaultValue="@skirano"
          style={{ width: '100%' }}
        />
      </div>
      
      <Button variant="primary">Save changes</Button>
    </div>
  </Tabs.Content>
  <Tabs.Content value="password">
    {/* 비밀번호 설정 내용 */}
  </Tabs.Content>
</Tabs>
```

## 속성

### Tabs

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `defaultValue` | `string` | - | 초기에 활성화된 탭의 ID |
| `value` | `string` | - | 현재 선택된 탭의 ID (제어 컴포넌트로 사용할 때) |
| `onValueChange` | `(value: string) => void` | - | 탭 변경 시 호출되는 콜백 함수 |
| `className` | `string` | - | 루트 요소에 적용할 CSS 클래스 |
| `children` | `ReactNode` | - | 탭 컴포넌트 하위 요소 |

### TabsList

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `className` | `string` | - | 탭 리스트에 적용할 CSS 클래스 |
| `children` | `ReactNode` | - | 탭 리스트 하위 요소 |

### TabsTrigger

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | - | 탭의 고유 식별자 |
| `className` | `string` | - | 탭 버튼에 적용할 CSS 클래스 |
| `children` | `ReactNode` | - | 탭 버튼 내용 |
| `disabled` | `boolean` | `false` | 탭 버튼의 비활성화 여부 |

### TabsContent

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | - | 연결된 탭의 고유 식별자 |
| `className` | `string` | - | 탭 컨텐츠에 적용할 CSS 클래스 |
| `children` | `ReactNode` | - | 탭 컨텐츠 내용 |
| `forceMount` | `boolean` | `false` | 탭이 비활성화되었을 때 DOM에서 제거할지 여부 | 