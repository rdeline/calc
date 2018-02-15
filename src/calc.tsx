import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class Calculator extends React.Component {
    @observable private answer: string = "0";
    private savedOp: { op: string, arg: number } = undefined;
    private resetAnswer = true;

    public render() {

        const numeral = (e: React.MouseEvent<HTMLButtonElement>) => {
            const label = e.currentTarget.innerText;
            if (this.resetAnswer) { this.answer = ''; }
            this.answer += label;
            this.resetAnswer = false;
        }

        const dot = () => {
            if (this.answer.indexOf('.') < 0) {
                this.answer += '.';
            }
        }

        const operation = (e: React.MouseEvent<HTMLButtonElement>) => {
            const label = e.currentTarget.innerText;
            let currentAnswer = parseInt(this.answer);
            if (this.savedOp) {
                switch (this.savedOp.op) {
                    case '+': currentAnswer = this.savedOp.arg + currentAnswer; break;
                    case '-': currentAnswer = this.savedOp.arg - currentAnswer; break;
                    case '×': currentAnswer = this.savedOp.arg * currentAnswer; break;
                    case '÷': currentAnswer = this.savedOp.arg / currentAnswer; break;
                    default: break;
                }
            }
            this.answer = currentAnswer.toString();
            this.savedOp = label === '=' ? undefined : { op: label, arg: currentAnswer };
            this.resetAnswer = true;
        }

        const clearEntry = () => {
            this.answer = "0";
            this.resetAnswer = true;
        }

        const clear = () => {
            clearEntry();
            this.savedOp = undefined;
        }

        const backspace = () => {
            if (this.answer.length === 1) {
                this.answer = "0";
                this.resetAnswer = true;
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
                            <td colSpan={4} className="right"><div>{this.answer}</div></td>
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

