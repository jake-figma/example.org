import "./icons.css";
type IconProps = { size?: "sm" | "md" | "lg" };

export const IconArrowDown = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.4999 4V18.74L19.636 11.1641L20.3639 11.8497L11.9999 20.7292L3.63599 11.8497L4.36391 11.1641L11.4999 18.74L11.4999 4H12.4999Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconArrowLeft = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.1502 3.63599L12.8359 4.36391L5.26002 11.4999H20V12.4999H5.26002L12.8359 19.636L12.1502 20.3639L3.27075 11.9999L12.1502 3.63599Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconArrowRight = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.74 11.4999L11.1641 4.36391L11.8497 3.63599L20.7292 11.9999L11.8497 20.3639L11.1641 19.636L18.74 12.4999H4V11.4999H18.74Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconArrowUp = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.0001 3.27075L20.364 12.1502L19.6361 12.8359L12.5001 5.26002V20H11.5001L11.5001 5.26002L4.36403 12.8359L3.63611 12.1502L12.0001 3.27075Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconBasket = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3C9.23858 3 7 5.23858 7 8H3V13H4.0625L5.13393 21H18.8661L19.9375 13H21V8H17C17 5.23858 14.7614 3 12 3ZM16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8H16ZM4 9V12H20V9H4ZM6.00893 20L5.07143 13H18.9286L17.9911 20H6.00893Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconBasketFilled = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3C9.23858 3 7 5.23858 7 8H3V13H4.0625L5.13393 21H18.8661L19.9375 13H21V8H17C17 5.23858 14.7614 3 12 3ZM16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8H16ZM4 9V12H20V9H4ZM5.33929 15L5.07143 13H18.9286L18.6607 15H5.33929Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconCalendar = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4287 12.2572L14.5713 11.7428L11.8716 16.2422L9.32009 14.1159L8.67991 14.8841L12.1284 17.7578L13.7786 15.0075L15.4287 12.2572Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.5 3C5.67157 3 5 3.67157 5 4.5V5H3V21H21V5H19V4.5C19 3.67157 18.3284 3 17.5 3C16.6716 3 16 3.67157 16 4.5V5H8V4.5C8 3.67157 7.32843 3 6.5 3ZM20 6V9H4V6H20ZM18 4.5V5H17V4.5C17 4.22386 17.2239 4 17.5 4C17.7761 4 18 4.22386 18 4.5ZM7 5V4.5C7 4.22386 6.77614 4 6.5 4C6.22386 4 6 4.22386 6 4.5V5H7ZM4 10H20V20H4V10Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconCaretDown = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.64648 8.35359L4.35359 7.64648L12 15.2929L19.6465 7.64648L20.3536 8.35359L12 16.7071L3.64648 8.35359Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconCaretUp = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 7.29199L20.3536 15.6455L19.6465 16.3527L12 8.70621L4.35359 16.3527L3.64648 15.6455L12 7.29199Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconCheck = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 12L10 16L18 8" stroke="var(--icon-fill)" />
  </svg>
);
export const IconCheckOutlined = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 16.7071L18.3536 8.35355L17.6464 7.64645L10 15.2929L6.35355 11.6464L5.64645 12.3536L10 16.7071Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconClose = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12.6993L18.3001 18.9999L19 18.2999L12.7 11.9993L18.9986 5.70007L18.2987 5.00007L12 11.2993L5.70135 5L5.00142 5.7L11.3001 11.9993L5 18.3L5.69993 19L12 12.6993Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconEnvelope = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 5H21V19H3V5ZM4 16.8428V7.15721L9.14546 12L4 16.8428ZM4.22954 18H19.7705L14.125 12.6866L12 14.6866L9.875 12.6866L4.22954 18ZM14.8545 12L20 16.8428V7.15721L14.8545 12ZM12 13.3134L4.22954 6H19.7705L12 13.3134Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconFavorite = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.36582 5C4.68393 5 3 7.35681 3 9.27941C3 11.3757 4.14827 13.5156 5.93395 15.5854C7.70051 17.6331 9.97719 19.4819 12 20.9932C14.0228 19.4818 16.2995 17.6329 18.0661 15.5852C19.8518 13.5153 21 11.3754 21 9.27941C21 7.357 19.316 5 16.6342 5C15.5801 5 14.5253 5.67685 13.5002 6.71582C12.6759 7.55126 11.3243 7.55125 10.5 6.71582C9.47491 5.6769 8.41994 5 7.36582 5ZM2 9.27941C2 6.90029 4.04051 4 7.36582 4C8.83881 4 10.1419 4.92908 11.2118 6.01347C11.6445 6.45204 12.3557 6.45204 12.7884 6.01347C13.8583 4.92908 15.1612 4 16.6342 4C19.9594 4 22 6.9005 22 9.27941C22 14.1852 16.6673 18.7557 12.5841 21.805C12.236 22.065 11.764 22.065 11.4159 21.805C7.33278 18.7559 2 14.1857 2 9.27941Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconFavoriteFilled = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.36582 4C4.04051 4 2 6.90029 2 9.27941C2 14.1857 7.33278 18.7559 11.4159 21.805C11.764 22.065 12.236 22.065 12.5841 21.805C16.6673 18.7557 22 14.1852 22 9.27941C22 6.9005 19.9594 4 16.6342 4C15.1612 4 13.8583 4.92908 12.7884 6.01347C12.3557 6.45204 11.6445 6.45204 11.2118 6.01347C10.1419 4.92908 8.83881 4 7.36582 4Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconGridView = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 5H11V11H5V5ZM6 6H10V10H6V6Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 13H11V19H5V13ZM6 14H10V18H6V14Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 5V11H19V5H13ZM18 6H14V10H18V6Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 13H19V19H13V13ZM14 14H18V18H14V14Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconListView = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 7H4V8H20V7Z" fill="var(--icon-fill)" />
    <path d="M20 10H4V11H20V10Z" fill="var(--icon-fill)" />
    <path d="M4 13H20V14H4V13Z" fill="var(--icon-fill)" />
    <path d="M17 16H4V17H17V16Z" fill="var(--icon-fill)" />
  </svg>
);
export const IconMenu = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9H21V8H3V9Z" fill="var(--icon-fill)" />
    <path d="M3 16H21V15H3V16Z" fill="var(--icon-fill)" />
  </svg>
);
export const IconMinus = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 11.5H18V12.5H6V11.5Z" fill="var(--icon-fill)" />
  </svg>
);
export const IconMinusOutlined = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 12.5H16V11.5H8V12.5Z" fill="var(--icon-fill)" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconPlay = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 4.80902L20.882 12L6.5 19.191L6.5 4.80902Z"
      stroke="var(--icon-fill)"
    />
  </svg>
);
export const IconPlayFilled = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12L6 20L6 4L22 12Z" fill="var(--icon-fill)" />
  </svg>
);
export const IconPlus = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 12.5V18H12.5V12.5H18V11.5H12.5V6H11.5V11.5H6V12.5H11.5Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconPlusOutlined = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 16V12.5H8V11.5H11.5V8H12.5V11.5H16V12.5H12.5V16H11.5Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
export const IconProduce = ({ size = "md" }: IconProps = {}) => (
  <svg
    className={`icon icon-size-${size}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.6966 2.07086C11.8881 1.97638 12.1123 1.97638 12.3037 2.07086C14.0303 2.923 15.2191 4.71093 15.2191 6.77864C15.2191 8.84634 14.0303 10.6343 12.3037 11.4864C12.1123 11.5809 11.8881 11.5809 11.6966 11.4864C9.97008 10.6343 8.78125 8.84634 8.78125 6.77864C8.78125 4.71093 9.97008 2.923 11.6966 2.07086ZM9.78125 6.77864C9.78125 5.16191 10.6789 3.75686 12.0002 3.0426C13.3214 3.75686 14.2191 5.16191 14.2191 6.77864C14.2191 8.39536 13.3214 9.80041 12.0002 10.5147C10.6789 9.80041 9.78125 8.39536 9.78125 6.77864Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.27775 10.3555C4.34654 10.1529 4.50511 9.99375 4.70705 9.92472C6.52832 9.30208 8.62874 9.72273 10.0856 11.1848C11.5426 12.6469 11.9617 14.7548 11.3413 16.5825C11.2725 16.7852 11.1139 16.9443 10.912 17.0133C9.09073 17.636 6.99031 17.2153 5.5334 15.7532C4.07649 14.2911 3.65732 12.1833 4.27775 10.3555ZM5.17709 10.8272C4.74611 12.2699 5.10135 13.9004 6.24051 15.0436C7.37966 16.1868 9.00443 16.5433 10.442 16.1108C10.8729 14.6682 10.5177 13.0376 9.37854 11.8944C8.23939 10.7512 6.61462 10.3947 5.17709 10.8272Z"
      fill="var(--icon-fill)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.7233 10.3555C19.6545 10.1529 19.4959 9.99375 19.294 9.92472C17.4727 9.30208 15.3723 9.72273 13.9154 11.1848C12.4584 12.6469 12.0393 14.7548 12.6597 16.5825C12.7285 16.7852 12.8871 16.9443 13.089 17.0133C14.9103 17.636 17.0107 17.2153 18.4676 15.7532C19.9245 14.2911 20.3437 12.1833 19.7233 10.3555ZM18.8239 10.8272C17.3864 10.3947 15.7616 10.7512 14.6225 11.8944C13.4833 13.0376 13.1281 14.6682 13.5591 16.1108C14.9966 16.5433 16.6213 16.1868 17.7605 15.0436C18.8997 13.9004 19.2549 12.2699 18.8239 10.8272Z"
      fill="var(--icon-fill)"
    />
    <path
      d="M12.5013 18.8225C12.5015 18.5454 12.2779 18.3206 12.0017 18.3203C11.7256 18.3201 11.5015 18.5446 11.5013 18.8217L11.4995 20.9964H6.66732C6.39118 20.9964 6.16732 21.2211 6.16732 21.4982C6.16732 21.7753 6.39118 22 6.66732 22H17.334C17.6101 22 17.834 21.7753 17.834 21.4982C17.834 21.2211 17.6101 20.9964 17.334 20.9964H12.4995L12.5013 18.8225Z"
      fill="var(--icon-fill)"
    />
  </svg>
);
