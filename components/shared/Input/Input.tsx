import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { BeltColors } from '@prisma/client';
import { Field, ErrorMessage } from 'formik';
import React from 'react';
import { z } from 'zod';

import { tv } from 'tailwind-variants';
import { buttonColor, buttonVariants } from '../Button';

export const inputClass = tv({
    base: 'border border-slate-500 rounded-md py-2 px-3',
    variants: {
        color: {
            primary: 'border-primary-500 bg-primary-500',
            secondary: 'border-secondary-500 bg-secondary-500',
            info: 'border-info-500 bg-info-500 text-gray-800',
            success: 'border-success-700 bg-success-700',
            warning: 'border-warning-500 bg-warning-500 text-gray-800',
            danger: 'border-danger-500 bg-danger-500',
            text: 'border-transparent text bg-transparent text-gray-50',
            accent: 'border-accent-500 bg-accent-500',
        },
        variant: {
            solid: 'border-opacity-0',
            outline:
                'bg-opacity-0 border border-opacity-100 hover:bg-opacity-70 active:bg-opacity-20 text-gray-50',
            ghost: 'bg-opacity-20 text-opacity-90 hover:bg-opacity-60 active:bg-opacity-70',
            link: 'bg-opacity-0 text-opacity-80 hover:text-opacity-100 active:text-opacity-100',
        },
    },
    defaultVariants: {
        color: 'primary',
        variant: 'outline',
    },
});

export const zInput = z.object({
    name: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    type: z.string(),
    color: z.nativeEnum(buttonColor).optional(),
    variant: z.nativeEnum(buttonVariants).optional(),
    options: z.array(z.string()).optional(),
});

export type InputProps = z.infer<typeof zInput>;

export const Input = ({
    name,
    label = 'Label',
    placeholder = 'Placeholder',
    type,
    options,
    variant = buttonVariants.Outline,
    color = buttonColor.Info,
}: InputProps) => {
    return (
        <div className="flex flex-col gap-1 mb-[1rem]">
            <label htmlFor="cinturon">{label}</label>
            <input
                className={`${inputClass({ color, variant })}`}
                placeholder={placeholder}></input>
            {/* <ErrorMessage
                name="cinturon"
                component="div"
            /> */}
        </div>
    );
};
