import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

export default function ReactNativeTipsGuide() {
  return (
    <React.Fragment>
      <Explanation>
        <Note>
          This guide assumes that you are already familiar with React Native.
        </Note>
      </Explanation>

      <Section title="Back Button" id="back-button">
        <Explanation>
          <p>
            To add back button support, you need to use your <IJS>history</IJS>{" "}
            object (which you can use directly or access through your router).
          </p>
          <p>
            The <IJS>history.go()</IJS> method is used for jumping between
            locations, so passing it <IJS>-1</IJS> will jump back to the
            previous location.
          </p>
          <p>
            When the app is at the initial location, you may want to return{" "}
            <IJS>false</IJS> to close the app when the user presses the back
            button.
          </p>
        </Explanation>
        <CodeBlock>
          {`import { BackHandler } from 'react-native';

// create your router
const router = curi(history, routes);

BackHandler.addEventListener(
  "hardwareBackPress",
  () => {
    // close the app when pressing back button
    // while on the initial screen
    if (router.history.index === 0) {
      return false;
    }
    router.history.go(-1);
    return true;
  }
);`}
        </CodeBlock>
      </Section>
      <Section title="Components" id="components">
        <Explanation>
          <p>
            The{" "}
            <Link to="Package" params={{ package: "react-native" }}>
              <IJS>@curi/react-native</IJS>
            </Link>{" "}
            package is quite similar to the{" "}
            <Link to="Package" params={{ package: "react-dom" }}>
              <IJS>@curi/react-dom</IJS>
            </Link>{" "}
            package. In fact, Curi's React Native package re-exports most of the
            components from the React package.
          </p>
        </Explanation>

        <Subsection title={<Cmp>Link</Cmp>} id="components-link">
          <Explanation>
            <p>
              The main difference is that they have different <Cmp>Link</Cmp>{" "}
              components. While the React package's <Cmp>Link</Cmp> renders an
              anchor by default, the React Native <Cmp>Link</Cmp> renders a{" "}
              <Cmp>TouchableHighlight</Cmp> by default.
            </p>
            <Note>
              Don't forget to wrap the <Cmp>Link</Cmp>'s text in a{" "}
              <Cmp>Text</Cmp>!
            </Note>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Link } from '@curi/react-native';

<Link to='Home'>
  <Text>Home</Text>
</Link>`}
          </CodeBlock>
        </Subsection>
        <Subsection title={<IJS>curiProvider</IJS>} id="fn-curiProvider">
          <Explanation>
            <p>
              <IJS>@curi/react-native</IJS> provides a <IJS>curiProvider()</IJS>{" "}
              function that will create the root Curi component for an
              application. That component will listen for new responses and
              re-render your application.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { curiProvider } from '@curi/react-native';

import router from './router';
const Router = curiProvider(router);

const App = () => (
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </Router>
);`}
          </CodeBlock>
        </Subsection>
      </Section>
    </React.Fragment>
  );
}
