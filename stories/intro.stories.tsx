import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as faker from "faker";
import {
  ScrollView,
  List,
  ListItem,
  Skeleton,
  Avatar,
  IconChevronRight,
  useTheme
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
    <div>
      <button onClick={next}>nextt</button>
      <Stack
        style={{
          height: "400px",
          width: "400px",
          border: "1px solid #eee",
          borderRadius: "1.5rem"
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
            title: <StackTitle title="Another pane" />,
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
                            <IconChevronRight color={theme.colors.text.muted} />
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
    </div>
  );
}

storiesOf("Hello", module).add("List detail", () => <ListDetail />);
