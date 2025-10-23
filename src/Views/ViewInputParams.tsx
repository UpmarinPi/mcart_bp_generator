import {ViewBase} from "./ViewBase";
import React from "react";
import {DropdownComponent} from "./Components/DropdownComponent";
import {SelectImageComponent} from "./Components/SelectImageComponent";
import {ImagePreviewComponent} from "./Components/ImagePreviewComponent";
import {SelectColorItemComponent} from "./Components/UsingBlockComponent/SelectColorItemComponent";
import {ButtonComponent} from "./Components/ButtonComponent";
import {MapDataImagePreviewComponent} from "./Components/MapDataImagePreviewComponent";
import {ProgressBarComponent} from "./Components/ProgressBarComponent";

export namespace ViewInputParamIds {
    export const convertModeDropdownId: string = "convertModeDropdown";
    export const selectBaseImageId: string = "selectBaseImageId";
    export const baseImagePreviewId: string = "baseImagePreview";
    export const usingBlockItemComponentId: string = "usingBlockItem";
    export const convertButtonId: string = "convertButton";
    export const progressBarId: string = "progressBar";
    export const resultImagePreviewId: string = "resultImagePreview";
}

export class ViewInputParams extends ViewBase {
    convertModeDropdown: DropdownComponent;
    selectBaseImage: SelectImageComponent;
    baseImagePreview: ImagePreviewComponent;
    usingBlockItemComponent: SelectColorItemComponent;
    convertButtonComponent: ButtonComponent;
    progressBarComponent: ProgressBarComponent;
    resultImagePreview: MapDataImagePreviewComponent;

    constructor() {
        super();
        this.convertModeDropdown = this.CreateView(DropdownComponent, ViewInputParamIds.convertModeDropdownId);
        this.selectBaseImage = this.CreateView(SelectImageComponent, ViewInputParamIds.selectBaseImageId);
        this.baseImagePreview = this.CreateView(ImagePreviewComponent, ViewInputParamIds.baseImagePreviewId);
        this.usingBlockItemComponent = this.CreateView(SelectColorItemComponent, ViewInputParamIds.usingBlockItemComponentId, "#ff0000");
        this.convertButtonComponent = this.CreateView(ButtonComponent, ViewInputParamIds.convertButtonId, "変換");
        this.progressBarComponent = this.CreateView(ProgressBarComponent, ViewInputParamIds.progressBarId);
        this.resultImagePreview = this.CreateView(MapDataImagePreviewComponent, ViewInputParamIds.resultImagePreviewId);

        this.baseImagePreview.SetSize(0.2);
    }

    Render(): React.JSX.Element {
        super.Render();
        return (
            <>
                {this.convertModeDropdown.Render()}
                {this.selectBaseImage.Render()}
                {this.baseImagePreview.Render()}
                {this.usingBlockItemComponent.Render()}
                {this.convertButtonComponent.Render()}
                {this.progressBarComponent.Render()}
                {this.resultImagePreview.Render()}
            </>
        );
    }
}
