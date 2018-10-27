import React from "react";
import { Emitted } from "@curi/router";
declare const context: React.Context<Emitted>;
declare const Provider: React.ComponentType<React.ProviderProps<Emitted>>, Curious: React.ComponentType<React.ConsumerProps<Emitted>>;
export { Provider, Curious, context };
