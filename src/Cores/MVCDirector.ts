import {Singleton} from "./Singleton";
import {ViewControllerPair} from "./ViewControllerPair";
import {IViewBase} from "../Views/ViewBase";
import {IControllerBase} from "../Controllers/ControllerBase";

export class MVCDirector extends Singleton {
    CreatePair<TView extends IViewBase, TController extends IControllerBase>(viewType: (new () => TView), controllerType: (new () => TController)): ViewControllerPair<TView, TController> {
        const view = new viewType();
        const controller = new controllerType();
        let vcPair = new ViewControllerPair<TView, TController>(view, controller);
        controller.onVCAppended();
        return vcPair;
    }
}