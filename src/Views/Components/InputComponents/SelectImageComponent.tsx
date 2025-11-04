import {ComponentBase} from "../ComponentBase";
import React from "react";
import {InputBaseComponent} from "./InputBaseComponent";

export class SelectImageComponent extends InputBaseComponent {

    constructor(id: string) {
        super(id);
        this.type = "file";
        this.accept = "image/*";
    }
}