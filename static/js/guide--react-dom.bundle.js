(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{60:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return m});var a=t(0),r=t.n(a),o=t(1),l=t(8),s=t(16),i=t(99),c=t(5),u={title:"React DOM"};function m(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,u.title),r.a.createElement(i.a,{title:"Rendering Responses",id:"rendering"},r.a.createElement(c.b,null,r.a.createElement("p",null,"The ",r.a.createElement(l.b,null,"curiProvider()")," function is used to create the component at the root of a Curi + React application. You can call this component anything that you want, but here it will be referred to as the ",r.a.createElement(l.a,null,"Router"),"."),r.a.createElement(s.a,null,r.a.createElement("p",null,"Why does ",r.a.createElement(l.b,null,"@curi/react-dom")," export a function to create a component and not just a component? Props signify values that can change, but an application should only ever have one router. By hard-coding the ",r.a.createElement(l.b,null,"router")," into a component, we avoid having to handle the possibility of switching routers (which should not happen).")),r.a.createElement("p",null,r.a.createElement(l.b,null,"curiProvider()")," is passed the application's Curi router. The returned component will automatically add an"," ",r.a.createElement(o.b,{name:"Guide",params:{slug:"navigating"},hash:"observer"},"observer")," ","to the Curi router when it mounts, so that it can re-render when there are new responses."),r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Router")," takes a render-invoked function as its"," ",r.a.createElement(l.b,null,"children")," prop. This function will be called with an object that has three properties— ",r.a.createElement(l.b,null,"response"),","," ",r.a.createElement(l.b,null,"router"),", and ",r.a.createElement(l.b,null,"navigation"),"—and returns the React element(s) that form the root of the application.")),r.a.createElement(c.a,{lang:"jsx"},'import { curiProvider } from \'@curi/react-dom\';\n\nimport router from "./router";\nconst Router = curiProvider(router);\n\n// router.once() is used to delay rendering in case\n// the initially matched route is asynchronous\nrouter.once(() => {\n  ReactDOM.render((\n    <Router>\n      {({ response, router, navigation }) => {\n        return <response.body />;\n      }}\n    </Router>\n  ), document.getElementById("root"));\n});'),r.a.createElement(i.a,{title:"What to return from children()",id:"children-return",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"The render-invoked ",r.a.createElement(l.b,null,"children()")," is responsible for rendering the root elements for an application."),r.a.createElement("p",null,"If you set React components as the ",r.a.createElement(l.b,null,"body")," properties on your responses, you can create a React element for the"," ",r.a.createElement(l.b,null,"body")," component in this function."),r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Body")," element (it is useful to rename the"," ",r.a.createElement(l.b,null,"response"),"'s ",r.a.createElement(l.b,null,"body")," to ",r.a.createElement(l.b,null,"Body"),' for JSX transformation) is a placeholder for the "real" component that you render for a route. This means that the "real" component will be different for every route. When it comes to passing props to the'," ",r.a.createElement(l.a,null,"Body"),", you ",r.a.createElement("em",null,"could")," use ",r.a.createElement(l.b,null,"response.name")," ","to determine what props to pass based on which route matched, but passing the same props to every route's ",r.a.createElement(l.a,null,"Body")," is usually sufficient. Passing the entire ",r.a.createElement(l.b,null,"response")," is generally useful so that the route components can access any"," ",r.a.createElement(l.b,null,"params"),", ",r.a.createElement(l.b,null,"data"),", and other properties of the"," ",r.a.createElement(l.b,null,"response"),".")),r.a.createElement(c.a,{lang:"jsx"},'ReactDOM.render((\n  <Router>\n    {({ response, router, navigation }) => {\n      // rename body to Body for JSX transformation\n      const { body:Body } = response;\n      return (\n        <React.Fragment>\n          <header>\n            <NavLinks />\n          </header>\n          <main>\n            <Body response={response} />\n          </main>\n        </React.Fragment>\n      );\n    }}\n  </Router>\n), document.getElementById("root"));'),r.a.createElement(c.b,null,r.a.createElement("p",null,"If your routes use an object to attach multiple components to a response, the ",r.a.createElement(l.b,null,"children()")," function also provides a good place to split these apart."),r.a.createElement("p",null,"If you do take this approach, please remember that you want every route to set the same ",r.a.createElement(l.b,null,"body")," shape. Otherwise, you'll have to determine the shape and change how you render in the"," ",r.a.createElement(l.b,null,"children()")," function, which can quickly become messy.")),r.a.createElement(c.a,{lang:"jsx","data-line":"20,24,27"},'const routes = prepareRoutes([\n  {\n    name: "Home",\n    path: "",\n    response() {\n      return {\n        body: {\n          Main: HomeMain,\n          Menu: HomeMenu\n        }\n      }\n    }\n  },\n  // ...\n]);\n\nReactDOM.render((\n  <Router>\n    {({ response, router, navigation }) => {\n      const { Main, Menu } = response.body;\n      return (\n        <React.Fragment>\n          <header>\n            <Menu />\n          </header>\n          <main>\n            <Main response={response} />\n          </main>\n        </React.Fragment>\n      );\n    }}\n  </Router>\n), document.getElementById("root"));'),r.a.createElement(c.b,null,r.a.createElement(s.a,null,r.a.createElement("p",null,"There is a ",r.a.createElement(l.a,null,"Curious")," component that you can render to access the ",r.a.createElement(l.b,null,"response"),", ",r.a.createElement(l.b,null,"router"),", and"," ",r.a.createElement(l.b,null,"navigation")," objects anywhere* in your application. This can help prevent having to pass props through multiple layers of components."),r.a.createElement("p",null,"* anywhere that is a child of your ",r.a.createElement(l.a,null,"Router"),"."))),r.a.createElement(c.a,{lang:"jsx"},'import { Curious } from "@curi/react-dom";\n            \nconst BaseRouteName = ({ response }) => (\n  <div>{response.name}</div>\n);\n\nexport default function RouteName() {\n  return (\n    <Curious>\n      {({ response }) => <BaseRouteName response={response} />}\n    </Curious>\n  );\n}')),r.a.createElement(i.a,{title:"Accessibility",id:"accessibility",tag:"h3"},r.a.createElement(c.b,null,r.a.createElement("p",null,"Managing the application's focus when navigating is useful for users who use screen readers. The ",r.a.createElement(l.a,null,"Focus")," component provides a convenient way to focus a page's main content when it renders a new response."),r.a.createElement("p",null,"You can read some more about accessibility in the"," ",r.a.createElement(o.b,{name:"Guide",params:{slug:"accessibility"}},"accessibility")," ","guide.")),r.a.createElement(c.a,{lang:"jsx","data-line":"12-18"},'import { Focus } from "@curi/react-dom";\n            \nReactDOM.render((\n  <Router>\n    {({ response }) => {\n      const { body:Body } = response;\n      return (\n        <React.Fragment>\n          <header>\n            <NavLinks />\n          </header>\n          <Focus>\n            {ref => (\n              <main ref={ref} tabIndex={-1}>\n                <Body response={response} />\n              </main>\n            )}\n          </Focus>\n        </React.Fragment>\n      );\n    }}\n  </Router>\n), document.getElementById("root"));'))),r.a.createElement(i.a,{title:"Navigating",id:"navigating"},r.a.createElement(c.b,null,r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Link")," component is used to navigate between routes within an application. When it renders in the DOM, it will render as an anchor (",r.a.createElement(l.a,null,"a"),") element."),r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Link"),"'s ",r.a.createElement(l.b,null,"to")," prop describes which route clicking the link should navigate to. If you pass an invalid route name, Curi will warn you."),r.a.createElement("p",null,"If a route has any params (or if any of a route's ancestors have params for nested routes), the ",r.a.createElement(l.b,null,"params")," prop is used to pass these to the ",r.a.createElement(l.a,null,"Link"),".")),r.a.createElement(c.a,{lang:"jsx"},'import { Link } from "@curi/react-dom";\n          \nconst NavLinks = () => (\n  <nav>\n    <ul>\n      <li>\n        <Link name="Home">Home</Link>\n      </li>\n      <li>\n        <Link name="About">About</Link>\n      </li>\n      <li>\n        <Link name="User" params={{ id: "red" }}>Red</Link>\n      </li>\n    </ul>\n  </nav>\n);'),r.a.createElement(c.b,null,r.a.createElement("p",null,"The ",r.a.createElement(l.a,null,"Link")," also takes ",r.a.createElement(l.b,null,"hash"),", ",r.a.createElement(l.b,null,"query"),", and ",r.a.createElement(l.b,null,"state")," props to attach their values to the location that will be navigated to.")),r.a.createElement(c.a,{lang:"jsx"},'<Link name="Home" hash="details">Home</Link>\n// renders\n<a href="/#details">Home</a>')),r.a.createElement(c.b,null,r.a.createElement("p",null,"Please check out the full"," ",r.a.createElement(o.b,{name:"Package",params:{package:"react-dom"},hash:"API"},r.a.createElement(l.b,null,"@curi/react-dom"))," ","API documentation to see every component that the package provides.")))}}}]);