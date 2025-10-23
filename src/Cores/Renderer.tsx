import {Singleton} from "./Singleton";
import ReactDOM, {Root} from "react-dom/client";
import {IViewBase} from "../Views/ViewBase";

export class Renderer extends Singleton {
    root: Root;

    constructor() {
        super();
        this.root = ReactDOM.createRoot(
            document.getElementById('root') as HTMLElement
        );
    }

    Render(view: IViewBase): void {
        view.requestsRenderUpdate.Subscribe(() => {
            this.root.render(view.Render());
        });
        this.root.render(view.Render());
    }
}
