import React from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  /**
   * 아바타에 표시할 이미지 URL
   */
  src?: string;
  /**
   * 이미지가 없을 경우 표시할 대체 텍스트 (이니셜)
   */
  alt?: string;
  /**
   * 아바타 크기
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * 아바타 모양
   * @default 'circle'
   */
  shape?: AvatarShape;
  /**
   * 아바타 테두리 표시 여부
   * @default false
   */
  bordered?: boolean;
  /**
   * 온라인 상태 표시 여부
   * @default false
   */
  online?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Avatar 컴포넌트는 사용자 프로필 이미지 또는 이니셜을 표시합니다.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  shape = 'circle',
  bordered = false,
  online = false,
  className = '',
}) => {
  // 이니셜 생성 함수
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const avatarClasses = `
    avatar 
    avatar-${size} 
    avatar-${shape} 
    ${bordered ? 'avatar-bordered' : ''} 
    ${className}
  `.trim();

  return (
    <div className="avatar-container">
      <div className={avatarClasses}>
        {src ? (
          <img src={src} alt={alt} className="avatar-image" />
        ) : (
          <div className="avatar-initials">
            {alt ? getInitials(alt) : '?'}
          </div>
        )}
      </div>
      {online && <div className="avatar-status"></div>}
    </div>
  );
};

export default Avatar; 