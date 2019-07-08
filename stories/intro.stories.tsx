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

function Example() {
  const theme = useTheme();
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
      <Stack
        style={{
          height: "400px",
          width: "400px"
        }}
        onIndexChange={onChange}
        index={index}
      >
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
        onIndexChange={onChange}
        index={index}
      >
        <StackItem
          style={
            {
              // boxShadow:
              //   "rgba(52, 58, 64, 0.15) 0px 1px 10px 0px, rgba(52, 58, 64, 0.1) 0px 6px 12px 0px, rgba(52, 58, 64, 0.12) 0px 6px 15px -2px"
            }
          }
        >
          <StackTitle
            style={{ background: "white", borderBottom: "1px solid #eee" }}
            title="List"
          />
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

        <StackItem
          style={{
            // boxShadow:
            //   "rgba(52, 58, 64, 0.15) 0px 1px 10px 0px, rgba(52, 58, 64, 0.1) 0px 6px 12px 0px, rgba(52, 58, 64, 0.12) 0px 6px 15px -2px",
            background: "white"
          }}
        >
          <div
            style={{ flexDirection: "column", display: "flex", height: "100%" }}
          >
            <StackTitle title="Details with a very long title than you should accept" />
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
        <StackItem
          style={{
            // boxShadow:
            //   "rgba(52, 58, 64, 0.15) 0px 1px 10px 0px, rgba(52, 58, 64, 0.1) 0px 6px 12px 0px, rgba(52, 58, 64, 0.12) 0px 6px 15px -2px",
            backgroundImage: `url(https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)`,
            backgroundSize: "cover"
          }}
        >
          <StackTitle title="Image" />
        </StackItem>
      </Stack>
    </div>
  );
}

storiesOf("Hello", module)
  .add("Example", () => <Example />)
  .add("List detail", () => <ListDetail />);
