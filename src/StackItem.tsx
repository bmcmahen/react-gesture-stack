import * as React from "react";
import { StackContext } from "./StackContext";
import { animated } from "react-spring";

export interface StackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  generateShadow?: (x: number) => string;
}

export function StackItem({
  style,
  generateShadow,
  children,
  className = "",
  ...other
}: StackItemProps) {
  const { index, opacity, overlay, active, transform } = React.useContext(
    StackContext
  );

  if (!transform || !opacity || !overlay) {
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
        boxShadow: opacity.to(x =>
          generateShadow
            ? generateShadow(x)
            : `0 0 12px -2px rgba(160,160,160,${x})`
        ),
        transform: transform.to(x => `translateX(${x}%)`),
        ...style
      }}
      {...other}
    >
      {children}
      <animated.div
        className="StackItem__overlay"
        style={{
          pointerEvents: "none",
          background: "#f1f3f5",
          opacity: overlay,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
    </animated.div>
  );
}
