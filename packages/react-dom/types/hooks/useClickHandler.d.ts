import React from "react";
import { CuriRouter } from "@curi/router";
import { LinkProps } from "../HookLink";
export default function useClickHandler(router: CuriRouter, props: LinkProps, setNavigating: (n: boolean) => void): {
    click: (event: React.MouseEvent<HTMLElement>) => void;
    unmounted: () => void;
};
