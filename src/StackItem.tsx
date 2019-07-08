import * as React from "react";
import { StackContext } from "./StackContext";
import { animated } from "react-spring";

export interface StackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

export function StackItem({
  heading,
  style,
  className = "",
  ...other
}: StackItemProps) {
  const { index, dragging, active, transform } = React.useContext(StackContext);

  if (!transform) {
    throw new Error("Stack must be used as a child of StackManager");
  }

  const cx = `StackItem StackItem-${index} ${
    active ? "StackItem-active" : ""
  } ${className}`;

  return (
    <animated.div
      className={cx}
      aria-hidden={!active}
      style={{
        background: "white",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform,
        ...style
      }}
      {...other}
    />
  );
}
