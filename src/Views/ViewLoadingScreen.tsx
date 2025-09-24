import {ViewBase} from "./ViewBase";
import React from "react";

export class ViewLoadingScreen extends ViewBase {
    Render(): React.JSX.Element {
        return (
            <>
                <h2>
                    Now Loading...
                </h2>
            </>
        );
    }
}