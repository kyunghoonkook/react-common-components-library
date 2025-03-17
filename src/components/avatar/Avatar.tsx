import React, { forwardRef, useMemo } from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 아바타에 표시할 이미지 URL
   */
  src?: string;

  /**
   * 이미지가 없을 경우 표시할 대체 텍스트 (이니셜)
   */
  alt?: string;

  /**
   * 사용자 이름 (이니셜 생성에 사용)
   */
  name?: string;

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
   * 사용자 상태
   */
  status?: AvatarStatus;

  /**
   * 이미지 로드 실패 시 호출되는 함수
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Avatar 컴포넌트는 사용자 프로필 이미지 또는 이니셜을 표시합니다.
 * 다양한 크기와 모양을 지원하며, 온라인 상태도 표시할 수 있습니다.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt = '',
  name,
  size = 'md',
  shape = 'circle',
  bordered = false,
  status,
  onError,
  className = '',
  ...props
}, ref) => {
  const [imgError, setImgError] = React.useState(false);

  // 이니셜 생성
  const initials = useMemo(() => {
    const text = name || alt;
    if (!text) return '?';
    
    return text
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, [name, alt]);

  // 이미지 에러 핸들링
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
    onError?.(event);
  };

  const avatarClasses = `
    avatar 
    avatar-${size} 
    avatar-${shape} 
    ${bordered ? 'avatar-bordered' : ''} 
    ${className}
  `.trim();

  const showImage = src && !imgError;

  return (
    <div 
      ref={ref}
      className="avatar-container"
      {...props}
    >
      <div 
        className={avatarClasses}
        role="img"
        aria-label={alt || name || '사용자 아바타'}
      >
        {showImage ? (
          <img 
            src={src}
            alt={alt || name || ''}
            className="avatar-image"
            onError={handleError}
          />
        ) : (
          <div className="avatar-initials">
            {initials}
          </div>
        )}
      </div>
      {status && (
        <div 
          className="avatar-status"
          role="status"
          aria-label={`상태: ${status}`}
        />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar; 