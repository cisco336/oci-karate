'use client';
import { iDropdown } from '@/models/components.models';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';

const DropDown = (
  props: PropsWithChildren<iDropdown & { setIsOpen?: (open: boolean) => void }>,
) => {
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
    setIsOpen,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setIsOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen && setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className="relative"
      ref={ref}>
      <Button
        extraClasses="pr-[5px]"
        click={() => (setIsOpen ? setIsOpen(!isOpen) : undefined)}>
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
                ${isOpen ? 'flex-col' : 'hidden'}
            `}>
        {children}
      </div>
    </div>
  );
};

export default DropDown;
