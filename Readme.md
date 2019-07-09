<div align="center">
 <img 
    max-width="300px"
    alt="A demo showing views being swiped left and right."
     src="https://raw.githubusercontent.com/bmcmahen/react-gesture-stack/master/demo.gif">
</div>

# react-gesture-stack

[![npm package](https://img.shields.io/npm/v/react-gesture-stack/latest.svg)](https://www.npmjs.com/package/react-gesture-stack)
[![Follow on Twitter](https://img.shields.io/twitter/follow/benmcmahen.svg?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=benmcmahen)

React-gesture-stack provides an iOS stack-like interface for use on the web. It supports gestures to "go back" in the stack. View the above example [on CodeSandbox](https://codesandbox.io/embed/damp-monad-ukvcu).

This was originally built for use in [Sancho-UI](https://github.com/bmcmahen/sancho).

## Install

Install `react-gesture-stack` and its peer dependency `react-gesture-responder` using yarn or npm.

```
yarn add react-gesture-stack react-gesture-responder
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

## API

### Stack

| Name             | Type                 | Default Value | Description                                             |
| ---------------- | -------------------- | ------------- | ------------------------------------------------------- |
| index \*         | number               |               | The index of stack item to show                         |
| onIndexChange \* | (i: number) => void; |               | A callback requesting the active stack item change      |
| items \*         | StackItemList[]      |               | A list of stack items to render (see the above example) |
| disableNav       | boolean              | true          | Hide the top navigation pane                            |
| navHeight        | number               | 50            | The height of the navigation pane                       |

### StackItem

| Name     | Type       | Default Value | Description               |
| -------- | ---------- | ------------- | ------------------------- |
| style    | object     |               | Optional style attributes |
| children | React.Node |               | Content of the stack item |

### StackTitle

| Name          | Type       | Default Value | Description                                                                  |
| ------------- | ---------- | ------------- | ---------------------------------------------------------------------------- |
| title         | React.Node |               | The title of the stack item                                                  |
| backTitle     | string     | "Back"        | The title of the back button                                                 |
| backTitle     | string     |               | The title of the back button                                                 |
| contentAfter  | React.Node |               | Content that appears to the right of the title                               |
| contentBefore | React.Node |               | Content that appears to the left of the title (and replaces the back button) |

## License

MIT
