import * as React from "react";
import { Scroller } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer
        .create(
            <Scroller
                toggleAll={jest.fn()}
                markAllViewed={jest.fn()}
                markAllUnviewedViewed={jest.fn()}
            />,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
