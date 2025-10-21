import {ViewInputParams} from "../Views/ViewInputParams";
import {ControllerBase} from "./ControllerBase";
import {ConstObjectToOption, DropdownComponent} from "../Views/Components/DropdownComponent";
import {ConvertModes} from "../Cores/Types";
import {OptionManager} from "../Options/OptionManager";
import {SelectImageComponent} from "../Views/Components/SelectImageComponent";
import {ImagePreviewComponent} from "../Views/Components/ImagePreviewComponent";
import {OptionData} from "../Options/OptionData";
import {MapDataImagePreviewComponent} from "../Views/Components/MapDataImagePreviewComponent";
import {ThresholdDither} from "../Converters/ThresholdDitherer";
import {ColorDataRepository} from "../Datas/ColorDataRepository";
import {BayerMatrixOrderedDither} from "../Converters/OrderedDitherers/BayerMatrixOrderedDitherer";
import {DynamicBayerMatrixOrderedDither} from "../Converters/OrderedDitherers/DynamicBayerMatrixOrderedDitherer";
import {RGBColor} from "../Cores/Color";

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

    // result image preview
    resultImagePreview: MapDataImagePreviewComponent | undefined = undefined;
    InitializeResultImagePreview(resultImagePreview: MapDataImagePreviewComponent): void {
        if (!resultImagePreview) {
            console.error("ResultImagePreview must be defined");
            return;
        }

        this.resultImagePreview = resultImagePreview;
        OptionManager.get().onOptionChange.Subscribe(()=>{
            this.OnPreviewImageChange();
        });
    }
    OnPreviewImageChange(){
        if(!this.resultImagePreview) {
            return;
        }
        let optionData = OptionManager.get().optionData;
        optionData.usingColors = ColorDataRepository.get().GetColorList(true);
        // optionData.usingColors = [new RGBColor(0,0,0), new RGBColor(255,255,255)];
        const mapData = DynamicBayerMatrixOrderedDither.Convert(optionData);
        this.resultImagePreview.SetMapData(mapData);
    }

    constructor(viewInputParams: ViewInputParams) {
        super();
        this.InitializeConvertModeDropdown(viewInputParams.convertModeDropdown);
        this.InitializeSelectBaseImage(viewInputParams.selectBaseImage);
        this.InitializeBaseImagePreview(viewInputParams.baseImagePreview);
        this.InitializeResultImagePreview(viewInputParams.resultImagePreview);
    }
}
