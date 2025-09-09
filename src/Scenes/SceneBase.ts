import {IViewBase} from "../Views/ViewBase";
import {IControllerBase} from "../Controllers/ControllerBase";
import {ViewControllerPair} from "../Cores/ViewControllerPair";
import {MVCDirector} from "../Cores/MVCDirector";

export class SceneBase {
    protected static CreatePair<TView extends IViewBase, TController extends IControllerBase>
    (viewType: (new () => TView), controllerType: (new () => TController)): ViewControllerPair<TView, TController> {
        const mvcDirector = MVCDirector.get();

        return mvcDirector.CreatePair(viewType, controllerType);
    }

    constructor() {
        this.CreatePairs();
    }

    CreatePairs(): void {

    }
}