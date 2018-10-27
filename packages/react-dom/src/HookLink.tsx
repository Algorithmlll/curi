import React from "react";
import { useCuri } from "@curi/react-universal";
import useHref from "./hooks/useHref";
import useClickHandler from "./hooks/useClickHandler";

export type NavigatingChildren = (navigating: boolean) => React.ReactNode;

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  anchor?: React.ReactType;
  children: NavigatingChildren | React.ReactNode;
}

export default React.forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  const { router } = useCuri();
  const [navigating, setNavigating] = React.useState(false);
  const href = useHref(router, props);
  const { click, unmounted } = useClickHandler(router, props, setNavigating);
  React.useEffect(() => {
    return unmounted;
  }, []);

  const {
    to,
    params,
    hash,
    query,
    state,
    onClick,
    anchor: Anchor = "a",
    children,
    ...rest
  } = props;

  return (
    <Anchor onClick={click} href={href} ref={ref} {...rest}>
      {typeof props.children === "function"
        ? (props.children as NavigatingChildren)(navigating)
        : props.children}
    </Anchor>
  );
});
