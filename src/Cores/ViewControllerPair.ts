import {IViewBase} from "../Views/ViewBase";
import {IControllerBase} from "../Controllers/ControllerBase";

export class ViewControllerPair<TView extends IViewBase, TController extends IControllerBase> {
    view: TView | undefined = undefined;
    controller: TController | undefined = undefined;


    constructor(view?: TView, controller?: TController) {
        this.view = view as TView;
        this.controller = controller as TController;
    }
}