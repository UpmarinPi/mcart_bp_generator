import React from "react";
import {ObserverSubject} from "../Cores/Observer";

export interface IViewBase {
    onUpdateRender: ObserverSubject;

    Render(): React.JSX.Element;
}

export abstract class ViewBase implements IViewBase {
    onUpdateRender: ObserverSubject;

    constructor() {
        this.onUpdateRender = new ObserverSubject();
    }

    Render(): React.JSX.Element {
        return (<></>);
    }

    CreateView<T extends ViewBase, TArgs extends any[]>(viewType: (new (...args: TArgs) => T), ...args: TArgs): T {
        let view: T;
        view = new viewType(...args);
        view.onUpdateRender.Subscribe(() => {
            this.onUpdateRender.notify();
        });

        return view;
    }
}