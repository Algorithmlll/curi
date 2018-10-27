import useCuri from "./hooks/useCuri";
import useActive from "./hooks/useActive";

import { ReactNode } from "react";
import { Response } from "@curi/router";

export interface ActiveProps {
  children(active: boolean, response?: Response): ReactNode;
  name: string;
  params?: object;
  partial?: boolean;
}

export default function Active(props: ActiveProps): ReactNode {
  const { response } = useCuri();
  const active = useActive(props.name, props.params, props.partial);
  return props.children(active, response);
}
