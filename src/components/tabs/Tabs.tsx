import React, { createContext, useContext, useState, HTMLAttributes, ReactNode, ButtonHTMLAttributes, useId, forwardRef, useEffect, useCallback, KeyboardEvent, useRef, Children, isValidElement } from 'react';
import './Tabs.css';

// Tabs의 키보드 네비게이션 방향 상수
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
const HOME = 'Home';
const END = 'End';

// Context 타입 정의
type TabsContextType = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
  registerTab: (id: string) => void;
  unregisterTab: (id: string) => void;
  getTabIndex: (id: string) => number;
  selectTabByIndex: (index: number) => void;
  tabIds: string[];
};

// Context 생성
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Context Hook
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs 컴포넌트는 Tabs.Root 내부에서만 사용할 수 있습니다');
  }
  return context;
};

// TabsList 컴포넌트 Props
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 탭 버튼 리스트 컨텐츠
   */
  children: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 루프 탐색 여부
   * @default true
   */
  loop?: boolean;
}

// TabsTrigger 컴포넌트 Props
export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 탭의 고유 식별자
   */
  value: string;
  
  /**
   * 탭 버튼 컨텐츠
   */
  children: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

// TabsContent 컴포넌트 Props
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 연결된 탭의 고유 식별자
   */
  value: string;
  
  /**
   * 탭 컨텐츠
   */
  children: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 탭이 비활성화되었을 때 DOM에서 제거할지 여부
   */
  forceMount?: boolean;
  
  /**
   * 애니메이션 지속 시간(ms)
   */
  animationDuration?: number;
}

// Tabs 컴포넌트 Props
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 초기에 활성화된 탭의 ID
   */
  defaultValue?: string;
  
  /**
   * 탭의 값 (controlled 컴포넌트로 사용할 때)
   */
  value?: string;
  
  /**
   * 탭 변경 이벤트 핸들러
   */
  onValueChange?: (value: string) => void;
  
  /**
   * 탭 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * 첫 번째 탭으로 자동 포커스 이동
   * @default false
   */
  activationMode?: 'automatic' | 'manual';
  
  /**
   * 탭 컨텐츠
   */
  children: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// TabsRoot 컴포넌트 Props
export interface TabsRootProps extends TabsProps {}

