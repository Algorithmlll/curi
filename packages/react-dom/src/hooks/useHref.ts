import { useLocation } from "@curi/react-universal";

import { CuriRouter } from "@curi/router";
import { LocationProps } from "@curi/react-universal";
import { LinkProps } from "../HookLink";

export default function useHref(router: CuriRouter, props: LinkProps): string {
  const locProps: LocationProps = {
    name: props.to,
    params: props.params,
    hash: props.hash,
    query: props.query,
    state: props.state
  };
  const location = useLocation(locProps);
  return router.history.toHref(location);
}
