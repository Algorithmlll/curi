import React from "react";
export interface FocusOptions {
    preventScroll?: boolean;
    preserve?: boolean;
}
export default function useFocus(props: FocusOptions, ref: React.RefObject<HTMLElement | null>): void;
