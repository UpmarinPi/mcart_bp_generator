import {ViewInputParams} from "../Views/ViewInputParams";
import {ControllerBase} from "./ControllerBase";
import {ConstObjectToOption, DropdownComponent} from "../Views/Components/DropdownComponent";
import {ConvertModes} from "../Cores/Types";
import {OptionManager} from "../Options/OptionManager";
import {SelectImageComponent} from "../Views/Components/SelectImageComponent";
import {ImagePreviewComponent} from "../Views/Components/ImagePreviewComponent";
import {OptionData} from "../Options/OptionData";

export class InputParamsController extends ControllerBase {

    OnInputParamChange(value: string): void {
        OptionManager.get().SetConvertMode(value);
    }

    // select base image
    InitializeSelectBaseImage(selectBaseImage: SelectImageComponent): void {
        if (!selectBaseImage) {
            console.error("SelectImageComponent must be defined");
            return;
        }
        selectBaseImage.onComponentChange.Subscribe(
            (value: Blob) => {
                this.OnSelectBaseImageChange(value);
            });
    }

    OnSelectBaseImageChange(value: Blob): void {
        if (!value) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const image = new Image();
            image.onload = () => {
                OptionManager.get().SetImage(image);
            }
            image.src = reader.result as string;
        }
        reader.readAsDataURL(value);
    }

    // base image preview

    InitializeBaseImagePreview(baseImage: ImagePreviewComponent): void {
        if(!baseImage) {
            console.error("baseImage must be defined");
            return;
        }
        OptionManager.get().onOptionChange.Subscribe(
            (optionData: OptionData)=>{
                baseImage.SetImage(optionData.baseImage);
            }
        );
    }


    // convert mode dropdown

    InitializeConvertModeDropdown(convertModeDropdown: DropdownComponent): void {
        if (!convertModeDropdown) {
            console.error("ViewInputParams must be defined");
            return;
        }
        convertModeDropdown.options = ConstObjectToOption(ConvertModes);
        convertModeDropdown.onComponentChange.Subscribe(
            (value: string) => {
                this.OnInputParamChange(value);
            });
    }

    constructor(viewInputParams: ViewInputParams) {
        super();
        this.InitializeConvertModeDropdown(viewInputParams.convertModeDropdown);
        this.InitializeSelectBaseImage(viewInputParams.selectBaseImage);
        this.InitializeBaseImagePreview(viewInputParams.baseImagePreview);
    }
}