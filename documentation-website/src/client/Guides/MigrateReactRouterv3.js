import React from 'react';
import BaseGuide from '../components/BaseGuide';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from '@curi/react';
import { Section, Subsection } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      The Curi router is somewhat similar to React Router versions 2 and 3, so migration is fairly easy.
    </p>
    <ol>
      <li>
        Both use a centralized route configuration.
      </li>
      <li>
        Both configurations are made up of a route objects (sometimes disguised as JSX with <Cmp>Route</Cmp> objects
        in React Router)
      </li>
      <li>
        Both allow you to nest routes.
      </li>
    </ol>
    <p>
      Migration from React Router v2/3 to Curi should not require a complete reworking of your application,
      but there are some key differences.
    </p>
    <ol>
      <li>
        The routing is handled entirely outside of React. With Curi, there are no <Cmp>Route</Cmp> components.
      </li>
      <li>
        When a nested route matches, only that route renders. Any ancestor routes that also (partially)
        match are not rendered with Curi.
      </li>
    </ol>

    <Section
      title='Routes'
      id='routes'
    >
      <p>
        Let’s get started with setting up our routes.
      </p>

      <Subsection
        title='With React Router'
        id='routes-with-react-router'
      >
        <p>
          In React Router v2/3, there are two ways to define routes. You can either use JavaScript objects or
          JSX <Cmp>Route</Cmp>s (which React Router converts to JavaScript objects).
        </p>
        <PrismBlock lang='jsx'>
          {
`// JavaScript objects
{
  path: '/',
  component: App,
  indexRoute: Home,
  childRoutes: [
    {
      path: 'inbox',
      component: Inbox,
      childRoutes: [
        {
          path: ':message',
          component: Message,
          onEnter: (next) => {...},
          onChange: (prev, next) => {...},
          onLeave: (prev) => {...}
        }
      ]
    }
  ]
// JSX
<Route path='/' component={App}>
  <IndexRoute component={Home} />
  <Route path='inbox' component={Inbox}>
    <Route
      path=':message'
      component={Message}
      onEnter={next => {...}}
      onChange={(prev, next) => {...}}
      onLeave={prev => {...}}
    />
  </Route>
</Route>`
          }
        </PrismBlock>
        <p>
          Both styles described above define the same route structure for three routes: <IJS>/</IJS>, <IJS>/inbox</IJS>,
          and <IJS>/inbox/:message</IJS>. Each one of these has a component that will be rendered when it matches.
          The <IJS>/inbox/:message</IJS> route has some methods defined to describe its behavior when the route enters,
          updates, and leaves.
        </p>
      </Subsection>
      <Subsection
        title='With Curi'
        id='routes-with-curi'
      >
        <p>
          Routes in Curi are always JavaScript objects. Like React Router, each route object has a path property that
          describes the path segments that the route matches. React Router v2/3 uses a custom path matcher, but Curi
          uses <a href="https://github.com/pillarjs/path-to-regexp"><IJS>path-to-regexp</IJS></a>. You can read learn
          how to format paths from the <IJS>path-to-regexp</IJS> repo. 
        </p>

        <p>
          First, we will just define our routes the paths.
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  {
    path: ''
  },
  {
    path: 'inbox',
    children: [
      {
        path: ':message'
      }
    ]
  }
];`
          }
        </PrismBlock>

        <p>
          The only real difference between the Curi paths and the React Router paths is that the root path for Curi
          is <IJS>''</IJS> while the root path for React Router is <IJS>'/'</IJS>. With Curi, you never include the leading
          forward slash.
        </p>
        <p>
          Next, we should add our components to each route. We will ignore the <Cmp>App</Cmp> component that is used in the
          React Router routes. That is not route specific and will be rendered by our application (assuming we actually need it).
        </p>
        <p>
          With Curi routes, we have a <IJS>body</IJS> property. This is a function that will be called whenever the route matches.
          Its return value will be added to the response object that Curi creates (more on that later). For this React application,
          we want our <IJS>body</IJS> functions to return the React component associated with each route.
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  {
    path: '',
    body: () => Home
  },
  {
    path: 'inbox',
    body: () => Inbox,
    children: [
      {
        path: ':message',
        body: () => Message
      }
    ]
  }
];`
          }
        </PrismBlock>
        <p>
          We are close to replicating our React Router routes, we just have to implement the <IJS>on___</IJS> methods for
          our <IJS>:message</IJS> route. With Curi, routes have two possible loading function properties: <IJS>preload</IJS>
          {' '}and <IJS>load</IJS>. <IJS>preload</IJS> is useful for tasks that only need to be run once per route, like
          code splitting. <IJS>load</IJS>, on the other hand, will be called every time that a route matches.
        </p>
        <p>
          With React Router, <IJS>onEnter</IJS> is called when the route first matches, while <IJS>onChange</IJS> is called when
          the same route matches a new location (e.g. with new path parameters). <IJS>onEnter</IJS> and <IJS>onChange</IJS> are
          nearly the same; the big difference between the two is that <IJS>onChange</IJS> will receive the previous props, which
          could be used to determine which props changed. When converting these to Curi, we will use <IJS>load</IJS> for both. This
          misses out on the ability to compare props in <IJS>onChange</IJS>, but (assuming you’re using the comparison to determine
          whether to load new data) a cache should serve the same purpose.
        </p>
        <p>
          There currently is no equivalent to <IJS>onLeave</IJS> with Curi. This is mostly because I haven’t seen a compelling need
          for it. It certainly could be implemented, but so far I have not found a reason to use that. If you have something you need
          this functionality for, please open up an issue in the GitHub repo.
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  {
    path: '',
    body: () => Home
  },
  {
    path: 'inbox',
    body: () => Inbox,
    children: [
      {
        path: ':message',
        body: () => Message,
        load: (params, location, mods) => {...}
      }
    ]
  }
];`
          }
        </PrismBlock>
        <p>
          <IJS>params</IJS> is an object of parsed path parameters, <IJS>location</IJS> is the current location object, and <IJS>mods</IJS>
          {' '}is an object with functions to modify the response. For example, <IJS>mods.setData</IJS> allows you to attach loaded data to
          the response object.
        </p>
        <p>
          We now have the equivalent routes implemented in Curi, but we have one last step. With Curi, each route has to have a unique name.
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Inbox',
    path: 'inbox',
    body: () => Inbox,
    children: [
      {
        name: 'Message',
        path: ':message',
        body: () => Message,
        load: (params, location, mods) => {...}
      }
    ]
  }
];`
          }
        </PrismBlock>
        <p>
          Curi uses route names to allow you to interact with routes. For example, you can navigate to the “Inbox” route just by knowing its
          name instead of its URI. With Curi, you never have to generate a URI yourself!
        </p>
      </Subsection>
      <p>
        Once your routes have been defined, you can move on to creating your Curi configuration object.
      </p>
    </Section>

    <Section
      title='Creating the Configuration'
      id='creating-the-configuration'
    >
      <p>
        With React Router, you create your configuration by rendering a <Cmp>Router</Cmp>. That either takes the <Cmp>Route</Cmp> components
        as props or the route objects through its <IJS>routes</IJS> prop. The <Cmp>Router</Cmp> also takes a <IJS>history</IJS> prop, which
        is either one of the pre-configured objects (<IJS>browserHistory</IJS> or <IJS>hashHistory</IJS>) or one that you create yourself.
      </p>
      <PrismBlock lang='jsx'>
        {
`import { Router, browserHistory } from 'react-router';
const routes = [...];
ReactDOM.render((
  <Router history={browserHistory} routes={routes} />
), holder);`
        }
      </PrismBlock>
      <p>
        With Curi, the configuration object is created prior to rendering. It takes a Hickory history object, your routes array, and possibly an options object. 
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from '@curi/core';
import Browser from '@hickory/browser';
const history = Browser();
const routes = [...];
const config = creatConfig(history, routes);`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Rendering'
      id='rendering'
    >
      <p>
        At this point, our Curi configuration object isn’t actually quite ready to render. Curi creates response objects asynchronously,
        so if we render right away, we might not have a response object to render with. We can work around this by rendering nothing at
        first, but instead we should just wait for our initial response to be ready.
      </p>
      <PrismBlock lang='javascript'>
        {
`config.ready().then(() => {
  // now we can render
});`
        }
      </PrismBlock>
      <p>
        We will walk through the rendering differences between React Router and Curi by looking at what happens in each when we navigate to
        the URI <IJS>/inbox/test-message-please-ignore</IJS>.
      </p>
      <Subsection
        title='React Router v2/3'
        id='rendering-react-router'
      >
        <p>
          React Router uses the <Cmp>Router</Cmp> component to subscribe to location changes. Each time that the location changes, it walks
          over its routes and determines which route(s!) match. React Router starts by rendering the root component. In the above configuration,
          that is the <Cmp>App</Cmp>. Next, our <IJS>inbox</IJS> route also matches, so React Router also renders our <Cmp>Inbox</Cmp> component.
          Finally, the URI <IJS>/inbox/test-message-please-ignore</IJS> also matches our <IJS>:message</IJS> route (which is concatenated with its
          parents to form the path <IJS>/inbox/:message</IJS>), so <Cmp>Message</Cmp> is rendered as well. Each child component is rendered by its
          parent, so we end up with a component tree that looks something like this:
        </p>
        <PrismBlock lang='jsx'>
          {
`<App>
  <Inbox>
    <Message>
  </Inbox>
