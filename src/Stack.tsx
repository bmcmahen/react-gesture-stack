import * as React from "react";
import { useGestureResponder, StateType } from "react-gesture-responder";
import { StackContext } from "./StackContext";
import { useSprings } from "react-spring";
import { useMeasure } from "./use-measure";
import { RemoveScroll } from "react-remove-scroll";

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

interface StackItemList {
  title?: React.ReactNode;
  content: React.ReactNode;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  onIndexChange: (index: number) => void;
  items: StackItemList[];
  disableNav?: boolean;
  navHeight?: number;
  disableScroll?: boolean;
}

export const Stack: React.FunctionComponent<StackProps> = ({
  style,
  children,
  index,
  disableNav,
  disableScroll = true,
  navHeight = 50,
  items,
  onIndexChange,
  ...other
}) => {
  const ref = React.useRef(null);
  const count = items.length;
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
    <React.Fragment>
      <RemoveScroll enabled={dragging && disableScroll}>
        <span />
      </RemoveScroll>
      <div
        ref={ref}
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          ...style
        }}
        {...bind}
        {...other}
      >
        {!disableNav && (
          <div
            className="Stack__nav"
            style={{
              height: `${navHeight}px`,
              zIndex: 10,
              position: "relative"
            }}
          >
            {springs.map((props, i) => {
              return (
                <StackContext.Provider
                  key={i}
                  value={{
                    index: i,
                    dragging,
                    navHeight,
                    active: i === index,
                    opacity: props.opacity,
                    transform: props.left.to(x => clamp(x)),
                    changeIndex: onIndexChange
                  }}
                >
                  {items[i].title}
                </StackContext.Provider>
              );
            })}
          </div>
        )}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "white",
            flex: 1
          }}
        >
          {springs.map((props, i) => {
            return (
              <StackContext.Provider
                key={i}
                value={{
                  index: i,
                  dragging,
                  navHeight,
                  active: i === index,
                  opacity: props.opacity,
                  transform: props.left.to(x => clamp(x)),
                  changeIndex: onIndexChange
                }}
              >
                {items[i].content}
              </StackContext.Provider>
            );
          })}
        </div>
      </div>
    </React.Fragment>
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
