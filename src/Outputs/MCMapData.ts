import {EDimensionalMode} from "../Cores/Types";
import {FunctionLibrary} from "../FunctionLibrary";
import {RGBColor} from "../Cores/Color";

export class MCMapData {
    dimensionalMode: EDimensionalMode = EDimensionalMode.Flat;
    width: number = 0;
    height: number = 0;
    map: number[][] = [];
    dimensionalMap: number[][] = [];
    mapToColor: Map<number, RGBColor> = new Map();
    mapToBlock: Map<number, string> = new Map();
}
