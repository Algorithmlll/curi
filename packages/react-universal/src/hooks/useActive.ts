import useCuri from "./useCuri";

import { Params } from "@curi/router";

export default function useActive(
  name: string,
  params: Params,
  partial: boolean
) {
  const { router, response } = useCuri();
  if (process.env.NODE_ENV !== "production") {
    if (!router.route.active) {
      throw new Error(
        `You are attempting to use the "active" route interaction, but have not included it in your Curi router.

import curi from "@curi/router";
import active from "@curi/route-active";

const router = curi(history, routes, {
  route: [active()]
});`
      );
    }
  }
  return router.route.active(name, response, params, partial);
}
