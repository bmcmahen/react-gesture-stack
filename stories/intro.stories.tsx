import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as faker from "faker";
import "../src/styles.css";
import {
  ScrollView,
  List,
  ListItem,
  Avatar,
  IconChevronRight,
  useTheme,
  Layer,
  IconPlus,
  IconButton
} from "sancho";

import { StackItem, Stack } from "../src";
import { StackTitle } from "../src/StackTitle";

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

function getUser() {
  faker.seed(0);

  return {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    uid: faker.random.uuid(),
    description: faker.lorem.sentence()
  };
}

function ListDetail() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [items, setItems] = React.useState(
    Array.from(new Array(10)).map(() => getUser())
  );

  function next() {
    setIndex(index + 1);
  }

  function onChange(i: number) {
    setIndex(i);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <Layer
        elevation="sm"
        style={{
          height: "500px",
          width: "400px",
          overflow: "hidden"
        }}
      >
        <Stack
          navHeight={60}
          style={{
            height: "100%",
            width: "100%"
          }}
          items={[
            {
              title: <StackTitle title="Contacts" />,
              content: (
                <StackItem>
                  <div style={{ flex: 1, overflowX: "scroll" }}>
                    <List>
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="All"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="Family"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                      <ListItem
                        onPress={() => setIndex(index + 1)}
                        primary="Friends"
                        contentAfter={
                          <IconChevronRight color={theme.colors.text.muted} />
                        }
                      />
                    </List>
                  </div>
                </StackItem>
              )
            },
            {
              title: (
                <StackTitle
                  title="Family"
                  contentAfter={
                    <IconButton
                      variant="ghost"
                      intent="primary"
                      label="Add"
                      icon={<IconPlus />}
                    />
                  }
                />
              ),
              content: (
                <StackItem>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      height: "100%"
                    }}
                  >
                    <div style={{ flex: 1, overflowX: "scroll" }}>
                      <List>
                        {items.map(item => (
                          <ListItem
                            key={item.uid}
                            onPress={() => setIndex(index + 1)}
                            contentBefore={<Avatar name={item.name} />}
                            primary={item.name}
                            secondary={item.description}
                            contentAfter={
                              <IconChevronRight
                                color={theme.colors.text.muted}
                              />
                            }
                          />
                        ))}
                      </List>
                    </div>
                  </div>
                </StackItem>
              )
            },
            {
              title: <StackTitle title="I'm in a tree!" />,
              content: (
                <StackItem>
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      height: "100%",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1562519776-b232435b73c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)",
                      backgroundSize: "cover"
                    }}
                  />
                </StackItem>
              )
            }
          ]}
          onIndexChange={onChange}
          index={index}
        />
      </Layer>
    </div>
  );
}

storiesOf("Hello", module)
  .add("List detail", () => <ListDetail />)
  .add("simple", () => <Simple />);
