import { basicTypes } from '@/constants/enums';
import { iButton } from '@/models/components.models';
import React, { Children, PropsWithChildren } from 'react';

const Button = (props: PropsWithChildren<iButton>) => {
    const { label, icon, loading, disabled, callback, type, buttonType } =
        props;
    const buttonClass = `
         ${type !== basicTypes.Text ? 'border rounded-md' : ''} ${
        loading && 'opacity-50'
    } relative px-3 py-2
    `;
    const loadingIndicator = (
        <span className="absolute flex h-3 w-3 top-[-5px] right-[-5px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
    );
    return (
        <button
            className={buttonClass}
            type={buttonType || 'button'}
            disabled={disabled || loading}
            onClick={callback}>
            {loading && loadingIndicator}
            {props.children}
        </button>
    );
};

export default Button;
