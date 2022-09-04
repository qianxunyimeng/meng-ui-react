import React from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 按钮尺寸 */
    size?: ButtonSize;
    /** 按钮类型 */
    btnType?: ButtonType;
    /** btnType = "link" 时才会生效，跳转地址 */
    href?: string;
    children?: React.ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 按钮常用于页面交互
 * ### 引用方法
 * ```
   import {Button} from "meng-ui-react"
  ```
 * @param props
 * @returns
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
