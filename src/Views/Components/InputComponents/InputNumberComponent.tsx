import {InputBaseComponent} from "./InputBaseComponent";
import React from "react";

export class InputNumberComponent extends InputBaseComponent {
    title: string;
    displayPreInput: string;
    displayPostInput: string;
    constructor(id: string, title: string = "", displayPreInput: string = "", displayPostInput: string = "") {
        super(id);
        this.type = "number";
        this.title = title;
        this.displayPreInput = displayPreInput;
        this.displayPostInput = displayPostInput;
    }

    // 想定
    // TITLE
    // {PRE} Input {POST}

    // タイトル
    // 表示物: {Input} %

    override Render(): React.JSX.Element {
        return (
            <div id={this.id}>
                <p>{this.title}</p>
                <span>{this.displayPreInput}</span>
                <input
                    id={"numberInput"} type={this.type} accept={this.accept}
                    onChange={
                        (event) => {
                            this.OnInputChange(event);
                        }
                    }
                />
                <span>{this.displayPostInput}</span>
            </div>
        );
    }
}