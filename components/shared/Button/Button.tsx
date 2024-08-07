import React, { PropsWithChildren } from 'react';

export enum basicTypes {
    Primary = 'primary',
    Secondary = 'secondary',
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
    Text = 'text',
    Accent = 'accent',
}

export enum buttonTypes {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset',
}

export interface iButton {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    type?: basicTypes;
    buttonType?: buttonTypes;
    click?: () => any;
}

export const buttonClass = (type: basicTypes) => {
    let classText = 'relative px-3 py-2 ';
    const textColor =
        type === basicTypes.Warning || type === basicTypes.Info
            ? 'text-gray-900'
            : 'text-gray-50';
    const bgColor = type === basicTypes.Success ? 700 : 500;

    if (type === basicTypes.Text) {
        classText += `bg-transparent text-gray-50 hover:text-gray-300 active:text-gray-400`;
    } else {
        classText += `border rounded-md bg-${type}-${bgColor} ${textColor} hover:bg-${type}-${
            bgColor + 100
        } active:bg-${type}-${bgColor + 200}`;
    }

    return classText;
};

export const Button = ({
    label,
    icon,
    loading,
    disabled,
    click,
    type = basicTypes.Primary,
    buttonType = buttonTypes.Button,
    children,
}: PropsWithChildren<iButton>) => {
    const loadingIndicator = (
        <span className="absolute flex h-3 w-3 top-[-5px] right-[-5px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
    );

    return (
        <button
            className={`${buttonClass(type)}`}
            type={buttonType}
            disabled={disabled || loading}
            onClick={click}>
            {loading ? loadingIndicator : null}
            {icon ? icon : null}
            {children || label}
        </button>
    );
};
