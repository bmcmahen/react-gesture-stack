import * as React from "react";
import { useGestureResponder, StateType } from "react-gesture-responder";
import { StackContext } from "./StackContext";
import { useSprings } from "react-spring";
import { useMeasure } from "./use-measure";

/**
 * Get position of stack items
 */

function getAnimationValues(i: number, currentIndex: number) {
  // current
  if (i === currentIndex) {
    return { left: 0, immediate: false };
  }

  // next
  else if (i > currentIndex) {
    return { left: 100, immediate: false };
  }

  // previous
  else {
    return { left: -50, immediate: false };
  }
}

/**
 * Stack manager
 */

interface Props {
  index: number;
  onChange: (index: number) => void;
}

export const Stack: React.FunctionComponent<Props> = ({
  children,
  index,
  onChange
}) => {
  const ref = React.useRef(null);
  const count = React.Children.count(children);
  const childArray = React.Children.toArray(children);
  const bounds = useMeasure(ref);

  const [springs, set] = useSprings(count, i => {
    return getAnimationValues(i, index);
  });

  React.useEffect(() => {
    set(i => getAnimationValues(i, index));
  }, [index, set]);

  // handle termination / gesture end
  // either return to current position or
  // animate to the previous index.
  function onEnd({ delta, velocity, direction }: StateType) {
    const { width } = bounds;
    const [x] = delta;
    const xp = (x / width) * 100;

    // go back if force is great enouggh
    if (direction[0] === 1 && velocity > 0.25) {
      return onChange(index - 1);
    }

    // go back if distance > 50%
    if (xp > 50) {
      return onChange(index - 1);
    }

    // otherwise, reset indexes
    set(i => getAnimationValues(i, index));
  }

  const { bind } = useGestureResponder({
    onStartShouldSet: () => false,
    onMoveShouldSet: ({ initialDirection }) => {
      // only engage on a swipe back and if there is something
      // to swipe back towards
      if (initialDirection[0] === 1 && index > 0) {
        return true;
      }

      return false;
    },
    onRelease: onEnd,
    onTerminate: onEnd,
    onMove: ({ delta }) => {
      const { width } = bounds;
      const [x] = delta;
      const xp = (x / width) * 100;

      set(i => {
        if (i === index) {
          return { immediate: true, left: xp };
        }

        if (i === index - 1) {
          const dx = 100 - xp;
          return { immediate: true, left: (dx / 2) * -1 };
        }

        return getAnimationValues(i, index);
      });
    }
  });

  return (
    <div
      ref={ref}
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
          <StackContext.Provider
            key={i}
            value={{
              index: i,
              active: i === index,
              transform: props.left.to(x => `translateX(${clamp(x)}%)`)
            }}
          >
            {childArray[i]}
          </StackContext.Provider>
        );
      })}
    </div>
  );
};

// ensure values don't exceed our bounds
// when dragging
function clamp(x: number) {
  if (x > 100) {
    return 100;
  }

  if (x < -50) {
    return -50;
  }

  return x;
}
