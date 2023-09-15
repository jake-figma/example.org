import {
  ButtonBase,
  ButtonBaseComponentProps,
  ButtonBaseIconsProps,
  ButtonBaseSharedProps,
} from "./ButtonBase";

type ButtonProps = ButtonBaseSharedProps &
  ButtonBaseComponentProps &
  ButtonBaseIconsProps;

/**
 * Button component for most tap and click actions
 * @figma component ee6aa9fc246d76871f580719412b4ce839add9d2
 */
export const Button = (props: ButtonProps) => <ButtonBase {...props} />;
