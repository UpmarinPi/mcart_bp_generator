import {ViewBase} from "./ViewBase";
import React from "react";
import {DropdownComponent} from "./Components/DropdownComponent";
import {SelectImageComponent} from "./Components/SelectImageComponent";
import {ImagePreviewComponent} from "./Components/ImagePreviewComponent";
import {SelectColorItemComponent} from "./Components/UsingBlockComponent/SelectColorItemComponent";

export namespace ViewInputParamIds {
    export const convertModeDropdownId: string = "convertModeDropdown";
    export const selectBaseImageId: string = "selectBaseImageId";
    export const baseImagePreviewId: string = "baseImagePreview";
    export const usingBlockItemComponentId: string = "usingBlockItemComponent";
}

export class ViewInputParams extends ViewBase {
    convertModeDropdown: DropdownComponent;
    selectBaseImage: SelectImageComponent;
    baseImagePreview: ImagePreviewComponent;
    usingBlockItemComponent: SelectColorItemComponent;

    constructor() {
        super();
        this.convertModeDropdown = this.CreateView(DropdownComponent, ViewInputParamIds.convertModeDropdownId);
        this.selectBaseImage = this.CreateView(SelectImageComponent, ViewInputParamIds.selectBaseImageId);
        this.baseImagePreview = this.CreateView(ImagePreviewComponent, ViewInputParamIds.baseImagePreviewId);
        this.usingBlockItemComponent = this.CreateView(SelectColorItemComponent, ViewInputParamIds.usingBlockItemComponentId, "#ff0000");
    }

    Render(): React.JSX.Element {
        return (
            <>
                {this.convertModeDropdown.Render()}
                {this.selectBaseImage.Render()}
                {this.baseImagePreview.Render()}
                {this.usingBlockItemComponent.Render()}
            </>
        );
    }
}