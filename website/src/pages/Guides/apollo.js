import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Apollo Integration"
};

export default function ApolloGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          <a href="https://apollographql.com">Apollo</a> is a great solution for
          managing an application's data using{" "}
          <a href="http://graphql.org">GraphQL</a>.
        </p>
        <p>
          There are a few different implementation strategies for integrating
          Apollo and Curi based on how tightly you want them to be paired.
        </p>
        <Note>
          <p>
            This guide only covers integration between Curi and Apollo. If you
            are not already familiar with how to use Apollo, you will want to
            learn that first.
          </p>
          <p>
            Also, this guide will only be referencing Apollo's React
            implementation, but the principles are the same no matter how you
            render your application.
          </p>
        </Note>
      </Explanation>

      <Section title="Setup" id="setup">
        <Explanation>
          <p>
            Apollo's React package provides an <Cmp>ApolloProvider</Cmp>{" "}
            component for accessing your Apollo client throughout the
            application. The <Cmp>Router</Cmp> (or whatever you name the root
            Curi component) should be a descendant of the{" "}
            <Cmp>ApolloProvider</Cmp> because we don't need to re-render the{" "}
            <Cmp>ApolloProvider</Cmp> for every new response.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { ApolloProvider } from "react-apollo";
import { curiProvider } from "@curi/react-dom";

const Router = curiProvider(router);

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      {() => {...}}
    </Router>
  </ApolloProvider>
), holder);`}
        </CodeBlock>
      </Section>

      <Section title="Loose Pairing" id="loose-pairing">
        <Explanation>
          <p>
            Apollo and Curi don't actually have to know about each other. Curi
            can create a response without doing any data fetching and let Apollo
            handle that with its <Cmp>Query</Cmp> component.
          </p>
        </Explanation>
        <CodeBlock>
          {`// routes.js
import Noun from "./pages/Noun";

// nothing Apollo related in here
const routes = prepareRoutes([
  {
    name: 'Noun',
    path: 'noun/:word',
    response: () => {
      return {
        body: Noun
      };
    }
  }
]);`}
        </CodeBlock>

        <Explanation>
          <p>
            Any location data that a query needs can be taken from the response
            object. The best way to access this from your components would be to
            pass the <IJS>response</IJS> to the components rendered in the{" "}
            <Cmp>Router</Cmp>'s <IJS>children</IJS> prop, which is a
            render-invoked function.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// index.js
ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      {({ response }) => {
        const { body:Body } = response;
        return <Body response={response} />;
      }}
    </Router>
  </ApolloProvider>
), holder);`}
        </CodeBlock>

        <Explanation>
          <p>
            Because we pass the <IJS>response</IJS> to the route's{" "}
            <IJS>body</IJS> component, we can pass a <Cmp>Query</Cmp> the
            response's location params using <IJS>props.response.params</IJS>.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// pages/Nouns.js
import { Query } from "react-apollo";

