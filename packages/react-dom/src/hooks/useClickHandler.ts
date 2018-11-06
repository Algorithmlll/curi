import React from "react";
import { canNavigate } from "../utils";

import { CuriRouter } from "@curi/router";
import { LinkProps } from "../HookLink";

export default function useClickHandler(
  router: CuriRouter,
  props: LinkProps,
  setNavigating: (n: boolean) => void
) {
  let removed = false;
  function unmounted() {
    removed = true;
  }
  function click(event: React.MouseEvent<HTMLElement>) {
    if (props.onClick) {
      props.onClick(event);
    }

    if (canNavigate(event, props.forward)) {
      event.preventDefault();

      let cancelled, finished;
      // only trigger re-renders when children uses state
      if (typeof props.children === "function") {
        // how to detect when the containing component has unmounted?
        cancelled = finished = () => {
          if (!removed) {
            setNavigating(false);
          }
        };
        setNavigating(true);
      }
      router.navigate({
        name: props.name,
        params: props.params,
        query: props.query,
        state: props.state,
        hash: props.hash,
        cancelled,
        finished
      });
    }
  }
  return { click, unmounted };
}
