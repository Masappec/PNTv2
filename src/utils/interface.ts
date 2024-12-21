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

export interface AcordionMonthYear<T> {
    year: number;
    month: number;
    data: T[];
    total: number;
    isLoading: boolean;
}
export interface PartialPage {
  totalPage: number;
  curretPage: number;
  from: number;
  to: number;
  total: number;
}