import "jest";
import React from "react";
import "react-native";
import renderer from "react-test-renderer";

import InMemory from "@hickory/in-memory";
import curi, { Response } from "@curi/core";
import { CuriProvider } from "@curi/react";
import activeInteraction from "@curi/route-active";
import { TouchableHighlight, Text } from "react-native";
import Link from "../src/Link";

import { NavType } from "@hickory/root";

// play nice
function fakeEvent(props = {}) {
  return {
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...props
  };
}

describe("<Link>", () => {
  describe("anchor", () => {
    it("renders a <TouchableHighlight> by default", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);

      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor).toBeDefined();
    });

    it("when provided, it renders the component instead of an anchor", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Test", path: "" }]);
      const StyledAnchor = props => (
        <TouchableHighlight style={{ borderColor: "orange" }} {...props} />
      );

      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" anchor={StyledAnchor}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.find(StyledAnchor);
      expect(anchor).toBeDefined();
    });
  });

  describe("to", () => {
    it("uses the pathname from current response's location if 'to' is not provided", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = [{ name: "Catch All", path: "(.*)" }];
      const router = curi(history, routes);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to={null}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe(
        "/the-initial-location"
      );
    });
  });

  describe("params", () => {
    const routes = [
      { name: "Park", path: "/park/:name" },
      { name: "Catch All", path: "(.*)" }
    ];

    it("uses params to generate the location to navigate to", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, routes);
      const params = { name: "Glacier" };
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");
    });

    it("updates location to navigate to when props change", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, routes);

      const params = { name: "Glacier" };
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={params}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[0][0].pathname).toBe("/park/Glacier");

      const newParams = { name: "Yellowstone" };
      tree.update(
        <CuriProvider router={router}>
          {() => (
            <Link to="Park" params={newParams}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      anchor.props.onPress(fakeEvent());
      expect(mockNavigate.mock.calls[1][0].pathname).toBe("/park/Yellowstone");
    });
  });

  describe("ref", () => {
    it("returns the anchor's ref, not the link's", () => {
      const history = InMemory({ locations: ["/the-initial-location"] });
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;
      const routes = [
        { name: "Parks", path: "/parks" },
        { name: "Catch All", path: "(.*)" }
      ];
      const router = curi(history, routes);
      const ref = React.createRef();
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Parks" ref={ref}>
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      expect(anchor.instance).toBe(ref.current);
    });
  });

  describe("pressing a link", () => {
    describe("navigation method", () => {
      let history, mockNavigate, mockPush, mockReplace;

      beforeEach(() => {
        history = InMemory();
        history.navigate = mockNavigate = jest.fn();
      });

      it("[default] navigates as ANCHOR", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });

      it("method='ANCHOR'", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="ANCHOR">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });

      it("method='PUSH'", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="PUSH">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("PUSH");
      });

      it("method='REPLACE'", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method="REPLACE">
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("REPLACE");
      });

      it("[unknown] uses ANCHOR", () => {
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" method={"whatchamacallit" as NavType}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls[0][1]).toBe("ANCHOR");
      });
    });

    it("includes hash, query, and state in location passed to history.navigate", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test" hash="thing" query="one=1" state="yo">
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent());
      const mockLocation = mockNavigate.mock.calls[0][0];
      expect(mockLocation).toMatchObject({
        pathname: "/",
        hash: "thing",
        query: "one=1",
        state: "yo"
      });
    });

    describe("onPress", () => {
      it("calls onPress prop func if provided", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn();
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(mockNavigate.mock.calls.length).toBe(1);
        expect(onPress.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("does not call history.navigate if onPress prevents default", () => {
        const history = InMemory();
        const mockNavigate = jest.fn();
        history.navigate = mockNavigate;
        const onPress = jest.fn(event => {
          event.preventDefault();
        });
        const router = curi(history, [{ name: "Test", path: "" }]);
        const tree = renderer.create(
          <CuriProvider router={router}>
            {() => (
              <Link to="Test" onPress={onPress}>
                <Text>Test</Text>
              </Link>
            )}
          </CuriProvider>
        );
        const anchor = tree.root.findByType(TouchableHighlight);
        anchor.props.onPress(fakeEvent());
        expect(onPress.mock.calls.length).toBe(1);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("doesn't call history.navigate if event.preventDefault has been called", () => {
      const history = InMemory();
      const mockNavigate = jest.fn();
      history.navigate = mockNavigate;

      const router = curi(history, [{ name: "Test", path: "" }]);
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => (
            <Link to="Test">
              <Text>Test</Text>
            </Link>
          )}
        </CuriProvider>
      );
      const anchor = tree.root.findByType(TouchableHighlight);
      anchor.props.onPress(fakeEvent({ defaultPrevented: true }));
      expect(mockNavigate.mock.calls.length).toBe(0);
    });
  });
});