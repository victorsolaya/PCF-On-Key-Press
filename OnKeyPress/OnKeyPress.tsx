import * as React from "react";

import { Stack, TextField, initializeIcons } from 'office-ui-fabric-react/lib';
import { IOnKeyPress } from './IOnKeyPressProps'
import { textFieldStyles } from './OnKeyPress.styles'
export class OnKeyPressCode extends React.Component<IOnKeyPress> {
    private _textFieldValue: string;

    constructor(props: IOnKeyPress) {
        super(props);
        initializeIcons();
        this._textFieldValue = this.props.inputValue || "";
    }
    public componentWillReceiveProps(newProps: IOnKeyPress): void {
        this.setState(newProps);
    }

    public render(): JSX.Element {
        let textField = this.props.isControlVisible ? <TextField
            placeholder="---"
            onChange={this.userInputOnChange}
            autoComplete="off"
            styles={textFieldStyles}
            value={this._textFieldValue}
            disabled={this.props.isControlDisabled}
        /> : "";
        return (
            <div>
                <Stack style={{ flexDirection: 'row' }}>
                    {textField}
                </Stack>
            </div>
        );
    }

    /**
     * Everytime is triggered the onKeyUp it will trigger this functionality
     */
    private userInputOnChange = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<any> => {
        // Get the target
        const target = event.target as HTMLTextAreaElement;
        //Set the value of our textfield to the input
        this._textFieldValue = target.value;
        this.setState((prevState: IOnKeyPress): IOnKeyPress => prevState);
        this.props.userInputChanged(this._textFieldValue);
    };
}
