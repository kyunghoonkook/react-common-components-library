---
sidebar_position: 8
---

# Command

키보드 중심의 명령 팔레트 컴포넌트입니다. 검색 기능과 키보드 단축키를 통해 빠르게 명령을 실행할 수 있습니다.

## 기본 사용법

```jsx
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandSeparator 
} from 'react-common-components-library';

function CommandExample() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="명령어 검색..." />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        
        <CommandGroup heading="제안">
          <CommandItem>
            <span>새 파일</span>
          </CommandItem>
          <CommandItem>
            <span>새 폴더</span>
          </CommandItem>
          <CommandItem>
            <span>설정</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="최근 문서">
          <CommandItem>
            <span>프로젝트 계획서.docx</span>
          </CommandItem>
          <CommandItem>
            <span>분기별 보고서.xlsx</span>
          </CommandItem>
          <CommandItem>
            <span>발표자료.pptx</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## 아이콘과 함께 사용

아이콘을 추가하여 명령어를 더 직관적으로 표시할 수 있습니다:

```jsx
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from 'react-common-components-library';
import { FileIcon, FolderIcon, SettingsIcon, DocumentIcon } from 'react-common-components-library/icons';

function CommandWithIconsExample() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="명령어 검색..." />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        
        <CommandGroup heading="제안">
          <CommandItem>
            <FileIcon className="mr-2 h-4 w-4" />
            <span>새 파일</span>
          </CommandItem>
          <CommandItem>
            <FolderIcon className="mr-2 h-4 w-4" />
            <span>새 폴더</span>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>설정</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="최근 문서">
          <CommandItem>
            <DocumentIcon className="mr-2 h-4 w-4" />
            <span>프로젝트 계획서.docx</span>
          </CommandItem>
          <CommandItem>
            <DocumentIcon className="mr-2 h-4 w-4" />
            <span>분기별 보고서.xlsx</span>
          </CommandItem>
          <CommandItem>
            <DocumentIcon className="mr-2 h-4 w-4" />
            <span>발표자료.pptx</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## 단축키 표시

키보드 단축키를 표시하여 사용자에게 빠른 접근 방법을 알려줄 수 있습니다:

```jsx
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandShortcut 
} from 'react-common-components-library';

function CommandWithShortcutsExample() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="명령어 검색..." />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        
        <CommandGroup heading="파일">
          <CommandItem>
            <span>새 파일</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>파일 열기</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>저장</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="편집">
          <CommandItem>
            <span>실행 취소</span>
            <CommandShortcut>⌘Z</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>다시 실행</span>
            <CommandShortcut>⇧⌘Z</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>잘라내기</span>
            <CommandShortcut>⌘X</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## 대화상자로 사용

Command 컴포넌트를 대화상자로 사용하여 전체 화면에 명령 팔레트를 표시할 수 있습니다:

```jsx
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from 'react-common-components-library';
import { Dialog, DialogContent } from 'react-common-components-library';
import { useState } from 'react';

function CommandDialogExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        명령 팔레트 열기 (⌘K)
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0" style={{ maxWidth: '500px' }}>
          <Command className="rounded-lg">
            <CommandInput placeholder="명령어 검색..." />
            <CommandList>
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              
              <CommandGroup heading="제안">
                <CommandItem onSelect={() => setOpen(false)}>
                  <span>새 파일</span>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <span>새 폴더</span>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <span>설정</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## API 참조

### Command Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | Command 컴포넌트의 자식 요소 |
| `filter` | `(value: string, search: string) => boolean` | 기본 필터 함수 | 검색어와 항목 값을 비교하는 필터 함수 |
| `loop` | `boolean` | false | 목록 끝에 도달했을 때 처음으로 돌아갈지 여부 |
| `value` | `string` | - | 선택된 항목의 값 (제어 컴포넌트) |
| `onValueChange` | `(value: string) => void` | - | 선택된 항목이 변경될 때 호출되는 함수 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandInput Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `placeholder` | `string` | '' | 입력 필드의 플레이스홀더 텍스트 |
| `value` | `string` | - | 입력 필드의 값 (제어 컴포넌트) |
| `onValueChange` | `(value: string) => void` | - | 입력 값이 변경될 때 호출되는 함수 |
| `disabled` | `boolean` | false | 입력 필드 비활성화 여부 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandList Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | CommandList 컴포넌트의 자식 요소 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandEmpty Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | 검색 결과가 없을 때 표시할 내용 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandGroup Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | CommandGroup 컴포넌트의 자식 요소 |
| `heading` | `ReactNode` | - | 그룹의 제목 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandItem Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | CommandItem 컴포넌트의 자식 요소 |
| `value` | `string` | - | 항목의 값 (검색에 사용) |
| `onSelect` | `(value: string) => void` | - | 항목 선택 시 호출되는 함수 |
| `disabled` | `boolean` | false | 항목 비활성화 여부 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandSeparator Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CommandShortcut Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | 단축키 텍스트 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

## 접근성

Command 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- WAI-ARIA 디자인 패턴을 준수하여 스크린 리더 호환성을 보장합니다.
- 키보드 탐색을 완벽하게 지원합니다:
  - 위/아래 화살표 키로 항목 간 이동
  - Enter 키로 항목 선택
  - Esc 키로 명령 팔레트 닫기
- 검색 입력 필드에는 적절한 `aria-label`이 적용되어 있습니다.
- 그룹 제목은 `role="group"`과 `aria-labelledby`를 사용하여 스크린 리더에서 올바르게 인식됩니다.
- 비활성화된 항목에는 `aria-disabled="true"`가 적용됩니다. 