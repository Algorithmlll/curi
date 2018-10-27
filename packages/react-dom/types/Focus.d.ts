import React from "react";
import { ReactNode, Ref } from "react";
export interface FocusProps {
    children(ref: Ref<any>): ReactNode;
    preventScroll?: boolean;
    preserve?: boolean;
}
declare const Focus: (props: FocusProps) => React.ReactNode;
export default Focus;
