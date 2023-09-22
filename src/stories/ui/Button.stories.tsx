import type { Meta, StoryObj } from "@storybook/react";
import { IconArrowLeft, IconArrowRight } from "icons";
import { Button } from "ui";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconEnd: {
      control: "radio",
      options: [undefined, <IconArrowRight />],
    },
    iconStart: {
      control: "radio",
      options: [undefined, <IconArrowLeft />],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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
