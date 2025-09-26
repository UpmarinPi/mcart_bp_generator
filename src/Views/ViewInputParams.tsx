import {ViewBase} from "./ViewBase";
import React from "react";
import {DropdownComponent} from "./Components/DropdownComponent";
import {SelectImageComponent} from "./Components/SelectImageComponent";
import {ImagePreviewComponent} from "./Components/ImagePreviewComponent";

export namespace ViewInputParamIds {
    export const convertModeDropdownId: string = "convertModeDropdown";
    export const selectBaseImageId: string = "selectBaseImageId";
    export const baseImagePreviewId: string = "baseImagePreview";
}

export class ViewInputParams extends ViewBase {
    convertModeDropdown: DropdownComponent;
    selectBaseImage: SelectImageComponent;
    baseImagePreview: ImagePreviewComponent;

    constructor() {
        super();
        this.convertModeDropdown = this.CreateView(DropdownComponent, ViewInputParamIds.convertModeDropdownId);
        this.selectBaseImage = this.CreateView(SelectImageComponent, ViewInputParamIds.selectBaseImageId);
        this.baseImagePreview = this.CreateView(ImagePreviewComponent, ViewInputParamIds.baseImagePreviewId);
    }

    Render(): React.JSX.Element {
        return (
            <>
                {this.convertModeDropdown.Render()}
                {this.selectBaseImage.Render()}
                {this.baseImagePreview.Render()}
            </>
        );
    }
}