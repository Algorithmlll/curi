(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{70:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return u});var a=n(0),r=n.n(a),o=n(8),l=(n(16),n(99)),i=n(5),s={title:"Development Tips"};function u(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,s.title),r.a.createElement(l.a,{title:"Hot Module Replacement",id:"hmr"},r.a.createElement(i.b,null,r.a.createElement("p",null,"Hot module replacement (HMR) can make development more convenient by automatically updating page content without refreshing the page. With Webpack, there are only a few steps required to get this working with Curi."),r.a.createElement("p",null,"The first step is to get your Webpack configuration setup for hot module replacement. Webpack's"," ",r.a.createElement("a",{href:"https://webpack.js.org/guides/hot-module-replacement/"},"hot module replacement guide")," ","is a good resource to learn how to do this.")),r.a.createElement(i.b,null,r.a.createElement("p",null,"The next step is identifying what file(s) you want to watch. A watched file will be notified when it, any of its dependencies, or any dependencies depndencies (and so on down the line) are updated. The best way to do this with a Curi application is to watch the file where your routes are defined."),r.a.createElement("p",null,"The ",r.a.createElement(o.b,null,"router")," has a ",r.a.createElement(o.b,null,"refresh()")," method that is used for providing new routes to the router. When it is called, it will also generate and emit a new response."),r.a.createElement("p",null,r.a.createElement(o.b,null,"module.hot.accept()")," is used for watching a file and calling a callback when that files or any files in its dependency chain are updated. In the callback, we can re-import the routes and pass them to the router's ",r.a.createElement(o.b,null,"refresh()")," method. This will in turn emit a new response, which will automatically be rendered."),r.a.createElement("p",null,"With that, your application should be setup to support hot module replacement.")),r.a.createElement(i.a,{"data-line":"9-14"},'// index.js\nimport { curi } from "@curi/core";\nimport Browser from "@hickory/browser";\nimport routes from "./routes";\n\nconst history = Browser();\nconst router = curi(history, routes);\n\nif (module.hot) {\n  module.hot.accept("./routes.js", function() {\n    const nextRoutes = require("./routes").default;\n    router.refresh(nextRoutes);\n  });\n}')))}}}]);