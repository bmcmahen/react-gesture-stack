import * as React from "react";
import { useGestureResponder } from "react-gesture-responder";
import { StackContext } from "./StackContext";
import { animated, useSprings, interpolate } from "react-spring";

interface Props {
  index: number;
}

function getAnimationValues(i: number, currentIndex: number) {
  // current

  if (i === currentIndex) {
    return { opacity: 1, left: 0 };
  }

  // next
  else if (i > currentIndex) {
    return { opacity: 1, left: 100 };
  }

  // previous
  else {
    return { opacity: 0, left: -50 };
  }
}

export const StackContainer: React.FunctionComponent<Props> = ({
  children,
  index
}) => {
  const count = React.Children.count(children);
  const childArray = React.Children.toArray(children);

  const [springs, set] = useSprings(count, i => {
    return getAnimationValues(i, index);
  });

  React.useEffect(() => {
    set(i => getAnimationValues(i, index));
  }, [index, set]);

  function onEnd() {}

  const { bind } = useGestureResponder({
    onStartShouldSet: () => false,
    onMoveShouldSet: ({ initialDirection }) => {
      // only allow swipe back
      // and if stack.count > 1
      if (initialDirection[0] === 1) {
        return true;
      }

      return false;
    },
    onRelease: onEnd,
    onTerminate: onEnd,
    onMove: ({ delta, initialDirection }) => {
      console.log("MOVE");
    }
  });

  return (
    <div
      style={{
        overflow: "hidden",
        width: "400px",
        height: "400px",
        position: "relative",
        border: "1px solid black"
      }}
      {...bind}
    >
      {springs.map((props, i) => {
        return (
          <animated.div
            key={i}
            style={{
              background: i === 0 ? "white" : "blue",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: props.left.interpolate(x => `translateX(${x}%)`)
            }}
          >
            <StackContext.Provider value={{ index: 0 }}>
              {childArray[i]}
            </StackContext.Provider>
          </animated.div>
        );
      })}
    </div>
  );
};