</App>`
          }
        </PrismBlock>
        <p>
          With this structure, any routes with children will be rendered when one of the children matches. That means that those routes need to
          know how to render based on what type of match they have. For example, <Cmp>Inbox</Cmp> needs to know how to render for an exact match
          (the URI is <IJS>/inbox</IJS>) and for a partial match (<IJS>/inbox/test-message-please-ignore</IJS>). Also, if the <Cmp>Inbox</Cmp> needs
          to pass any props to <Cmp>Message</Cmp>, it has to use <IJS>React.cloneElement</IJS>, which works but is not the cleanest looking code.
        </p>
      </Subsection>
      <Subsection
        title='Curi'
        id='rendering-with-curi'
      >
        <p>
          With Curi, we need to have a way to re-render our application every time that the location changes. The easiest approach is to use
          the <Cmp>Navigator</Cmp> component, which comes from the <IJS>@curi/react</IJS> package. This expects two props: <IJS>config</IJS>,
          which is our Curi configuration object, and <IJS>render</IJS>, which is a render function it will call to render the application.
          The <Cmp>Navigator</Cmp> will subscribe to your configuration object and automatically re-render when the location changes (and a
          new response object is created).
        </p>
        <PrismBlock lang='jsx'>
          {
`config.ready().then(() => {
  ReactDOM.render((
    <Navigator
      config={config}
      render={response => { return ...; }}
    />
  ), holder);
});`
          }
        </PrismBlock>
        <p>
          So what should your render function look like? The render function will receive two arguments: <IJS>response</IJS>, the new response
          object, and <IJS>config</IJS>, our Curi configuration object. We will ignore config here because the response is what we really want,
          the config is just there for convenience.
        </p>
        <p>
          If you remember from above, we added <IJS>body</IJS> properties to each of the routes and said that when a route matches, that
          function would be called and its return value would be attached to the response. That means, that inside of our render function,
          we can access the matched route’s component as <IJS>response.body</IJS>.
        </p>
        <PrismBlock lang='jsx'>
          {
`function render(response) {
  const { body:Body } = response;
  return <Body />;
}`
          }
        </PrismBlock>
        <p>
          That isn’t perfect because it doesn’t consider what happens when there is no body (which happens if none of the routes match the
          location). Wildcard routes (<IJS>(.*)</IJS>) can be useful here or you can just return something else when there is no{' '}
          <IJS>response.body</IJS> property.
        </p>
        <p>
          Let’s get back to our response object. In the React Router section, we had three components that were rendered: <Cmp>App</Cmp>,
          <Cmp>Inbox</Cmp>, and <Cmp>Message</Cmp>. With Curi, only the best matched route matches. That means that for the URI{' '}
          <IJS>/inbox/test-message-please-ignore</IJS>,our <IJS>response.body</IJS> will be the <Cmp>Message</Cmp> component. We don’t
          render <Cmp>Inbox</Cmp> because we did not match the <IJS>inbox</IJS> route.
        </p>
        <p>
          We also said above that there was no need for the <Cmp>App</Cmp> component with Curi. If you want to have an <Cmp>App</Cmp>
          {' '}component, you can render it either inside of the render function or as a parent of your <Cmp>Navigator</Cmp>. This can
          be useful for rendering content that is unrelated to specific routes, like a page header or menu.
        </p>
        <p>
          Rendering the <Cmp>App</Cmp> inside of the render function is necessary if any of the components rendered by the <Cmp>App</Cmp>
          {' '}are location aware components, since they need to access the Curi configuration object (through React’s context, which
          the <Cmp>Navigator</Cmp> provides)
        </p>
        <PrismBlock lang='jsx'>
          {
`function render(response) {
  const { body:Body } = response;
  return (
    <App>
      <Body />
    </App>
  );
}
// or
function render(response) {
  const { body:Body } = response;
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}`
          }
        </PrismBlock>
        <p>
          What about props that you want to send to your route components? Just pass them to the <Cmp>Body</Cmp> component that you render.
        </p>
        <PrismBlock lang='jsx'>
          {
`function render(response) {
  const { body:Body, data, params } = response;
  return <Body data={data} params={params} />;
}`
          }
        </PrismBlock>
        <p>
          The one catch here is that you will be passing the same props to all of your route components. You could add fine-grained control
          by using <IJS>response.name</IJS> and a <IJS>switch</IJS> or <IJS>if</IJS>/<IJS>else</IJS> chain, but this is probably overkill.
          If you’re worried about polluting the route component’s props, just pass the whole response object.
        </p>
      </Subsection>
    </Section>

    <Section
      title='Links'
      id='links'
    >
      <p>
        You obviously will want to be able to navigate between routes in your application. React Router provides a <Cmp>Link</Cmp> component
        to do this, and so does Curi (through the <IJS>@curi/react</IJS> package). There are a few differences to note between these two
        components:
      </p>
      <ul>
        <li>
          <p>
            React Router expects you to generate the pathname yourself, while Curi expects you to pass the name of the route that you want to
            navigate to. Any path parameters are passed to Curi’s <Cmp>Link</Cmp> using the <IJS>params</IJS> prop.
          </p>
          <PrismBlock lang='jsx'>
            {
`// React Router
<Link to='/'>Home</Link>
<Link to={\`/inbox/\${message}\`}>Hello</Link>
// Curi
<Link to='Home'>Home</Link>
<Link to='Message' params={{ message }}>Hello</Link>`
            }
          </PrismBlock>
        </li>
        <li>
          <p>
            With React Router, any additional location properties are passed to the <Cmp>Link</Cmp> using the <IJS>to</IJS> object. With Curi,
            these properties are passed using the <IJS>details</IJS> prop.
          </p>
          <PrismBlock lang='jsx'>
            {
`// React Router
<Link to={{ pathname: '/inbox', hash: '#test' }}>Inbox</Link>
// Curi
<Link to='Inbox' details={{ hash: 'test' }}>Inbox</Link>`
            }
          </PrismBlock>
        </li>
        <li>
          <p>
            Active detection with Curi is a little more involved than with React Router, but also more powerful. With Curi, you provide a{' '}
            <IJS>merge</IJS> function that receives the props that will used to render the <Cmp>a</Cmp> and allows you to modify/add props.
            You can also pass <IJS>partial: true</IJS> to allow for partial matches to be considered active (the opposite of React Router's{' '}
            <IJS>onlyActiveOnIndex</IJS>).
          </p>
          <PrismBlock lang='jsx'>
            {
`// React Router
<Link
  to='/'
  onlyActiveOnIndex
  activeClassName='active'
>Home</Link>
// Curi
// You need to add @curi/addon-active to your config object
import createActiveAddon from '@curi/addon-active';
const config = createConfig(history, routes, {
  createActiveAddon
});
function merge(props) {
  props.className = 'active';
  return props;
}
<Link
  to='Home'
  active={{ merge }}
>Home</Link>`
            }
          </PrismBlock>
        </li>
      </ul>
    </Section>

    <Section
      title='Accessing router props from nested components'
      id='router-props'
    >
      <p>
        React Router provides a <IJS>withRouter</IJS> higher-order component that will inject router props into the wrapped component.
        Curi provides similar functionality with the <IJS>curious</IJS> higher-order component provided by the <IJS>@curi/react</IJS> package. 
      </p>
      <PrismBlock lang='javascript'>
        {
`export default withRouter(SomeComponent);
export default curious(SomeComponent);`
        }
      </PrismBlock>
      <p>
        <IJS>curious</IJS> will inject the Curi configuration object and the current response object into the wrapped component.
      </p>
    </Section>
  </BaseGuide>
);
