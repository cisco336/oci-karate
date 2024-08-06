import React, { PropsWithChildren } from 'react';

export enum basicTypes {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Info = 'Info',
    Success = 'Success',
    Warning = 'Warning',
    Danger = 'Danger',
    Text = 'Text',
    Accent = 'Accent',
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
    onClick?: () => any;
}

export const buttonClass = (type: basicTypes) => {
    let classText = 'relative px-3 py-2 ';
    switch (type) {
        case basicTypes.Primary:
            classText +=
                'border rounded-md bg-primary-500 text-primary-50 hover:bg-primary-600';
            break;
        case basicTypes.Secondary:
            classText +=
                'border rounded-md bg-secondary-500 text-secondary-50 hover:bg-secondary-600';
            break;
        case basicTypes.Info:
            classText +=
                'border rounded-md bg-info-500 text-gray-700 hover:bg-info-600';
            break;
        case basicTypes.Success:
            classText +=
                'border rounded-md bg-success-700 text-success-50 hover:bg-success-600';
            break;
        case basicTypes.Warning:
            classText +=
                'border rounded-md bg-warning-500 text-gray-700 hover:bg-warning-600';
            break;
        case basicTypes.Danger:
            classText +=
                'border rounded-md bg-danger-500 text-danger-50 hover:bg-danger-600';
            break;
        case basicTypes.Text:
            classText += 'bg-transparent text-primary-50 hover:bg-primary-50';
            break;
        case basicTypes.Accent:
            classText +=
                'border rounded-md bg-accent-500 text-accent-50 hover:bg-accent-600';
            break;
        default:
            break;
    }

    return classText;
};

export const Button = ({
    label,
    icon,
    loading,
    disabled,
    onClick,
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
            onClick={onClick}>
            {loading ? loadingIndicator : null}
            {icon ? icon : null}
            {children || label}
        </button>
    );
};
