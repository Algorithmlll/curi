import React from "react";
import useCuri from "./useCuri";

import { Params } from "@curi/router";

export interface LocationProps {
  name?: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
}

export default function useLocation(props: LocationProps) {
  const { router } = useCuri();
  const pathname = React.useMemo(
    () => {
      return props.name ? router.route.pathname(props.name, props.params) : "";
    },
    [
      props.name,
      ...Object.keys(props.params || {}).map(key => props.params[key])
    ]
  );

  return {
    pathname,
    hash: props.hash,
    query: props.query,
    state: props.state
  };
}
