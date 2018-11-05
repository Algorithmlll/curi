import React from "react";
import useCuri from "./useCuri";

import { CancelActiveNavigation } from "@curi/router";
import { NavigatingProps } from "../Navigating";

export default function useNavigating(props: NavigatingProps) {
  const { router } = useCuri();
  const [cancel, setCancel] = React.useState(undefined);
  const [removed, setRemoved] = React.useState(false);

  React.useLayoutEffect(() => {
    return () => {
      setRemoved(true);
    };
  }, []);

  React.useLayoutEffect(() => {
    return router.cancel((cancelFn: CancelActiveNavigation) => {
      if (!removed) {
        setCancel(() => cancelFn);
      }
    });
  }, []);
  return cancel;
}
