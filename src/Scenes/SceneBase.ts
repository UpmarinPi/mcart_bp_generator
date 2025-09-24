import {IViewBase} from "../Views/ViewBase";
import {IControllerBase} from "../Controllers/ControllerBase";
import {Renderer} from "../Cores/Renderer";

export abstract class SceneBase {
    view: IViewBase | undefined;

    private Render(){
        if(!this.view){
            return;
        }
        Renderer.get().Render(this.view);
    }

    protected InitializeView<T extends IViewBase>
    (viewType: (new () => T)): void {
        if(this.view !== undefined) {
            console.warn("viewは既に初期化済みです");
            return;
        }
        this.view = new viewType();
        this.Render();
    }
}