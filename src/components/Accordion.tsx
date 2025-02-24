import React, { useState, CSSProperties, ReactNode } from 'react';
import './Accordion.css';

export interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  activeTitleStyle?: CSSProperties;
  style?: CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({ items, titleStyle, contentStyle, activeTitleStyle, style }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion" style={style}>
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-title"
            style={activeIndex === index ? activeTitleStyle : titleStyle}
            onClick={() => handleToggle(index)}
          >
            {item.title}
          </button>
          {activeIndex === index && (
            <div className="accordion-content" style={contentStyle}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion; 