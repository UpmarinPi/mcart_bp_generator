import {IViewBase} from "../Views/ViewBase";
import {IControllerBase} from "../Controllers/ControllerBase";

export class ViewControllerPair<TView extends IViewBase, TController extends IControllerBase> {
    view: TView;
    controller: TController;

    constructor(view: TView, controller: TController) {
        this.view = view;
        this.controller = controller;
    }
}