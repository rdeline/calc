import * as React from "react";


export interface ButtonProps {
    label: string;
    onClick: (label: string) => void;
}

export class Button extends React.Component<ButtonProps> {
    public render() {
        return <button onClick={e => this.props.onClick(this.props.label)}>{this.props.label}</button>;
    }
}