import {ComponentBase} from "./ComponentBase";
import React from "react";

export class ImagePreviewComponent extends ComponentBase {

    img: HTMLImageElement | null = null;

    SetImage(img: HTMLImageElement | null) {
        this.img = img;
        this.UpdateImage();
    }

    ClearImage() {
        this.img = null;
        this.onUpdateRender.notify();
    }

    private UpdateImage(): void {
        const myImageElement = document.getElementById(this.id) as HTMLImageElement;
        if (!myImageElement) {
            return;
        }
        if (this.img) {
            myImageElement.src = this.img.src;
            myImageElement.style.display = "block";
        } else {
            myImageElement.src = '';
            myImageElement.style.display = "none";
        }

    }

    constructor(id: string) {
        super(id);

        // 描画して
        this.onUpdateRender.Subscribe(() => {
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