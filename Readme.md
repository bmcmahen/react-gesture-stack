<div align="center">
 <img 
    max-width="300px"
    alt="A demo showing views being swiped left and right."
     src="https://raw.githubusercontent.com/bmcmahen/react-gesture-stack/master/demo.gif">
</div>

# react-gesture-stack

[![npm package](https://img.shields.io/npm/v/react-gesture-stack/latest.svg)](https://www.npmjs.com/package/react-gesture-stack)
[![Follow on Twitter](https://img.shields.io/twitter/follow/benmcmahen.svg?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=benmcmahen)

React-gesture-stack provides an iOS stack-like interface for use on the web. It supports gestures to "go back" in the stack.

## Install

Install `react-gesture-stack` and its peer dependency `react-gesture-responder` using yarn or npm.

```
yarn add react-gesture-stack
```

## Basic usage

```jsx
import { Stack, StackItem, StackTitle } from "react-gesture-stack";

function Simple() {
  const [index, setIndex] = React.useState(0);

  return (
    <Stack
      onIndexChange={i => setIndex(i)}
      index={index}
      style={{ width: "400px", height: "600px" }}
      items={[
        {
          title: <StackTitle title="First title" />,
          content: (
            <StackItem>
              <button onClick={() => setIndex(index + 1)}>View 2</button>
            </StackItem>
          )
        },
        {
          title: <StackTitle title="Second title" />,
          content: (
            <StackItem>
              <button onClick={() => setIndex(index + 1)}>View 3</button>
            </StackItem>
          )
        },
        {
          title: <StackTitle title="Third title" />,
          content: (
            <StackItem>
              <div>No more!</div>
            </StackItem>
          )
        }
      ]}
    />
  );
}
```
