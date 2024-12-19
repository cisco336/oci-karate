'use client';
import { iDropdown } from '@/models/components.models';
import React, { PropsWithChildren, useState } from 'react';
import { Button } from './Button/Button';

const DropDown = (props: PropsWithChildren<iDropdown>) => {
  const {
    loading,
    disabled,
    label,
    icon,
    color,
    isOpen,
    position,
    closeOnSelect,
    children,
  } = props;
  const [open, toggleOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        extraClasses="pr-[5px]"
        click={() => toggleOpen(!open)}>
        {label || 'Dropdown'} {icon}
      </Button>
      <div
        className={`absolute
                z-3
                animate-out
                w-[100%]
                top-[120%]
                border
                border-solid
                border-1 border-sky-500
                rounded-md
                overflow-hidden
                bg-midnight-950
                shadow-xl
                ${open ? 'flex-col' : 'hidden'}
            `}>
        {children}
      </div>
    </div>
  );
};

export default DropDown;
