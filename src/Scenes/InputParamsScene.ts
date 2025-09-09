import {SceneBase} from "./SceneBase";
import {ViewControllerPair} from "../Cores/ViewControllerPair";
import {ViewInputParams} from "../Views/ViewInputParams";
import {InputParamsController} from "../Controllers/InputParamsController";

class InputParamsScene extends SceneBase{

    InputParamsVCPair : ViewControllerPair<ViewInputParams, InputParamsController> | undefined;

    override CreatePairs(): void {
        super.CreatePairs();

        this.InputParamsVCPair = InputParamsScene.CreatePair(ViewInputParams, InputParamsController);
    }
}