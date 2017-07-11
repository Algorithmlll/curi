import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi-react-redirect';
const version = '0.4.0';
const type = 'react';

const CuriReactRedirect = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>
      <PrismBlock lang='javascript'>
        {
`import Redirect from 'curi-react-redirect';`
        }
      </PrismBlock>

      <p>
        The <InlineJS>&lt;Redirect&gt;</InlineJS> component lets you "render" a redirect. After
        the <InlineJS>&lt;Redirect&gt;</InlineJS> component has mounted, it will call the appropriate
        history method to navigate to a new location.
      </p>

      <p>
        <InlineJS>&lt;Redirect&gt;</InlineJS> works very similarly to a <InlineJS>&lt;Link&gt;</InlineJS>,
        except instead of having navigation triggered by a click, with a <InlineJS>&lt;Redirect&gt;</InlineJS>
        {' '}the navigation will happen automatically just by rendering the component.
      </p>
      <PrismBlock lang='jsx'>
        {
`<Redirect to='Home' />`
        }
      </PrismBlock>

      <div>
        <h3>props</h3>

        <div>
          <h4>to</h4>
          <p>
            The name of the route that should be used to generate the pathname of the location to navigate to.
          </p>
        </div>

        <div>
          <h4>params</h4>
          <p>
            Any path params of the route specified with the to prop (or the params for any of its ancestor
            routes).
          </p>
        </div>

        <div>
          <h4>details</h4>
          <p>
            Additional location properties to include when generating the URI to redirect to (search, hash, state).
          </p>
        </div>

        <div>
          <h4>children</h4>
          <p>
            You can provide a children element that will be rendered until the response generated by the redirect
            has resolved. This allows you to render some sort of "loading" message, which can be useful if the
            redirect takes a bit of time and you don't want to just render a blank page.
          </p>
        </div>
      </div>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriReactRedirect
};
