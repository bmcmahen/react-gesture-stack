import * as React from "react";
import { storiesOf } from "@storybook/react";
import { StackContainer } from "../src/StackManager";
import { Stack } from "../src";

function Example() {
  const [index, setIndex] = React.useState(0);

  function next() {
    setIndex(index + 1);
  }

  return (
    <div>
      <button onClick={next}>nextt</button>
      <StackContainer index={index}>
        <Stack />
        <Stack />
        <Stack />
      </StackContainer>
    </div>
  );
}

storiesOf("Hello", module).add("Example", () => <Example />);
