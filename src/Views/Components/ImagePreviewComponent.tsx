import {ComponentBase} from "./ComponentBase";
import React from "react";

export class ImagePreviewComponent extends ComponentBase {

    img: HTMLImageElement | null = null;
    imgSize: number = 1;

    SetImage(img: HTMLImageElement | null) {
        this.img = img;
        this.UpdateImage();
    }

    SetSize(size: number) {
        this.imgSize = size;
        this.UpdateImage();
    }

    SetHeight(height: number) {
        if (!this.img) {
            return;
        }
        const naturalHeight = this.img.naturalHeight;
        const size = height / naturalHeight;

        this.SetSize(size);
    }

    SetWidth(width: number) {
        if (!this.img) {
            return;
        }
        const naturalWidth = this.img.naturalWidth;
        const size = width / naturalWidth;

        this.SetSize(size);
    }

    ClearImage() {
        this.img = null;
        this.requestsRenderUpdate.notify();
    }

    private UpdateImage(): void {
        const myImageElement = this.GetMyRender() as HTMLImageElement;
        if (!myImageElement || !this.img) {
            return;
        }
        if (!this.img) {
            myImageElement.src = '';
            myImageElement.style.display = "none";
            return;
        }

        // 画像ソース設定
        myImageElement.src = this.img.src;
        myImageElement.style.display = "block";

        // 幅・高さ設定
        const naturalWidth = this.img.naturalWidth;
        const naturalHeight = this.img.naturalHeight;

        myImageElement.style.width = `${naturalWidth * this.imgSize}px`;
        myImageElement.style.height = `${naturalHeight * this.imgSize}px`;
    }

    constructor(id: string) {
        super(id);

        // 描画して
        this.requestsRenderUpdate.Subscribe(() => {
            this.UpdateImage();
        });
    }

    Render(): React.JSX.Element {
        return (
            <div className={this.id}>
                <img
                    id={this.id}
                    alt={this.id}
                />
            </div>
        );
    }
}
