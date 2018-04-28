import React from "react";
import { InlineJS as IJS } from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import { isNull } from "util";
import {
  SideBySide,
  Explanation,
  CodeBlock
} from "../../../components/SideBySide";

const NPM = ({ name }) => (
  <SideBySide>
    <Explanation>The package can be installed from NPM.</Explanation>
    <CodeBlock lang="bash">
      {`npm install @curi/${name}
yarn add @curi/${name}`}
    </CodeBlock>
  </SideBySide>
);

const Unpkg = ({ name, version, globalName }) => (
  <SideBySide>
    <Explanation>
      <p>
        Prefer inline scripts? Every version is available through{" "}
        <a href={`https://unpkg.com/@curi/${name}@${version}/`}>Unpkg</a>.
      </p>
      <p>There are both full and minified versions available.</p>
      <p>
        The package will be attached to the window as{" "}
        <IJS>window.{globalName}</IJS>.
      </p>
    </Explanation>
    <CodeBlock lang="markup">
      {`<script
src="https://unpkg.com/@curi/${name}@${version}/dist/curi-${name}.js"
></script>`}
    </CodeBlock>
  </SideBySide>
);
export default ({ name, version, globalName, unpkg }) => (
  <Section title="Installation" id="installation">
    <NPM name={name} />
    {unpkg ? (
      <Unpkg name={name} version={version} globalName={globalName} />
    ) : null}
  </Section>
);
