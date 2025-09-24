import {IViewBase} from "../Views/ViewBase";

export interface IControllerBase {
    onVCAppended() : void;
}

export class ControllerBase implements IControllerBase {
    onVCAppended() {
    }
    constructor() {

    }
}