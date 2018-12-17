import * as React from "react";
import * as ReactDOM from "react-dom";
import RootComponent from "./RootComponent";

const rootElement = document.createElement("div");
rootElement.id = "root";

document.body.appendChild(rootElement);

ReactDOM.render(
    <div>
        <RootComponent/>
    </div>,
    document.getElementById("root")
);