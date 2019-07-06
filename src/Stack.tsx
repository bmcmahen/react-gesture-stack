import * as React from "react";
import { StackContext } from "./StackContext";
import { animated } from "react-spring";

export function Stack() {
  const { index } = React.useContext(StackContext);

  return (
    <animated.div style={{}}>
      In qui excepteur reprehenderit exercitation fugiat velit. Incididunt minim
      do mollit in ex do labore veniam laboris officia ut laboris ad. Deserunt
      elit adipisicing dolor sunt. Enim do aliquip ullamco sit nostrud nisi
      labore in esse. Ad eiusmod proident Lorem labore laborum consectetur
      ullamco ipsum ipsum officia consectetur voluptate pariatur nulla. Irure
      voluptate est quis elit fugiat dolore amet sunt minim. Id in laborum quis
      officia laborum.
    </animated.div>
  );
}
