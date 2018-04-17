import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class Calculator extends React.Component {
    @observable private display: string = "0";
    private pending: { operation: string, num: number } = undefined;
    private resetDisplay = true;

    public render() {

        const digit = (e: React.MouseEvent<HTMLButtonElement>) => {
            const digit = e.currentTarget.innerText;
            if (this.resetDisplay) {
                this.display = digit;
            } else {
                this.display += digit;
            }
            this.resetDisplay = false;
        }

        const zero = () => {
            if (this.display !== "0") {
                this.display += "0";
            }
        }

        const dot = () => {
            if (this.resetDisplay) {
                this.display = "0";
            }
            if (this.display.indexOf('.') < 0) {
                this.display += '.';
                this.resetDisplay = false;
            }
        }

        const operation = (e: React.MouseEvent<HTMLButtonElement>) => {
            const operation = e.currentTarget.innerText;
            let num = parseFloat(this.display);
            if (this.pending) {
                switch (this.pending.operation) {
                    case '+': num = this.pending.num + num; break;
                    case '-': num = this.pending.num - num; break;
                    case '×': num = this.pending.num * num; break;
                    case '÷': num = this.pending.num / num; break;
                    default: break;
                }
            }
            this.display = num.toString().substring(0, 12);
            this.pending = operation === '=' ? undefined : { operation: operation, num: num };
            this.resetDisplay = true;
        }

        const clearEntry = () => {
            this.display = "0";
            this.resetDisplay = true;
        }

        const clear = () => {
            clearEntry();
            this.pending = undefined;
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
                            <td colSpan={4} className="display"><div>{this.display}</div></td>
                        </tr>
                        <tr>
                            <td><button onClick={clearEntry}>CE</button></td>
                            <td><button onClick={clear}>C</button></td>
                            <td><button onClick={backspace}>◄</button></td>
                            <td><button onClick={operation}>÷</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={digit}>7</button></td>
                            <td><button onClick={digit}>8</button></td>
                            <td><button onClick={digit}>9</button></td>
                            <td><button onClick={operation}>×</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={digit}>4</button></td>
                            <td><button onClick={digit}>5</button></td>
                            <td><button onClick={digit}>6</button></td>
                            <td><button onClick={operation}>-</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={digit}>1</button></td>
                            <td><button onClick={digit}>2</button></td>
                            <td><button onClick={digit}>3</button></td>
                            <td><button onClick={operation}>+</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={negation}>±</button></td>
                            <td><button onClick={zero}>0</button></td>
                            <td><button onClick={dot}>.</button></td>
                            <td><button onClick={operation}>=</button></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

