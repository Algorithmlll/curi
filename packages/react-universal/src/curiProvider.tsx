import React from "react";
import { Provider } from "./Context";

import { CuriRouter, Emitted } from "@curi/router";

export type CuriRenderFn = (props: Emitted) => React.ReactNode;

export interface RouterProps {
  children: CuriRenderFn;
}

export default function curiProvider(router: CuriRouter) {
  return function Router(props: RouterProps) {
    const { response, navigation } = router.current();
    const [state, setState] = React.useState<Emitted>({
      router,
      response,
      navigation
    });

    React.useLayoutEffect(() => {
      let removed = false;
      const stopResponding = router.observe(
        (emitted: Emitted) => {
          if (!removed) {
            setState(emitted);
          }
        },
        { initial: false }
      );
      return () => {
        removed = true;
        stopResponding();
      };
    }, []);

    return <Provider value={state}>{props.children(state)}</Provider>;
  };
}
