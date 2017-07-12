import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi-vue';
const globalName = 'CuriVue';
const version = require('./versions').default[name];
const type = 'vue';

const CuriVue = () => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>
      <h3>CuriPlugin</h3>
      <p>
        curi-vue exports a Vue plugin that you can use to add Curi support to a Vue application.
        The plugin is passed to Vue using the use method. Along with the plugin, you will need to
        pass your Curi configuration object to <InlineJS>Vue.use</InlineJS>.
      </p>
      <PrismBlock lang='javascript'>
        {
`import CuriPlugin from 'curi-vue';

const config = createConfig(history, routes);
Vue.use(CuriPlugin, { config });`
        }
      </PrismBlock>
      <p>
        This will do two things. First, it will register a <InlineJS>curi-link</InlineJS> component
        with Vue. You can use that component to navigate within your application. Second, it makes
        your configuration a global Vue property, which you can then access as <InlineJS>Vue.Curi</InlineJS>.
      </p>
    </APIBlock>

    <div id='usage'>
      <h2>Usage</h2>

      <p>
        The following is one way to setup rendering for a Curi + Vue application.
      </p>

      <PrismBlock lang='javascript'>
        {
`// 1. wait for the initial response to be resolved
config.ready().then(resp => {
  // 2. create the Vue app
  const vm = new Vue({
    el: '#app',
    // 3. initialize the data with the first response object
    data: {
      response: resp
    },
    // 4. Add a rendering function to the methods. This will be in charge
    //    of rendering your application using the response.
    methods: {
      render: function(h, resp) {
        const { body } = resp;
        return h(body, { params: resp.params });
      }
    },
    // 5. Add a render function to your Vue. This will call the rendering
    //    function that you defined above.
    render: function(h) {
      return this.render(h, this.response);
    }
  });

  // 6. Subscribe to the config and update vm.response whenever
  //    a new response is generated.
  config.subscribe(resp => {
    vm.response = resp;
  });
});`
        }
      </PrismBlock>
    </div>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriVue
};
