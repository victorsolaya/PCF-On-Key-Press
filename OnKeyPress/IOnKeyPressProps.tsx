export interface IOnKeyPress {
    userInputChanged: (newValue: string) => void,
    inputValue?: string,
    isControlDisabled: boolean,
    isControlVisible: boolean,
}