const GET_NOUN = gql\`
  query noun(\$word: String!) {
    noun(word: $word) {
      word,
      type,
      definition
    }
  }
\`;

// use the "word" param from the response props
// to query the correct data
const Noun = ({ response }) => (
  <Query
    query={GET_NOUN}
    variables={{ word: response.params.word }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading />;
      }
      // ...

      return (
        <div>
          <h1>{data.noun.word}</h1>
          <p>{data.noun.definition}</p>
        </div>
      )
    }}
  </Query>
);`}
        </CodeBlock>
      </Section>

      <Section title="Tight Pairing" id="tight-pairing">
        <Explanation>
          <p>
            You can use your Apollo client instance to call queries in a route's{" "}
            <IJS>resolve</IJS> functions. <IJS>resolve</IJS> functions are
            expected to return a Promise, which is exactly what{" "}
            <IJS>client.query()</IJS> returns. Tightly pairing Curi and Apollo
            is mostly center around using a <IJS>resolve</IJS> function to
            return a <IJS>client.query()</IJS> call. This will delay navigation
            until after a route's GraphQL data has been loaded by Apollo.
          </p>
          <p>
            The <IJS>external</IJS> option can be used when creating the router
            to make the Apollo client accessible from routes.
          </p>
        </Explanation>
        <CodeBlock>
          {`import client from "./apollo";
          
const router = curi(history, routes, {
  external: { client }
});`}
        </CodeBlock>
        <CodeBlock>
          {`import { EXAMPLE_QUERY } from "./queries";

const routes = prepareRoutes([
  {
    name: "Example",
    path: "example/:id",
    resolve: {
      data({ params }, external) {
        return external.client.query({
          query: EXAMPLE_QUERY,
          variables: { id: params.id }
        });
      }
    }
  }
]);`}
        </CodeBlock>

        <Explanation>
          <p>There are two strategies for doing this.</p>
          <p>
            The first approach is to avoid the <Cmp>Query</Cmp> altogether.
            Instead, you can use a route's <IJS>response()</IJS> property to
            attach the data fetched by Apollo directly to a response through its{" "}
            <IJS>data</IJS> property.
          </p>
          <p>
            While we know at this point that the query has executed, we should
            also check <IJS>error</IJS> in the <IJS>response()</IJS> function to
            ensure that the query was executed successfully.
          </p>
        </Explanation>
        <CodeBlock>
          {`// routes.js
import GET_VERB from "./queries";

import Verb from "./pages/Verb";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    resolve: {
      verb({ params }, external) {
        return external.client.query({
          query: GET_VERB,
          variables: { word: params.word }
        })
      }
    },
    response({ error, resolved }) {
      if (error) {
        // handle failed queries
      }
      return {
        body: Verb,
        data: resolved.verb.data
      }
    }
  }
];`}
        </CodeBlock>

        <Explanation>
          <p>
            When rendering, you can access the query data through the{" "}
            <IJS>response</IJS>'s <IJS>data</IJS> property.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// pages/Verb.js
const Verb = ({ response }) => (
  <div>
    <h1>{response.data.verb.word}</h1>
    <p>
      {response.data.verb.definition}
    </p>
  </div>
)`}
        </CodeBlock>

        <Explanation>
          <p>
            The second approach is to use a <IJS>resolve</IJS> function as a way
            to cache the data, but also use <Cmp>Query</Cmp>. With this
            approach, we do not have to attach the query data to the response;
            we are just relying on the fact that Apollo will execute and cache
            the results prior to navigation.
          </p>
        </Explanation>
        <CodeBlock>
          {`// routes.js
import { GET_VERB } from "./queries";

export default [
  {
    name: "Verb",
    path: "verb/:word",
    resolve: {
      data({ params, external }) {
        // load the data so it is cached by
        // your Apollo client
        return external.client.query({
          query: GET_VERB,
          variables: { word: params.word }
        })
      }
    }
  }
];`}
        </CodeBlock>

        <Explanation>
          <p>
            The route's component will render a <Cmp>Query</Cmp> to also call
            the query. Because the query has already been executed, Apollo will
            grab the data from its cache instead of re-sending a request to your
            server.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`// pages/Verb.js
import { GET_VERB } from "../queries";

const Verb = ({ response }) => (
  <Query
    query={GET_VERB}
    variables={{ word: response.params.word }}
  >
    {({ loading, error, data }) => {
      // ...
      return (
        <div>
          <h1>{data.verb.word}</h1>
          <p>
            {data.verb.definition}
          </p>
        </div>
      );
    }}
  </Query>
)`}
        </CodeBlock>
        <Section title="Prefetching" id="prefetch" tag="h3">
          <Explanation>
            <p>
              One additional benefit of adding queries to routes using{" "}
              <IJS>resolve</IJS> functions is that you can prefetch data for a
              route.
            </p>
            <p>
              The{" "}
              <Link name="Package" params={{ package: "route-prefetch" }}>
                <IJS>@curi/route-prefetch</IJS>
              </Link>{" "}
              interaction lets you programmatically fetch the data for a route
              prior to navigating to a location.
            </p>
          </Explanation>
          <CodeBlock>
            {`// index.js
import prefetch from "@curi/route-prefetch";

const routes = prepareRoutes([
  {
    name: "Example",
    path: "example/:id",
    resolve: {
      examples({ params }, external) {
        return external.client.query({
          query: GET_EXAMPLES,
          variables: { id: params.id }
        })
      }
    }
  }
]);

const router = curi(history, routes, {
  route: [prefetch()]
});

// this will call the GET_EXAMPLES query
// and Apollo will cache the results
router.route.prefetch(
  "Example",
  { params: { id: 2 }}
);`}
          </CodeBlock>
        </Section>
      </Section>
    </React.Fragment>
  );
}
