import React, { createContext, useContext, useState, useEffect } from 'react';

// 테마 타입 정의
export type Theme = 'light' | 'dark';

// 테마 컨텍스트 타입 정의
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// 기본값으로 초기화된 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

// Props 타입 정의
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * 테마 프로바이더 컴포넌트
 * 애플리케이션 전체의 테마 상태를 관리
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light'
}) => {
  // 테마 상태 초기화 (로컬 스토리지 값 또는 시스템 설정 활용)
  const [theme, setTheme] = useState<Theme>(() => {
    // 로컬 스토리지에서 저장된 테마가 있는지 확인
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      return storedTheme;
    }
    
    // 시스템 기본 설정 확인
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 기본값 사용
    return defaultTheme;
  });

  // 테마 변경 함수
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // HTML 요소에 테마 클래스 적용
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  };

  // 테마 토글 함수
  const toggleTheme = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 초기 마운트 시 테마 적용
  useEffect(() => {
    changeTheme(theme);
    
    // 시스템 테마 변경 감지 리스너
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        changeTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // 이벤트 리스너 등록 및 정리
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 테마 훅
 * 컴포넌트에서 테마 상태와 관련 함수 사용
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 