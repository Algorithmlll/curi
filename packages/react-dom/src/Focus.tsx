import React from "react";

import useFocus from "./hooks/useFocus";

import { ReactNode, Ref } from "react";

export interface FocusProps {
  children(ref: Ref<any>): ReactNode;
  preventScroll?: boolean;
  preserve?: boolean;
}

const Focus = (props: FocusProps) => {
  const ref = React.useRef(null);
  useFocus(props, ref);
  return props.children(ref);
};

export default Focus;
