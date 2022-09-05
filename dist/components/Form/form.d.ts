import React, { ReactNode } from 'react';
import { ValidateError } from 'async-validator';
import useStore, { FormState } from './useStore';
export declare type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
    /**表单名称，会作为表单字段 id 前缀使用 */
    name?: string;
    /**表单默认值，只有初始化以及重置时生效 */
    initialValues?: Record<string, any>;
    children?: ReactNode | RenderProps;
    /**提交表单且数据验证成功后回调事件 */
    onFinish?: (values: Record<string, any>) => void;
    /**提交表单且数据验证失败后回调事件 */
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export declare type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
