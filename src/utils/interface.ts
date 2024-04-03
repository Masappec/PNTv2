export interface Row {
    value: string;
    key: string;
    is_header?: boolean;
}
export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}