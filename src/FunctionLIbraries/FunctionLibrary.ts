export function ReverseMap(toReverseMap: Map<any, any>): Map<any, any> {
    return Object.fromEntries(Object.entries(toReverseMap).map(a => a.reverse()));
}

export function GetCanvas(): HTMLCanvasElement{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if(canvas){
        return canvas;
    }
    return document.createElement("canvas");
}