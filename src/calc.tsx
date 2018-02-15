import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class Calculator extends React.Component {
    @observable private display: string = "0";
    private savedOp: { op: string, arg: number } = undefined;
    private resetDisplay = true;

    public render() {

        const numeral = (e: React.MouseEvent<HTMLButtonElement>) => {
            const label = e.currentTarget.innerText;
            if (this.resetDisplay) { this.display = ''; }
            this.display += label;
            this.resetDisplay = false;
        }

        const dot = () => {
            if (this.display.indexOf('.') < 0) {
                this.display += '.';
            }
        }

        const operation = (e: React.MouseEvent<HTMLButtonElement>) => {
            const label = e.currentTarget.innerText;
            let currentAnswer = parseInt(this.display);
            if (this.savedOp) {
                switch (this.savedOp.op) {
                    case '+': currentAnswer = this.savedOp.arg + currentAnswer; break;
                    case '-': currentAnswer = this.savedOp.arg - currentAnswer; break;
                    case '×': currentAnswer = this.savedOp.arg * currentAnswer; break;
                    case '÷': currentAnswer = this.savedOp.arg / currentAnswer; break;
                    default: break;
                }
            }
            this.display = currentAnswer.toString();
            this.savedOp = label === '=' ? undefined : { op: label, arg: currentAnswer };
            this.resetDisplay = true;
        }

        const clearEntry = () => {
            this.display = "0";
            this.resetDisplay = true;
        }

        const clear = () => {
            clearEntry();
            this.savedOp = undefined;
        }

        const backspace = () => {
            if (this.display.length === 1) {
                this.display = "0";
                this.resetDisplay = true;
            } else {
                this.display = this.display.substring(0, this.display.length - 1);
            }
        };

        const negation = () => {
            if (this.display[0] === '-') {
                this.display = this.display.substring(1);
            } else if (this.display !== '0') {
                this.display = '-' + this.display;
            }
        };

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="right"><div>{this.display}</div></td>
                        </tr>
                        <tr>
                            <td><button onClick={clearEntry}>CE</button></td>
                            <td><button onClick={clear}>C</button></td>
                            <td><button onClick={backspace}>◄</button></td>
                            <td><button onClick={operation}>÷</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={numeral}>7</button></td>
                            <td><button onClick={numeral}>8</button></td>
                            <td><button onClick={numeral}>9</button></td>
                            <td><button onClick={operation}>×</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={numeral}>4</button></td>
                            <td><button onClick={numeral}>5</button></td>
                            <td><button onClick={numeral}>6</button></td>
                            <td><button onClick={operation}>-</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={numeral}>1</button></td>
                            <td><button onClick={numeral}>2</button></td>
                            <td><button onClick={numeral}>3</button></td>
                            <td><button onClick={operation}>+</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={negation}>±</button></td>
                            <td><button onClick={numeral}>0</button></td>
                            <td><button onClick={dot}>.</button></td>
                            <td><button onClick={operation}>=</button></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

