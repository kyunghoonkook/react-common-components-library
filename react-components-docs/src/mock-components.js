import React from 'react';

// 기본적인 모의 컴포넌트 정의
export const Button = ({ children, variant, size, isLoading, isDisabled, leftIcon, rightIcon, ...props }) => (
  <button 
    style={{ 
      padding: size === 'lg' ? '12px 24px' : size === 'sm' ? '4px 8px' : '8px 16px', 
      backgroundColor: variant === 'primary' ? '#3b82f6' : 
                      variant === 'secondary' ? '#93c5fd' : 
                      variant === 'outline' ? 'transparent' : 
                      variant === 'ghost' ? 'transparent' : 
                      variant === 'link' ? 'transparent' : '#e5e7eb',
      color: variant === 'primary' || variant === 'secondary' ? 'white' : '#374151',
      border: variant === 'outline' ? '1px solid #d1d5db' : 'none',
      borderRadius: '4px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      position: 'relative',
    }} 
    disabled={isDisabled}
    {...props}
  >
    {leftIcon && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}
    {isLoading ? '로딩 중...' : children}
    {rightIcon && <span style={{ marginLeft: '8px' }}>{rightIcon}</span>}
  </button>
);

export const ButtonGroup = ({ children, isAttached, spacing, ...props }) => (
  <div 
    style={{ 
      display: 'flex', 
      gap: isAttached ? 0 : spacing ? `${spacing * 4}px` : '8px',
      ...props.style 
    }}
    {...props}
  >
    {children}
  </div>
);

