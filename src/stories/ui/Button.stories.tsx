import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "ui";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TypeButton: Story = {
  args: {
    variant: "primary",
    children: "Hello World!",
    disabled: false,
    component: "button",
    onClick: () => {},
  },
};
export const TypeAnchor: Story = {
  args: {
    variant: "primary",
    children: "Hello World!",
    disabled: false,
    component: "a",
    href: "https://www.figma.com",
    onClick: () => {
      alert("optional!");
    },
  },
};
