import {ComponentBase} from "./ComponentBase";
import React from "react";

export class SelectMapdataComponent extends ComponentBase {

    constructor(id: string) {
        super(id);
    }

    Render(): React.JSX.Element {
        return (
            <div className={this.id}>
                <input
                    id={this.id} type={"file"} accept={".txt"} 
                    onChange={
                        (event) => {
                            if(event.target.files && event.target.files[0]) {
                                this.OnComponentChange(event.target.files[0]);
                            }
                        }
                    }
                />
            </div>
        );
    }
}