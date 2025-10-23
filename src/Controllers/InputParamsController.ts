import {ViewInputParams} from "../Views/ViewInputParams";
import {ControllerBase} from "./ControllerBase";
import {ConstObjectToOption, DropdownComponent} from "../Views/Components/DropdownComponent";
import {ConvertModes} from "../Cores/Types";
import {OptionManager} from "../Options/OptionManager";
import {SelectImageComponent} from "../Views/Components/SelectImageComponent";
import {ImagePreviewComponent} from "../Views/Components/ImagePreviewComponent";
import {OptionData} from "../Options/OptionData";
import {MapDataImagePreviewComponent} from "../Views/Components/MapDataImagePreviewComponent";
import {ColorDataRepository} from "../Datas/ColorDataRepository";
import {DynamicBayerMatrixOrderedDither} from "../Converters/OrderedDitherers/DynamicBayerMatrixOrderedDitherer";
import {DithererBase} from "../Converters/DithererBase";
import {ProgressBarComponent} from "../Views/Components/ProgressBarComponent";
import {RawDitherer} from "../Converters/RawDitherer";

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

    // progress bar
    progressBar: ProgressBarComponent|undefined = undefined;
    InitializeProgressBar(progressBar: ProgressBarComponent): void {
        if(!progressBar) {
            console.error("ProgressBarComponent must be defined");
            return;
        }
        this.progressBar = progressBar;

        this.ditherSystem.onCurrentProgressChange.Subscribe((currentProgress)=>{
            if(!this.progressBar) {
                return;
            }
            progressBar.currentProgress = currentProgress;
        });
        this.ditherSystem.onMaxProgressChange.Subscribe((maxProgress)=>{
            if(!this.progressBar){
                return;
            }
            progressBar.maxProgress = maxProgress;
        });
    }

    // result image preview
    resultImagePreview: MapDataImagePreviewComponent | undefined = undefined;
    ditherSystem: DithererBase = new RawDitherer();// new DynamicBayerMatrixOrderedDither();
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
    async OnPreviewImageChange(){
        if(!this.resultImagePreview) {
            return;
        }
        let optionData = OptionManager.get().optionData;
        optionData.usingColors = ColorDataRepository.get().GetColorList(true);
        const mapData = await this.ditherSystem.Convert(optionData);
        this.resultImagePreview.SetMapData(mapData);
    }

    constructor(viewInputParams: ViewInputParams) {
        super();
        this.InitializeConvertModeDropdown(viewInputParams.convertModeDropdown);
        this.InitializeSelectBaseImage(viewInputParams.selectBaseImage);
        this.InitializeBaseImagePreview(viewInputParams.baseImagePreview);
        this.InitializeProgressBar(viewInputParams.progressBarComponent);
        this.InitializeResultImagePreview(viewInputParams.resultImagePreview);
    }
}
