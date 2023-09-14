import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  text?: string;
  primary?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = (props) => {
  return <button>{props.text}</button>;
};
