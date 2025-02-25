import React, { useState, CSSProperties, ReactNode } from "react";
import "./Accordion.css";
import ArrowIcon from '../../icons/ArrowIcon';

export interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  style?: CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  titleStyle,
  contentStyle,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion" style={style}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${activeIndex === index ? "open" : ""}`}
        >
          <button
            className="accordion-title"
            style={titleStyle}
            onClick={() => handleToggle(index)}
          >
            {item.title}
            <ArrowIcon
              direction={activeIndex === index ? 'up' : 'down'}
              className={`accordion-icon ${activeIndex === index ? 'open' : ''}`}
            />
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
