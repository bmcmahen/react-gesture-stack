import * as React from "react";
import { storiesOf } from "@storybook/react";

import { StackItem, Stack } from "../src";

function Example() {
  const [index, setIndex] = React.useState(0);

  function next() {
    setIndex(index + 1);
  }

  function onChange(i: number) {
    setIndex(i);
  }

  return (
    <div>
      <button onClick={next}>nextt</button>
      <Stack onChange={onChange} index={index}>
        <StackItem
          style={{
            boxShadow:
              "rgba(52, 58, 64, 0.15) 0px 1px 8px 0px, rgba(52, 58, 64, 0.1) 0px 1px 3px 0px, rgba(52, 58, 64, 0.12) 0px 2px 3px -2px",
            backgroundImage: `url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)`,
            backgroundSize: "cover"
          }}
        />
        <StackItem
          style={{
            boxShadow:
              "rgba(52, 58, 64, 0.15) 0px 1px 8px 0px, rgba(52, 58, 64, 0.1) 0px 1px 3px 0px, rgba(52, 58, 64, 0.12) 0px 2px 3px -2px",
            backgroundImage: `url(https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)`,
            backgroundSize: "cover"
          }}
        />
        <StackItem
          style={{
            boxShadow:
              "rgba(52, 58, 64, 0.15) 0px 1px 8px 0px, rgba(52, 58, 64, 0.1) 0px 1px 3px 0px, rgba(52, 58, 64, 0.12) 0px 2px 3px -2px",
            backgroundImage: `url(https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)`,
            backgroundSize: "cover"
          }}
        />
      </Stack>
    </div>
  );
}

storiesOf("Hello", module).add("Example", () => <Example />);
