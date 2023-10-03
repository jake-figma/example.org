import {
  ButtonBase,
  ButtonBaseElementProps,
  ButtonBaseIconOnlyProps,
  ButtonBaseSharedProps,
} from "./ButtonBase";

type ButtonProps = ButtonBaseSharedProps &
  ButtonBaseElementProps &
  ButtonBaseIconOnlyProps;

/**
 * IconButton component for most tap and click actions
 * @figma component 92606e773cd3ba01f8a11789257a9ffaffcda50e
 */
export const IconButton = (props: ButtonProps) => <ButtonBase {...props} />;
