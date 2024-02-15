import { iDropdown } from '@/models/components.models';
import React, { PropsWithChildren } from 'react';
import Button from './Button';

const DropDown = (props: PropsWithChildren<iDropdown>) => {
    return (
        <div>
            <Button>{props.label || 'Dropdown'}</Button>
            <div>{props.children}</div>
        </div>
    );
};

export default DropDown;
