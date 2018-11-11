(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{86:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var a=n(0),r=n.n(a),i=n(8),o=n(5),l=n(99),s=n(100),u={title:"Authentication"};function c(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,u.title),r.a.createElement(l.a,{title:"Explanation",id:"explanation"},r.a.createElement("p",null,"Sometimes you will want to redirect based on the results of your"," ",r.a.createElement(i.b,null,"resolve")," functions. For instance, you might see that a user is not authenticated and shouldn't be able to view a page."),r.a.createElement("p",null,"When this happens, the route's ",r.a.createElement(i.b,null,"response()")," function should modify the response by calling its redirect method."),r.a.createElement(o.a,{lang:"javascript"},"const routes = prepareRoutes([\n  // ...,\n  {\n    name: 'Protected',\n    path: 'super-secret',\n    response: () => {\n      if (!store.userIsAuthenticated) {\n        return {\n          name: \"Login\",\n          status: 302\n        };\n      }\n    }\n  },\n  {\n    name: 'Login',\n    path: 'login',\n    ...\n  }\n]);")),r.a.createElement(l.a,{title:"Live Demo",id:"demo"},r.a.createElement(s.a,{id:"github/pshrmn/curi/tree/master/examples/vue/authentication"})),r.a.createElement(l.a,{title:"On GitHub",id:"source"},"If you want to run this code locally, the source code is available on GitHub"," ",r.a.createElement("a",{href:"https://github.com/pshrmn/curi/tree/master/examples/vue/authentication"},"here"),"."))}}}]);