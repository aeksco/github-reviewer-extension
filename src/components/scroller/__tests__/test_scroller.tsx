import * as React from "react";
import { Scroller } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer
        .create(
            <Scroller
                toggleAll={jest.fn()}
                markAllViewed={jest.fn()}
                setViewedToUnviewed={jest.fn()}
                setUnviewedToViewed={jest.fn()}
            />,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
