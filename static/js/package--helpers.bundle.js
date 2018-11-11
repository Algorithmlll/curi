(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{131:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return b});var r=n(0),o=n.n(r),l=n(101),a=n(102),u=n(8),i=n(99),c=n(5),s=n(16);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),m(this,h(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,o.a.PureComponent),function(e,t,n){t&&p(e.prototype,t),n&&p(e,n)}(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(a.a,null,o.a.createElement(c.b,null,o.a.createElement("p",null,"The ",o.a.createElement(u.b,null,"@curi/helpers")," package provides functions that may be useful in a Curi application."))),o.a.createElement(l.a,null,o.a.createElement(i.a,{title:"once()",id:"once"},o.a.createElement(c.b,null,o.a.createElement("p",null,o.a.createElement(u.b,null,"once()")," takes a function as its argument and returns a new function. The first time the returned function is called, it will call the function passed to it and return its result. Every call after that will re-use the result from the first call."),o.a.createElement("p",null,"The ",o.a.createElement(u.b,null,"once()")," function is useful for any async route"," ",o.a.createElement(u.b,null,"resolve")," functions that only need to be called once."),o.a.createElement(s.a,null,"This will not work for functions whose result depends on variables that will change for a route (i.e. loading data based on route params).")),o.a.createElement(c.a,null,'import { once } from "@curi/helpers";\n            \nconst routes = prepareRoutes([\n  {\n    name: "Menu",\n    path: "menu",\n    resolve: {\n      // this function will be called every time the user\n      // navigates to the "Menu" route\n      nonCached: () => api.getItems(),\n      // this function is only called the first time the\n      // user navigates to the "Menu" route\n      cached: once(() => api.getItems)\n    }\n  }\n]);')),o.a.createElement(i.a,{title:"preferDefault",id:"preferDefault"},o.a.createElement(c.b,null,o.a.createElement("p",null,"When using dynamic import syntax (",o.a.createElement(u.b,null,'import("someModule")'),"), the resolved module is a module object containing all of the exports from that module. If the module has a default export (",o.a.createElement(u.b,null,"export default ..."),"), that will be the module's ",o.a.createElement(u.b,null,"default")," property. The"," ",o.a.createElement(u.b,null,"preferDefault()")," function will resolve with the"," ",o.a.createElement(u.b,null,"default")," property of the module if it exists and with the module if it does not.")),o.a.createElement(c.a,null,'import { preferDefault } from "@curi/helpers";\n\nconst routes = prepareRoutes([\n  {\n    name: "Menu",\n    path: "menu",\n    resolve: {\n      body: import("./components/Menu")\n        .then(preferDefault)\n    },\n    response({ resolved }) {\n      return { body: resolved.body }\n    }\n  }\n]);'))))}}]),t}()}}]);