import React from "react";
export declare type NavigatingChildren = (navigating: boolean) => React.ReactNode;
export interface LinkProps {
    name?: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    anchor?: React.ReactType;
    children: NavigatingChildren | React.ReactNode;
    forward: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
declare const _default: React.ComponentType<LinkProps & React.ClassAttributes<any>>;
export default _default;
