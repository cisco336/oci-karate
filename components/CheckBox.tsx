'use client';
import { iCheckBox } from '@/models/components.models';
import React, { PropsWithChildren, useState } from 'react';

const CheckBox = (props: PropsWithChildren<iCheckBox>) => {
    const {
        title,
        placeholder,
        id,
        callback,
        name,
        disabled,
        checked = false,
        children,
    } = props;
    const [isChecked, setIsChecked] = useState(checked);
    const changeHandler = () => {
        setIsChecked(!isChecked);
        callback && callback();
    };
    return (
        <label
            aria-label=""
            className="flex gap-2 justify-start items-baseline">
            <input
                type="checkbox"
                id={id}
                name={name}
                placeholder={placeholder}
                title={title}
                checked={isChecked}
                onChange={changeHandler}
            />
            {title}
        </label>
    );
};

export default CheckBox;
