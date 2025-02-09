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
      default:
        'bg-slate-500 bg-opacity-0 border-slate-500 text-gray-50 hover:shadow-gray active:shadow-gray active:border-slate-200 hover:border-slate-200',
      primary:
        'bg-primary-500 bg-opacity-0 border-primary-500 text-gray-50 hover:shadow-primary active:shadow-primary active:border-primary-200 hover:border-primary-200',
      secondary:
        'bg-secondary-500 bg-opacity-0 border-secondary-500 text-gray-50 hover:shadow-secondary active:shadow-secondary active:border-secondary-200 hover:border-secondary-200',
      info: 'bg-info-500 bg-opacity-0 border-info-500 text-gray-50 hover:shadow-info active:shadow-info active:border-info-200 hover:border-info-200',
      success:
        'bg-success-700 bg-opacity-0 border-success-700 text-gray-50 hover:shadow-success active:shadow-success active:border-success-500 hover:border-success-500',
      warning:
        'bg-warning-500 bg-opacity-0 border-warning-500 text-gray-50 hover:shadow-warning active:shadow-warning active:border-warning-200 hover:border-warning-200',
      danger:
        'bg-danger-500 bg-opacity-0 border-danger-500 text-gray-50 hover:shadow-danger active:shadow-danger active:border-danger-200 hover:border-danger-200',
      accent:
        'bg-accent-500 bg-opacity-0 border-accent-500 text-gray-50 hover:shadow-accent active:shadow-accent active:border-accent-200 hover:border-accent-200',
    },
    variant: {
      outline: '',
      underline:
        'border-l-0 border-r-0 border-t-0 border-b-2 rounded-none hover:shadow-none active:shadow-none',
      ghost:
        'border-0 bg-opacity-[.3] text-gray-50 hover:bg-opacity-[.8] text-white',
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
  id: z.string().optional(),
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
  console.log(variant, color);

  const labelClass = () => {
    return variant === inputVariants.Underline
      ? 'transform translate-y-10 transition-transform duration-300 text-gray-50'
      : '';
  };

  return (
    <div className="flex flex-col gap-1 mb-[1rem] focus-within:[&_label]:translate-y-0">
      <label
        className={labelClass()}
        htmlFor={`${label}`}>
        {label}
      </label>
      <Field
        name={name}
        className={`${inputClass({ color, variant })}`}
        placeholder={`${variant !== inputVariants.Underline ? placeholder : ''}`}
        type={type}>
        {/* {options} TODO spread and style options */}
      </Field>
      <ErrorMessage
        className="text-red-400 text-sm px-2"
        name={name ?? ''}
        component={'div'}
      />
    </div>
  );
};
