import * as React from "react";
import { SpringValue } from "react-spring";

interface StackContextType {
  index: number;
  active: boolean;
  transform?: SpringValue<string>;
}

export const StackContext = React.createContext<StackContextType>({
  index: 0,
  active: false
});
