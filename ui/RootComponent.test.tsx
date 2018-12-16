import * as React from "react";
import {create} from "react-test-renderer";
import RootComponent from "./RootComponent";

test('Test Root Component',()=>{
    let reactTestRenderer = create(<RootComponent/>);
    let reactTestRendererJSON = reactTestRenderer.toJSON();
    expect(reactTestRendererJSON).toMatchSnapshot();
});