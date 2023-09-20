import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "ui";
import { IconCheck } from "icons";

const meta = {
  title: "ui/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeButton: Story = {
  args: {
    ariaLabel: "Test this out!",
    variant: "primary",
    disabled: false,
    icon: <IconCheck />,
    component: "button",
    onClick: () => {},
  },
};
export const TypeAnchor: Story = {
  args: {
    ariaLabel: "Test this out!",
    variant: "primary",
    disabled: false,
    icon: <IconCheck />,
    component: "a",
    href: "https://www.figma.com",
    onClick: () => {},
  },
};
