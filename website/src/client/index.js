import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";
import titleSideEffect from "@curi/side-effect-title";
import scrollSideEffect from "@curi/side-effect-scroll";
import ariaLiveSideEffect from "@curi/side-effect-aria-live";
import active from "@curi/route-active";
import prefetch from "@curi/route-prefetch";
import routes from "./routes";
import renderFunction from "./render";

const setTitle = titleSideEffect(
  ({ response }) => `${response.title} | Curi Documentation`
);
const scrollTo = scrollSideEffect();
const announce = ariaLiveSideEffect(
  ({ response }) => `Navigated to ${response.title}`
);

const history = Browser();

const router = curi(history, routes, {
  route: [active(), prefetch()],
  sideEffects: [setTitle, scrollTo, announce]
});
const Router = curiProvider(router);

router.respond(() => {
  ReactDOM.hydrate(
    <Router>{renderFunction}</Router>,
    document.getElementById("root")
  );
});

(function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
})();
