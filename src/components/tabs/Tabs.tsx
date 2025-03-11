import React, { createContext, useContext, useState, HTMLAttributes, ReactNode, ButtonHTMLAttributes } from 'react';
import './Tabs.css';

// Context 타입 정의
type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

// Context 생성
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Context Hook
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs 컴포넌트 내에서 사용해야 합니다');
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
   * 탭 컨텐츠
   */
  children: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// TabsList 컴포넌트
export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`tabs-list ${className}`} role="tablist" {...props}>
      {children}
    </div>
  );
};

// TabsTrigger 컴포넌트
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className = '',
  ...props
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;
  
  return (
    <button
      className={`tabs-trigger ${isActive ? 'tabs-trigger-active' : ''} ${className}`}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

// TabsContent 컴포넌트
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className = '',
  forceMount = false,
  ...props
}) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;
  
  if (!isActive && !forceMount) {
    return null;
  }
  
  return (
    <div
      className={`tabs-content ${isActive ? 'tabs-content-active' : ''} ${className}`}
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      hidden={!isActive}
      {...props}
    >
      {children}
    </div>
  );
};

// Tabs 컴포넌트 타입 정의
interface TabsComponent extends React.FC<TabsProps> {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
}

// Tabs 메인 컴포넌트
const TabsRoot: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
  ...props
}) => {
  // 내부 상태 관리
  const [activeTab, setActiveTabInternal] = useState<string>(defaultValue || '');
  
  // 컨트롤드/언컨트롤드 상태 처리
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : activeTab;
  
  // 탭 변경 핸들러
  const setActiveTab = (id: string) => {
    if (!isControlled) {
      setActiveTabInternal(id);
    }
    
    if (onValueChange) {
      onValueChange(id);
    }
  };
  
  return (
    <TabsContext.Provider value={{ activeTab: currentValue, setActiveTab }}>
      <div className={`tabs ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// 합성 컴포넌트 생성
export const Tabs = TabsRoot as TabsComponent;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs; 