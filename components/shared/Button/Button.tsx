import React, { PropsWithChildren } from 'react';
import {
    buttonColor,
    buttonTypes,
    buttonVariants,
    iButton,
    buttonClass,
} from '.';

export const Button = ({
    label,
    icon,
    loading,
    disabled,
    click,
    color = buttonColor.Primary,
    variant = buttonVariants.Solid,
    buttonType = buttonTypes.Button,
    children,
}: PropsWithChildren<iButton>) => {
    const loadingIndicator = (
        <span className="bg-transparent absolute flex h- w-3 top-[-5px] right-[-5px]">
            <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400/75 opacity-75`}></span>
            <span
                className={`relative inline-flex rounded-full h-3 w-3 bg-primary-500/75`}></span>
        </span>
    );

    return (
        <button
            className={`${buttonClass({
                color,
                variant,
            })}}`}
            type={buttonType}
            disabled={disabled || loading}
            onClick={click}>
            {loading ? loadingIndicator : null}
            {icon ? icon : null}
            {children || label}
        </button>
    );
};
