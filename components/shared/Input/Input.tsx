import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { BeltColors } from '@prisma/client';
import { Field, ErrorMessage } from 'formik';
import React from 'react';
import { z } from 'zod';

import { tv } from 'tailwind-variants';
import { inputColor, inputVariants } from './enums';

export const inputClass = tv({
  base: 'border border-slate-500 rounded-md py-2 px-3 text-gray-800 bg-transparent',
  variants: {
    color: {
      default: 'border-slate-500 text-gray-50',
      primary: 'border-primary-500 text-gray-50',
      secondary: 'border-secondary-500 text-gray-50',
      info: 'border-info-500 text-gray-50',
      success: 'border-success-700 text-gray-50',
      warning: 'border-warning-500 text-gray-50',
      danger: 'border-danger-500 text-gray-50',
      accent: 'border-accent-500 text-gray-50',
    },
    variant: {
      outline: '',
      underline: '',
      ghost: '',
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
  color: z.nativeEnum(inputColor).optional(),
  variant: z.nativeEnum(inputVariants).optional(),
  options: z.array(z.string()).optional(),
});

export type InputProps = z.infer<typeof zInput>;

export const Input = ({
  name,
  label = 'Label',
  placeholder = 'Placeholder',
  type,
  options,
  variant,
  color,
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
