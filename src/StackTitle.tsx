import * as React from "react";
import { StackContext } from "./StackContext";
import { animated } from "react-spring";
import { IconChevronLeft } from "./ChevronLeft";

interface StackTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
  backTitle?: React.ReactNode;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
}

const ellipsis = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
} as any;

export function StackTitle({
  title,
  backTitle = "Back",
  contentAfter,
  contentBefore,
  style
}: StackTitleProps) {
  const { index, changeIndex, opacity, transform } = React.useContext(
    StackContext
  );

  if (!transform || !opacity) {
    throw new Error("StackTitle must be used within a Stack component");
  }

  return (
    <animated.div
      style={{
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50px",
        padding: "0.5rem",
        ...style,
        opacity
      }}
    >
      <div
        className="StackTitle__Content-before"
        style={{
          flex: "0 0 100px",
          ...ellipsis
        }}
      >
        {index > 0 && !contentBefore && (
          <button
            onClick={() => {
              changeIndex(index - 1);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              margin: "0.25rem"
            }}
            className="StackTitle__button-back"
          >
            <IconChevronLeft size={24} color="currentColor" />
            {backTitle}
          </button>
        )}
        {contentBefore}
      </div>
      <div
        className="StackTitle__heading"
        style={{
          margin: "0.25rem",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        {title}
      </div>
      <div
        className="StackTitle__content-after"
        style={{
          margin: "0.25rem",
          flex: "0 0 100px",
          ...ellipsis
        }}
      >
        {contentAfter}
      </div>
    </animated.div>
  );
}
