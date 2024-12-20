import { z } from 'zod';
import { iButton } from '@/components/shared/Button';

export const zDropdown = iButton.extend({
  isOpen: z.boolean(),
  position: z.enum(['up', 'down', 'left', 'right']),
  closeOnSelect: z.boolean(),
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
  callback: z.function().optional(),
});

export type iCheckBox = z.infer<typeof zCheckBox>;
export type iDropdown = z.infer<typeof zDropdown>;
