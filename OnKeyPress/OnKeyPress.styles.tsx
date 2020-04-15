import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
export const textFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => ({
    fieldGroup: {
        border: props.focused ? "1px solid black !important" : "1px solid transparent !important",
        backgroundColor: 'transparent !important',
        height: '33px',
        selectors: {
            ":after": {
                border: "none"
            },
            ":hover": {
                border: props.disabled ? "1px solid rgb(226, 226, 226) !important" : "1px solid black !important",
                backgroundColor: props.disabled ? "rgb(226, 226, 226) !important" : 'transparent'
            }
        }
    },
    field: {
        height: '33px',
        fontWeight: props.focused ? 400 : 600,
        fontFamily: "SegoeUI,'Segoe UI'",
        color: props.disabled ? 'rgb(51, 51, 51) !important' : 'black !important',
        backgroundColor: 'transparent !important',
        selectors: {
            ":hover": {
                fontWeight: props.disabled ? 600 : 400,
            },
            '::placeholder': {
                fontFamily: "SegoeUI,'Segoe UI'",
                fontSize: '14px',
                fontWeight: 600,
                color: 'black !important'
            },
            'hover::placeholder': {
                fontWeight: 400
            }
        }
    },
    root: {
        flex: 1,
        backgroundColor: 'transparent !important',
        height: '35px',
    },
    wrapper: {
        backgroundColor: 'transparent !important',
        height: '35px',
    }
});