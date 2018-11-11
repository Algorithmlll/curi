(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{58:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return c});var a=t(0),r=t.n(a),i=t(1),l=t(8),s=t(99),o=(t(16),t(5)),u={title:"Sync or Async"};function c(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,u.title),r.a.createElement(o.b,null,r.a.createElement("p",null,"Curi can have synchronous and asynchronous routes."),r.a.createElement("p",null,"When a navigation event is triggered (e.g. clicking a link or button), the router will match a route. If the route is synchronous, the response will be emitted immediately. If the route is asynchronous, the response will not be emitted until the route's async functions have finished. This is useful for code splitting and preloading data for a route."),r.a.createElement("p",null,"By default, routes are synchronous. If a route has any functions in its ",r.a.createElement(l.b,null,"resolve")," object, it becomes async.")),r.a.createElement(o.a,null,'// sync\n{ name: "Home", path: "" },\n\n// async\n{\n  name: "User",\n  path: "user/:id,\n  // any functions in here makes the route async\n  resolve: {\n    body: () => import("./components/User"),\n  }\n}'),r.a.createElement(s.a,{title:"Async Things to Think About",id:"think"},r.a.createElement(o.b,null,r.a.createElement("p",null,"For the most part, it shouldn't matter to you (or your users) whether Curi is sync or async, but there are a couple of things that you should be aware of when it comes to async matching.")),r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement(o.b,null,r.a.createElement("p",null,"If the initial route that matches is async and you try to render immediately, the ",r.a.createElement(l.b,null,"response")," will be ",r.a.createElement(l.b,null,"null"),". You can wait to render until the initial response is ready with"," ",r.a.createElement(l.b,null,"router.oncd()"),". The function you pass to that will be called one time, once the initial response is ready.")),r.a.createElement(o.a,null,"const router = curi(history, routes);\nrouter.once(() => {\n  // the initial response is ready,\n  // so it is safe to render\n  ReactDOM.render(...);\n});")),r.a.createElement("li",null,r.a.createElement(o.b,null,r.a.createElement("p",null,"With async routes, there is a delay between when the user clicks a link and when the new response is emitted. During this time, the navigation can be interrupted with a new navigation. Curi handles this internally, but you might want to update your UI after a link/button is clicked to indicate that the next page is loading."),r.a.createElement("p",null,"You can see an example of this in the"," ",r.a.createElement(i.b,{name:"Example",params:{category:"react",slug:"data-loading"}},"Data Loading Example"),".")),r.a.createElement(o.a,{lang:"jsx"},'<Link\n  name="User"\n  params={{ id: 1 }}\n  onClick={() => {\n    // display a loading bar when\n    // the user clicks a link.\n    nprogress.start();\n  }}\n>User 1</Link>\n\n// use a side effect to finish\n// loading bar when the new response\n// is ready\nconst finishLoading = () => {\n  nprogress.done();\n};\n\nconst router = curi(history, routes, {\n  sideEffects: [finishLoading]\n});')))))}}}]);