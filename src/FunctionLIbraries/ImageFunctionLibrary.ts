import {GetCanvas} from "./FunctionLibrary";


export function ImageDataToImageURL(image: ImageData): string | null {
    const canvas = GetCanvas();
    const ctx = canvas.getContext('2d');
    if(!ctx){
        return null;
    }
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.putImageData(image, 0,0);

    return canvas.toDataURL();
}

export function ImageCanvasToImageData(image: HTMLImageElement): ImageData | null{
    const canvas = GetCanvas();
    const ctx = canvas.getContext('2d');
    if(!ctx){
        return null;
    }
    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, image.width, image.height);
}