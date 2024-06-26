import { FC } from 'react';
import { SelectProps } from './select';
import { SelectOptionProps } from './option';
export declare type ISelectComponent = FC<SelectProps> & {
    Option: FC<SelectOptionProps>;
};
declare const TransSelect: ISelectComponent;
export default TransSelect;
