import { z } from 'zod';
import { iButton } from '@/components/shared/Button';
import { ReactElement } from 'react';

export const zDropdown = iButton.extend({
  isOpen: z.boolean(),
  position: z.enum(['up', 'down', 'left', 'right']),
  closeOnSelect: z.function().optional(),
  icon: z.custom<ReactElement>().optional(),
});

export const zCheckBox = z.object({
  id: z.string().optional(),
  checked: z.boolean().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  placeholder: z.string().optional(),
  disabled: z.boolean().optional(),
  value: z
    .union([z.string(), z.number(), z.array(z.string()).nonempty()])
    .optional(),
  callback: z.function().args(z.boolean()).optional(),
});

export type iCheckBox = z.infer<typeof zCheckBox>;
export type iDropdown = z.infer<typeof zDropdown>;