// TabsList 컴포넌트
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({
  children,
  className = '',
  loop = true,
  ...props
}, ref) => {
  const { orientation, selectedTab, getTabIndex, selectTabByIndex, tabIds } = useTabs();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = getTabIndex(selectedTab);
    let nextIndex = currentIndex;
    
    const isHorizontal = orientation === 'horizontal';
    const lastIndex = tabIds.length - 1;
    
    switch (e.key) {
      case isHorizontal ? ARROW_RIGHT : ARROW_DOWN:
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex > lastIndex) {
          nextIndex = loop ? 0 : lastIndex;
        }
        break;
        
      case isHorizontal ? ARROW_LEFT : ARROW_UP:
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = loop ? lastIndex : 0;
        }
        break;
        
      case HOME:
        e.preventDefault();
        nextIndex = 0;
        break;
        
      case END:
        e.preventDefault();
        nextIndex = lastIndex;
        break;
        
      default:
        return;
    }
    
    if (nextIndex !== currentIndex) {
      selectTabByIndex(nextIndex);
      
      // 포커스 이동
      const tabElement = document.querySelector(`[data-tab-value="${tabIds[nextIndex]}"]`) as HTMLElement;
      if (tabElement) {
        tabElement.focus();
      }
    }
  };
  
  return (
    <div 
      ref={ref}
      className={`tabs-list ${className}`} 
      role="tablist"
      aria-orientation={orientation} 
      onKeyDown={handleKeyDown}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = 'Tabs.List';

// TabsTrigger 컴포넌트
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({
  value,
  children,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const { selectedTab, setSelectedTab, activationMode, registerTab, unregisterTab } = useTabs();
  const isSelected = selectedTab === value;
  
  // DOM에 마운트될 때 탭 등록
  useEffect(() => {
    registerTab(value);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);
  
  const handleClick = () => {
    if (!disabled) {
      setSelectedTab(value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Space 또는 Enter 키 처리
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) {
        setSelectedTab(value);
      }
    }
  };
  
  return (
    <button
      ref={ref}
      id={`tab-${value}`}
      className={`tabs-trigger ${isSelected ? 'tabs-trigger-active' : ''} ${disabled ? 'tabs-trigger-disabled' : ''} ${className}`}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? 'active' : 'inactive'}
      data-disabled={disabled ? '' : undefined}
      data-tab-value={value}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
});

TabsTrigger.displayName = 'Tabs.Trigger';

// TabsContent 컴포넌트
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(({
  value,
  children,
  className = '',
  forceMount = false,
  animationDuration = 200,
  ...props
}, ref) => {
  const { selectedTab, orientation } = useTabs();
  const isSelected = selectedTab === value;
  
  if (!forceMount && !isSelected) {
    return null;
  }
  
  const styles = {
    '--tabs-content-transition-duration': `${animationDuration}ms`
  } as React.CSSProperties;
  
  return (
    <div
      ref={ref}
      id={`panel-${value}`}
      className={`tabs-content ${isSelected ? 'tabs-content-active' : ''} ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      data-state={isSelected ? 'active' : 'inactive'}
      data-orientation={orientation}
      hidden={!isSelected}
      style={styles}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
});

TabsContent.displayName = 'Tabs.Content';

// Tabs 컴포넌트 타입 정의
interface TabsComponent extends React.FC<TabsProps> {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
}

// Tabs 메인 컴포넌트
const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  activationMode = 'automatic',
  children,
  className = '',
  ...props
}, ref) => {
  const [selectedTab, setSelectedTabState] = useState<string>(defaultValue || value || '');
  
  // 탭 ID 목록 관리
  const [tabIds, setTabIds] = useState<string[]>([]);
  
  // 제어/비제어 모드 관리
  const isControlled = value !== undefined;
  
  // 탭 변경 핸들러
  const handleTabSelect = useCallback((tabValue: string) => {
    if (!isControlled) {
      setSelectedTabState(tabValue);
    }
    
    if (onValueChange) {
      onValueChange(tabValue);
    }
  }, [isControlled, onValueChange]);
  
  // 외부 값 변경에 대응
  useEffect(() => {
    if (isControlled && value !== selectedTab) {
      setSelectedTabState(value);
    }
  }, [isControlled, value, selectedTab]);
  
  // 탭 등록/해제 함수
  const registerTabHandler = useCallback((id: string) => {
    setTabIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
    
    // 첫 번째 탭을 기본값으로 설정 (defaultValue가 없을 경우)
    if (!defaultValue && !value && !selectedTab && tabIds.length === 0) {
      handleTabSelect(id);
    }
  }, [defaultValue, value, selectedTab, tabIds, handleTabSelect]);
  
  // 탭 해제 함수
  const unregisterTabHandler = useCallback((id: string) => {
    setTabIds(prev => prev.filter(tabId => tabId !== id));
  }, []);
  
  // 탭 인덱스 반환 함수
  const getTabIndex = useCallback((id: string) => {
    return tabIds.indexOf(id);
  }, [tabIds]);
  
  // 인덱스로 탭 선택 함수
  const selectTabByIndex = useCallback((index: number) => {
    if (index >= 0 && index < tabIds.length) {
      handleTabSelect(tabIds[index]);
    }
  }, [tabIds, handleTabSelect]);
  
  // Context 값
  const contextValue: TabsContextType = {
    selectedTab,
    setSelectedTab: handleTabSelect,
    orientation,
    activationMode,
    registerTab: registerTabHandler,
    unregisterTab: unregisterTabHandler,
    getTabIndex,
    selectTabByIndex,
    tabIds
  };
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div 
        ref={ref}
        className={`tabs ${className}`} 
        data-orientation={orientation}
        data-activation-mode={activationMode}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

TabsRoot.displayName = 'Tabs.Root';

// 합성 컴포넌트 생성
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
}) as TabsComponent;

export default Tabs; 