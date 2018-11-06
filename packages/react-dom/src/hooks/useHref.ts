import { useLocation } from "@curi/react-universal";

import { CuriRouter } from "@curi/router";
import { LinkProps } from "../HookLink";

export default function useHref(router: CuriRouter, props: LinkProps): string {
  const location = useLocation(props);
  return router.history.toHref(location);
}
