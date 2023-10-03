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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeButton: Story = {
  args: {
    variant: "primary",
    children: "Hello World!",
    disabled: false,
    element: "button",
    iconEnd: <IconArrowRight />,
    onClick: () => {},
  },
};
export const TypeAnchor: Story = {
  args: {
    variant: "primary",
    children: "Hello World!",
    disabled: false,
    element: "a",
    href: "https://www.figma.com",
    iconStart: <IconArrowLeft />,
    onClick: () => {
      alert("optional!");
    },
  },
};