export const Avatar = ({ src, name, size, status, ...props }) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    '2xl': 64,
  };
  const sizeValue = sizeMap[size] || 40;
  
  // 이니셜 가져오기
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div style={{ position: 'relative', width: sizeValue, height: sizeValue }}>
      <div
        style={{
          width: sizeValue,
          height: sizeValue,
          borderRadius: '50%',
          backgroundColor: !src ? '#93c5fd' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: !src ? 'white' : undefined,
          fontWeight: 'bold',
          fontSize: sizeValue / 2.5,
          overflow: 'hidden',
        }}
        {...props}
      >
        {src ? (
          <img src={src} alt={name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          getInitials(name)
        )}
      </div>
      {status && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: sizeValue / 4,
            height: sizeValue / 4,
            borderRadius: '50%',
            backgroundColor: 
              status === 'online' ? '#10b981' : 
              status === 'away' ? '#f59e0b' : 
              status === 'busy' ? '#ef4444' : 
              '#6b7280',
            border: '2px solid white',
          }}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({ children, max, spacing, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max && childrenArray.length > max ? childrenArray.length - max : 0;
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        ...props.style 
      }}
      {...props}
    >
      {visibleAvatars.map((child, index) => (
        <div key={index} style={{ marginLeft: index !== 0 ? `-${spacing || 10}px` : 0, position: 'relative', zIndex: visibleAvatars.length - index }}>
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div 
          style={{ 
            marginLeft: `-${spacing || 10}px`, 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            backgroundColor: '#e5e7eb', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#4b5563',
            position: 'relative',
            zIndex: 0,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export const AspectRatio = ({ ratio = 1, children, ...props }) => (
  <div 
    style={{ 
      position: 'relative',
      width: '100%',
      paddingBottom: `${(1 / ratio) * 100}%`,
      ...props.style 
    }}
    {...props}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {children}
    </div>
  </div>
);

export const AlertDialog = ({ isOpen, onClose, title, description, children, cancelText, confirmText, onConfirm, ...props }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}>
        {title && <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>}
        {description && <p style={{ margin: '0 0 16px 0', color: '#4b5563' }}>{description}</p>}
        {children}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
          <button 
            onClick={onClose}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px', 
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            {cancelText || '취소'}
          </button>
          <button 
            onClick={onConfirm}
            style={{ 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px', 
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {confirmText || '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ items, allowMultiple, defaultExpanded, ...props }) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded ? 
    (Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded]) : 
    []);
  
  const toggleItem = (index) => {
    if (allowMultiple) {
      setExpanded(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setExpanded(prev => prev.includes(index) ? [] : [index]);
    }
  };
  
  return (
    <div {...props}>
      {items.map((item, index) => (
        <div 
          key={index}
          style={{ 
            border: '1px solid #d1d5db', 
            borderRadius: '4px', 
            marginBottom: '8px',
          }}
        >
          <button 
            onClick={() => toggleItem(index)}
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              textAlign: 'left', 
              backgroundColor: 'white', 
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {item.title}
            <span>{expanded.includes(index) ? '▲' : '▼'}</span>
          </button>
          {expanded.includes(index) && (
            <div style={{ padding: '16px', borderTop: '1px solid #d1d5db' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 새로 추가되는 모의 컴포넌트들
export const RadioGroup = ({ children, value, onChange, ...props }) => {
  return (
    <div 
      role="radiogroup"
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...props.style }}
      {...props}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onChange && onChange(child.props.value),
        });
      })}
    </div>
  );
};

export const Radio = ({ children, checked, onChange, disabled, ...props }) => {
  return (
    <label 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <input 
        type="radio" 
        checked={checked} 
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {children}
    </label>
  );
};

export const ScrollArea = ({ children, maxHeight, ...props }) => {
  return (
    <div 
      style={{ 
        maxHeight: maxHeight || '300px',
        overflow: 'auto',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        padding: '8px',
        ...props.style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const Select = ({ children, value, onChange, placeholder, disabled, ...props }) => {
  return (
    <select
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
      disabled={disabled}
      style={{
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: '100%',
        ...props.style
      }}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
};

export const Option = ({ children, value, ...props }) => (
  <option value={value} {...props}>
    {children}
  </option>
);

export const Separator = ({ orientation = 'horizontal', ...props }) => (
  <div
    role="separator"
    style={{ 
      width: orientation === 'horizontal' ? '100%' : '1px',
      height: orientation === 'horizontal' ? '1px' : '100%',
      backgroundColor: '#d1d5db',
      margin: orientation === 'horizontal' ? '8px 0' : '0 8px',
      ...props.style 
    }}
    {...props}
  />
);

export const Slider = ({ min = 0, max = 100, defaultValue = 50, value: propValue, onChange, ...props }) => {
  const [stateValue, setStateValue] = React.useState(propValue !== undefined ? propValue : defaultValue);
  const displayValue = propValue !== undefined ? propValue : stateValue;
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setStateValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  return (
    <div style={{ width: '100%', padding: '10px 0' }}>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={displayValue}
        onChange={handleChange}
        style={{ width: '100%' }} 
        {...props} 
      />
      <div style={{ fontSize: '14px', marginTop: '4px' }}>현재 값: {displayValue}</div>
    </div>
  );
};

export const Switch = ({ checked, onCheckedChange, ...props }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
    <div
      style={{
        position: 'relative',
        width: '40px',
        height: '20px',
        backgroundColor: checked ? '#3b82f6' : '#d1d5db',
        borderRadius: '10px',
        transition: 'background-color 0.2s',
      }}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
    >
      <div
        style={{
          position: 'absolute',
          left: checked ? '20px' : '2px',
          top: '2px',
          width: '16px',
          height: '16px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transition: 'left 0.2s',
        }}
      />
    </div>
    {props.children && <span style={{ marginLeft: '8px' }}>{props.children}</span>}
  </div>
);

export const Tabs = props => <div {...props} />;
Tabs.List = props => <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid #ddd' }} {...props} />;
Tabs.Trigger = props => <button {...props} />;
Tabs.Content = props => <div {...props} />;

export const TabsList = ({ children, selectedValue, onSelect, ...props }) => (
  <div 
    role="tablist" 
    style={{ 
      display: 'flex', 
      gap: '8px',
      ...props.style 
    }}
    {...props}
  >
    {React.Children.map(children, child => {
      if (!React.isValidElement(child)) return null;
      return React.cloneElement(child, {
        isActive: child.props.value === selectedValue,
        onClick: () => onSelect(child.props.value),
      });
    })}
  </div>
);

export const TabsTrigger = ({ children, value, isActive, onClick, ...props }) => (
  <button
    role="tab"
    aria-selected={isActive}
    style={{
      padding: '8px 16px',
      border: 'none',
      backgroundColor: isActive ? 'white' : 'transparent',
      borderBottom: isActive ? '2px solid #3b82f6' : 'none',
      cursor: 'pointer',
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? '#3b82f6' : 'inherit',
      ...props.style
    }}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, selectedValue, ...props }) => {
  if (value !== selectedValue) return null;
  
  return (
    <div style={{ padding: '16px 0' }} {...props}>
      {children}
    </div>
  );
};

export const Textarea = ({ value, onChange, placeholder, disabled, rows = 3, ...props }) => (
  <textarea
    value={value}
    onChange={e => onChange && onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    rows={rows}
    style={{
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      resize: 'vertical',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      ...props.style
    }}
    {...props}
  />
);

export const Label = ({ children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: 'block',
      marginBottom: '4px',
      fontWeight: 500,
      ...props.style
    }}
    {...props}
  >
    {children}
  </label>
);

export const Input = ({ type = 'text', value, onChange, placeholder, disabled, ...props }) => (
  <input
    type={type}
    value={value}
    onChange={e => onChange && onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      ...props.style
    }}
    {...props}
  />
);

export const Popover = ({ children, trigger, content, open, onOpenChange, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(open || false);
  
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  };
  
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...props.style }} {...props}>
      {React.cloneElement(trigger, {
        onClick: handleToggle
      })}
      
      {(open !== undefined ? open : isOpen) && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '8px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            minWidth: '200px'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export const Progress = ({ value = 0, max = 100, ...props }) => (
  <div
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={max}
    style={{
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      ...props.style
    }}
    {...props}
  >
    <div
      style={{
        width: `${(value / max) * 100}%`,
        height: '100%',
        backgroundColor: '#3b82f6',
        transition: 'width 0.3s ease'
      }}
    />
  </div>
);

// 기타 필요한 모든 컴포넌트를 여기에 추가할 수 있습니다.
export const Tooltip = ({ content, children, placement = 'top', ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div style={{ 
          position: 'absolute', 
          [placement === 'top' ? 'bottom' : 
           placement === 'bottom' ? 'top' : 
           placement === 'left' ? 'right' : 'left']: '100%',
          [placement === 'top' || placement === 'bottom' ? 'left' : 'top']: '50%',
          transform: placement === 'top' ? 'translateX(-50%)' : 
                      placement === 'bottom' ? 'translateX(-50%)' : 
                      placement === 'left' ? 'translateY(-50%)' : 'translateY(-50%)',
          marginTop: placement === 'bottom' ? '8px' : 0,
          marginBottom: placement === 'top' ? '8px' : 0,
          marginLeft: placement === 'right' ? '8px' : 0,
          marginRight: placement === 'left' ? '8px' : 0,
          padding: '6px 10px',
          backgroundColor: '#1f2937',
          color: 'white',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 1000,
          whiteSpace: 'nowrap',
        }}>
          {content}
        </div>
      )}
    </div>
  );
};

// Dialog 관련 컴포넌트
export const Dialog = ({ children, open, onOpenChange, ...props }) => {
  if (!open) return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}>
        {children}
        <button 
          onClick={() => onOpenChange && onOpenChange(false)}
          style={{ 
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Command 관련 컴포넌트
export const Command = ({ children, ...props }) => (
  <div style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }} {...props}>
    {children}
  </div>
);

export const CommandInput = ({ placeholder, ...props }) => (
  <input 
    type="text" 
    style={{ 
      width: '100%', 
      padding: '12px 16px', 
      border: 'none', 
      borderBottom: '1px solid #eee', 
      outline: 'none',
      fontSize: '16px'
    }} 
    placeholder={placeholder} 
    {...props} 
  />
);

export const CommandList = ({ children, ...props }) => (
  <div style={{ maxHeight: '300px', overflow: 'auto' }} {...props}>
    {children}
  </div>
);

export const CommandEmpty = ({ children, ...props }) => (
  <div style={{ padding: '16px', color: '#888', textAlign: 'center' }} {...props}>
    {children}
  </div>
);

export const CommandGroup = ({ children, heading, ...props }) => (
  <div style={{ marginBottom: '8px' }} {...props}>
    {heading && <div style={{ padding: '8px 16px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{heading}</div>}
    {children}
  </div>
);

export const CommandItem = ({ children, onSelect, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between' 
    }} 
    onClick={onSelect}
    {...props}
  >
    {children}
  </div>
);

export const CommandShortcut = ({ children, ...props }) => (
  <span style={{ color: '#888', fontSize: '14px' }} {...props}>
    {children}
  </span>
);

// ContextMenu 관련 컴포넌트
export const ContextMenu = ({ children, ...props }) => (
  <div style={{ position: 'relative' }} {...props}>
    {children}
  </div>
);

export const ContextMenuTrigger = ({ children, ...props }) => (
  <div style={{ display: 'inline-block' }} {...props}>
    {children}
  </div>
);

export const ContextMenuContent = ({ children, ...props }) => (
  <div 
    style={{ 
      position: 'absolute', 
      backgroundColor: 'white', 
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '8px 0',
      zIndex: 1000,
      minWidth: '200px'
    }} 
    {...props}
  >
    {children}
  </div>
);

export const ContextMenuItem = ({ children, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      cursor: 'pointer', 
      fontSize: '14px',
      '&:hover': { backgroundColor: '#f9fafb' }
    }} 
    {...props}
  >
    {children}
  </div>
);

export const ContextMenuCheckboxItem = ({ children, checked, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      cursor: 'pointer', 
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': { backgroundColor: '#f9fafb' }
    }} 
    {...props}
  >
    <input 
      type="checkbox" 
      checked={checked} 
      style={{ marginRight: '8px' }} 
      onChange={e => e.stopPropagation()} 
    />
    {children}
  </div>
);

export const ContextMenuLabel = ({ children, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      fontSize: '14px',
      color: '#888',
      fontWeight: 500
    }} 
    {...props}
  >
    {children}
  </div>
);

export const ContextMenuSeparator = (props) => (
  <div 
    style={{ 
      height: '1px',
      backgroundColor: '#eee',
      margin: '4px 0'
    }} 
    {...props}
  />
);

export const ContextMenuRadioGroup = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

export const ContextMenuRadioItem = ({ children, checked, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      cursor: 'pointer', 
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': { backgroundColor: '#f9fafb' }
    }} 
    {...props}
  >
    <input 
      type="radio" 
      checked={checked} 
      style={{ marginRight: '8px' }} 
      onChange={e => e.stopPropagation()} 
    />
    {children}
  </div>
);

export const ContextMenuSub = ({ children, ...props }) => (
  <div style={{ position: 'relative' }} {...props}>
    {children}
  </div>
);

export const ContextMenuSubTrigger = ({ children, ...props }) => (
  <div 
    style={{ 
      padding: '8px 16px', 
      cursor: 'pointer', 
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&:hover': { backgroundColor: '#f9fafb' }
    }} 
    {...props}
  >
    {children}
    <span>▶</span>
  </div>
);

export const ContextMenuSubContent = ({ children, ...props }) => (
  <div 
    style={{ 
      position: 'absolute', 
      left: '100%',
      top: 0,
      backgroundColor: 'white', 
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '8px 0',
      zIndex: 1000,
      minWidth: '200px'
    }} 
    {...props}
  >
    {children}
  </div>
);

// DropdownMenu 관련 컴포넌트
export const DropdownMenu = ContextMenu;

// HoverCard 관련 컴포넌트
export const HoverCard = ({ children, ...props }) => (
  <div style={{ position: 'relative', display: 'inline-block' }} {...props}>
    {children}
  </div>
);

// MenuBar 관련 컴포넌트
export const MenuBar = ({ children, ...props }) => (
  <div 
    style={{ 
      display: 'flex',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '4px'
    }} 
    {...props}
  >
    {children}
  </div>
);

// NavigationMenu 관련 컴포넌트
export const NavigationMenu = ({ children, ...props }) => (
  <nav 
    style={{ 
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '4px',
      padding: '4px'
    }} 
    {...props}
  >
    {children}
  </nav>
);

// PopoverField 관련 컴포넌트
export const PopoverField = ({ children, ...props }) => (
  <div style={{ position: 'relative', display: 'inline-block' }} {...props}>
    {children}
  </div>
);

// RadioGroup.Item 컴포넌트
RadioGroup.Item = ({ children, value, checked, ...props }) => (
  <label style={{ display: 'flex', alignItems: 'center', margin: '8px 0', cursor: 'pointer' }}>
    <input type="radio" value={value} checked={checked} style={{ marginRight: '8px' }} {...props} />
    {children}
  </label>
);

// Checkbox 컴포넌트 수정
export const Checkbox = ({ checked, disabled, onChange, id, value, children, ...props }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
    <input 
      type="checkbox" 
      checked={checked} 
      disabled={disabled}
      onChange={onChange}
      id={id}
      value={value}
      style={{ margin: '0 8px 0 0' }}
      {...props}
    />
    {children && <label htmlFor={id} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>{children}</label>}
  </span>
);

// CheckboxGroup 컴포넌트
export const CheckboxGroup = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

// Collapsible 관련 컴포넌트
export const Collapsible = ({ children, open, onOpenChange, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

export const CollapsibleTrigger = ({ children, ...props }) => (
  <button 
    style={{ 
      background: 'none',
      border: 'none',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }} 
    {...props}
  >
    {children}
    <span>▼</span>
  </button>
);

export const CollapsibleContent = ({ children, ...props }) => (
  <div style={{ padding: '8px' }} {...props}>
    {children}
  </div>
);

// CommandSeparator 컴포넌트
export const CommandSeparator = (props) => (
  <div 
    style={{ 
      height: '1px',
      backgroundColor: '#eee',
      margin: '4px 0'
    }} 
    {...props}
  />
);

// DialogContent 컴포넌트
export const DialogContent = ({ children, ...props }) => (
  <div 
    style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}
    {...props}
  >
    {children}
  </div>
); 