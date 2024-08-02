import { basicTypes } from '@/constants/enums';
import React, { Children, PropsWithChildren } from 'react';
import { iButton } from './iButton';

export const Button = (props: PropsWithChildren<iButton>) => {
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
            className={`hover:animate-pulse ${buttonClass}`}
            type={buttonType || 'button'}
            disabled={disabled || loading}
            onClick={callback}>
            {loading && loadingIndicator}
            {props.children || label}
        </button>
    );
};
