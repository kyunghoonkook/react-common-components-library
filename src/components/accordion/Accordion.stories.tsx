import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Accordion, { AccordionProps } from "./Accordion";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta<typeof Accordion>;

const Template: StoryFn<AccordionProps> = (args: JSX.IntrinsicAttributes & AccordionProps) => (
  <Accordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { title: "Is it accessible", content: "Yes, it is accessible." },
    { title: "Is it styled", content: "Yes, it is styled." },
    { title: "Is it animated", content: "Yes, it is animated by default." },
    { title: "Is it animated", content: "Yes, it is animated by default." },
  ],
  titleStyle: { fontSize: "16px", color: "#333" },
  contentStyle: { fontSize: "14px", color: "#666" },
  style: { width: "80%", margin: "0 auto" },
};
