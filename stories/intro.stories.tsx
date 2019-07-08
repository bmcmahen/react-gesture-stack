import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as faker from "faker";
import "../src/styles.css";
import {
  ScrollView,
  List,
  ListItem,
  Skeleton,
  Avatar,
  IconChevronRight,
  useTheme,
  Layer,
  IconPlus,
  IconButton
} from "sancho";

import { StackItem, Stack } from "../src";
import { StackTitle } from "../src/StackTitle";

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
          height: "700px",
          width: "400px",
          overflow: "hidden"
        }}
      >
        <Stack
          style={{
            height: "100%",
            width: "100%"
          }}
          items={[
            {
              title: <StackTitle title="Hello world" />,
              content: (
                <StackItem>
                  <ScrollView overflowY>
                    <List>
                      {items.map(item => (
                        <ListItem
                          key={item.uid}
                          onPress={() => setIndex(index + 1)}
                          contentBefore={<Avatar name={item.name} />}
                          primary={item.name}
                          secondary={item.description}
                          contentAfter={
                            <IconChevronRight color={theme.colors.text.muted} />
                          }
                        />
                      ))}
                    </List>
                  </ScrollView>
                </StackItem>
              )
            },
            {
              title: (
                <StackTitle
                  title="Another pane"
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
                    <ScrollView style={{ flex: 1 }} overflowY>
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
                    </ScrollView>
                  </div>
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

storiesOf("Hello", module).add("List detail", () => <ListDetail />);
