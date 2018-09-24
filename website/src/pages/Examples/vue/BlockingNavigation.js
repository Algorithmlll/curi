import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function BlockingNavigationExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          Sometimes, you don't want the user to leave the page. Ideally, this is
          for their own good, such as when a form is half filled out, and not
          becacuse you're running a spam site.
        </p>
        <p>
          When you want to do this, you can use the <Cmp>curi-block</Cmp>{" "}
          component from react-curi to display a user confirmation that requires
          user input before navigation will occur.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/blocking-navigation" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/blocking-navigation">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
