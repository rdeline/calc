import * as React from "react";
import { observable } from "mobx";


export interface TextBoxProps {
    value: string;
}

export class TextBox extends React.Component<TextBoxProps> {
    @observable public value: string;
    public render() {
        return <div>{this.props.value}</div>;
    }
}