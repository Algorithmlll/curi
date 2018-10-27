import { Params } from "@curi/router";
export interface LocationProps {
    name?: string;
    params?: Params;
    hash?: string;
    query?: any;
    state?: any;
}
export default function useLocation(props: LocationProps): {
    pathname: any;
    hash: string;
    query: any;
    state: any;
};
