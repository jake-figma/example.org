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
  argTypes: {
    icon: {
      options: ["undefined", <IconCheck />],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeButton: Story = {
  args: {
    ariaLabel: "Test this out!",
    variant: "primary",
    disabled: false,
    icon: <IconCheck />,
    element: "button",
    onClick: () => {},
  },
};
export const TypeAnchor: Story = {
  args: {
    ariaLabel: "Test this out!",
    variant: "primary",
    disabled: false,
    icon: <IconCheck />,
    element: "a",
    href: "https://www.figma.com",
    onClick: () => {},
  },
};
