import * as React from "react";

interface ChevronIconProps {
  color: string;
  size: number;
}
export const IconChevronLeft: React.FunctionComponent<ChevronIconProps> = ({
  color,
  size,
  ...props
}) => {
  return (
    <svg
      className="IconChevronLeft"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
};
