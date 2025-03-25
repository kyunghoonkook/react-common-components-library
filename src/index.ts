/**
 * @file 컴포넌트 라이브러리 메인 엔트리포인트
 * 
 * 트리쉐이킹 최적화를 위해 각 컴포넌트는 별도로 import 가능합니다.
 * 예시:
 * import { Button } from 'react-common-components-library';
 * 또는
 * import Button from 'react-common-components-library/button';
 */

// 변수 CSS 임포트
import './styles/variables.css';
import './styles/themes.css';

// 모든 컴포넌트 명시적 export
export { default as Accordion } from './components/accordion/Accordion';
export { default as AlertDialog } from './components/alertDialog/AlertDialog';
export { default as AspectRatio } from './components/aspectRatio/AspectRatio';
export { default as Avatar } from './components/avatar/Avatar';
export { default as Button } from './components/button/Button';
export { default as Checkbox } from './components/checkbox/Checkbox';
export { default as Collapsible } from './components/collapsible/Collapsible';
export { default as Command } from './components/command/Command';
export { default as ContextMenu } from './components/contextmenu/ContextMenu';
export { default as Dialog } from './components/dialog/Dialog';
export { default as DropdownMenu } from './components/dropdown-menu/DropdownMenu';
export { default as HoverCard } from './components/hovercard/HoverCard';
export { default as Input } from './components/input/Input';
export { default as Label } from './components/label/Label';
export { default as MenuBar } from './components/menubar/MenuBar';
export { default as NavigationMenu } from './components/navigation-menu/NavigationMenu';
export { default as Popover } from './components/popover/Popover';
export { default as Progress } from './components/progress/Progress';
export { default as RadioGroup } from './components/radio-group/RadioGroup';
export { default as ScrollArea } from './components/scroll-area/ScrollArea';
export { default as Select } from './components/select/Select';
export { default as Separator } from './components/separator/Separator';
export { default as Slider } from './components/slider/Slider';
export { default as Switch } from './components/switch/Switch';
export { default as Tabs } from './components/tabs/Tabs';
export { default as Textarea } from './components/textarea/Textarea';
export { Tooltip } from './components/tooltip/Tooltip';

// ThemeToggle 컴포넌트 export
export * from './components/ThemeToggle';

// 테마 관련 컴포넌트 및 유틸리티
export { ThemeProvider, useTheme } from './styles/ThemeContext';

// 일부 컴포넌트의 타입 export (필요한 경우)
export type { InputProps } from './components/input/Input';
export type { ButtonProps } from './components/button/Button';
export type { AccordionProps } from './components/accordion/Accordion';
export type { DialogProps } from './components/dialog/Dialog';
export type { TabsProps } from './components/tabs/Tabs';