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
    return { left: 0, immediate: false, opacity: 1 };
  }

  // next
  else if (i > currentIndex) {
    return { left: 100, immediate: false, opacity: 0 };
  }

  // previous
  return { left: -50, immediate: false, opacity: 0 };
}

/**
 * Stack manager
 */

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  onIndexChange: (index: number) => void;
}

export const Stack: React.FunctionComponent<StackProps> = ({
  style,
  children,
  index,
  onIndexChange,
  ...other
}) => {
  const ref = React.useRef(null);
  const count = React.Children.count(children);
  const childArray = React.Children.toArray(children);
  const bounds = useMeasure(ref);
  const [dragging, setDragging] = React.useState(false);

  // set default positions
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

    setDragging(false);

    // go back if force is great enouggh
    if (direction[0] === 1 && velocity > 0.25) {
      return onIndexChange(index - 1);
    }

    // go back if distance > 50%
    if (xp > 50) {
      return onIndexChange(index - 1);
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
        setDragging(true);
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
          return { immediate: true, left: xp, opacity: (100 - xp) / 100 };
        }

        if (i === index - 1) {
          const dx = 100 - xp;
          return { immediate: true, left: (dx / 2) * -1, opacity: xp / 100 };
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
        position: "relative",
        ...style
      }}
      {...bind}
      {...other}
    >
      {springs.map((props, i) => {
        return (
          <StackContext.Provider
            key={i}
            value={{
              index: i,
              dragging,
              active: i === index,
              opacity: props.opacity,
              transform: props.left.to(x => `translateX(${clamp(x)}%)`),
              changeIndex: onIndexChange
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
