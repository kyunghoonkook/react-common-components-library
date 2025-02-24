import React from 'react';
interface AccordionItem {
    title: string;
    content: string;
}
interface AccordionProps {
    items: AccordionItem[];
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
