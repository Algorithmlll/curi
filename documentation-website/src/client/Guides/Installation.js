import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { PrismBlock } from '../components/PrismBlocks';
import { Link } from 'curi-react';

const name = 'Installation';
const slug = 'installation';

export const InstallationLink = ({ children }) => (
  <Link to='Guide' params={{ slug }}>{children || name}</Link>
);

const Installation = () => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      You can install the latest version of Curi from NPM. Curi has a peer dependency
      on the Hickory package, so you should go ahead and install that as well.
    </p>
    <PrismBlock lang='bash'>
      npm install hickory curi
    </PrismBlock>

    <p>
      If you prefer to use script tags, you can use <a href="https://unpkg.com">Unpkg</a>
      {' '}to load Curi and Hickory.
    </p>

    <PrismBlock lang='markup'>
      {
`<script src="https://unpkg.com/hickory/dist/hickory.js" />
<script src="https://unpkg.com/curi/dist/curi.js" />`
      }
    </PrismBlock>

    <h2>Promises</h2>
    <p>
      Curi uses Promises, so you may need to include a polyfill to add Promise support for
      older browsers (including IE 11).
    </p>
    <p>
      If you need a general ES2015 polyfill, you can check
      out the one provided by Babel's{' '}
      <a href="https://babeljs.io/docs/usage/polyfill/#usage-in-browser">babel-polyfill</a> package.
      If you only need a Promise polyfill, then you should check out the{' '}
      <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a> package.
    </p>

    <h2>Next</h2>
    <p>
      <Link to='Guide' params={{ slug: 'getting-started' }}>Get started</Link> with Curi.
    </p>
  </BaseGuide>
);

export default {
  name,
  slug,
  component: Installation
};
