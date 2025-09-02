import {IViewBase} from "./ViewBase";
import React from "react";

export class ViewLoadingScreen implements IViewBase {
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