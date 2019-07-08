import * as React from "react";
import { SpringValue } from "react-spring";

interface StackContextType {
  index: number;
  active: boolean;
  dragging: boolean;
  navHeight: number;
  opacity?: SpringValue<number>;
  transform?: SpringValue<number>;
  changeIndex: (index: number) => void;
}

export const StackContext = React.createContext<StackContextType>({
  index: 0,
  dragging: false,
  navHeight: 50,
  active: false,
  changeIndex: () => {}
});
