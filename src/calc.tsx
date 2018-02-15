import * as React from "react";
import { Button } from "./button";
import { TextBox } from "./textbox";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class Calculator extends React.Component {
    @observable private answer: string = "0";
    private savedOp: (x: number) => number = undefined;

    public render() {
        const numeral = (label: string) => {
            if (this.answer === '0') { this.answer = ''; }
            this.answer += label;
        }

        const dot = () => {
            if (this.answer.indexOf('.') < 0) {
                this.answer += '.';
            }
        }

        const operation = (label: string) => {
            const currentAnswer = parseInt(this.answer);
            this.answer = this.savedOp ? this.savedOp(currentAnswer).toString() : '0';
            switch (label) {
                case '+': this.savedOp = n => currentAnswer + n; break;
                case '-': this.savedOp = n => currentAnswer - n; break;
                case '×': this.savedOp = n => currentAnswer * n; break;
                case '÷': this.savedOp = n => currentAnswer / n; break;
                case '=': this.savedOp = undefined; break;
                default: break;
            }
        }

        const clear = () => {
            this.answer = "0";
            this.savedOp = undefined;
        }

        const clearEntry = () => {
            this.answer = "0";
        }

        const backspace = () => {
            if (this.answer.length === 1) {
                this.answer = "0";
            } else {
                this.answer = this.answer.substring(0, this.answer.length - 1);
            }
        };

        const negation = () => {
            if (this.answer[0] === '-') {
                this.answer = this.answer.substring(1);
            } else if (this.answer !== '0') {
                this.answer = '-' + this.answer;
            }
        };

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="right"><TextBox value={this.answer.toString()} /></td>
                        </tr>
                        <tr>
                            <td><Button label="CE" onClick={clearEntry} /></td>
                            <td><Button label="C" onClick={clear} /></td>
                            <td><Button label="◄" onClick={backspace} /></td>
                            <td><Button label="÷" onClick={operation} /></td>
                        </tr>
                        <tr>
                            <td><Button label="7" onClick={numeral} /></td>
                            <td><Button label="8" onClick={numeral} /></td>
                            <td><Button label="9" onClick={numeral} /></td>
                            <td><Button label="×" onClick={operation} /></td>
                        </tr>
                        <tr>
                            <td><Button label="4" onClick={numeral} /></td>
                            <td><Button label="5" onClick={numeral} /></td>
                            <td><Button label="6" onClick={numeral} /></td>
                            <td><Button label="-" onClick={operation} /></td>
                        </tr>
                        <tr>
                            <td><Button label="1" onClick={numeral} /></td>
                            <td><Button label="2" onClick={numeral} /></td>
                            <td><Button label="3" onClick={numeral} /></td>
                            <td><Button label="+" onClick={operation} /></td>
                        </tr>
                        <tr>
                            <td><Button label="±" onClick={negation} /></td>
                            <td><Button label="0" onClick={numeral} /></td>
                            <td><Button label="." onClick={dot} /></td>
                            <td><Button label="=" onClick={operation} /></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

