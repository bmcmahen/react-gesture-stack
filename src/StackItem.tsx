import * as React from "react";
import { StackContext } from "./StackContext";
import { animated } from "react-spring";

export interface StackItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StackItem({ style, className = "", ...other }: StackItemProps) {
  const { index, opacity, active, transform } = React.useContext(StackContext);

  if (!transform || !opacity) {
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
        boxShadow: opacity.to(x => `0 0 12px -2px rgba(160,160,160,${x})`),
        transform: transform.to(x => `translateX(${x}%)`),
        ...style
      }}
      {...other}
    />
  );
}
