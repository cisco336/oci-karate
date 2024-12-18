import { z } from 'zod';
import { buttonColor, buttonVariants, buttonTypes } from './';

export const iButton = z.object({
  loading: z.boolean().optional(),
  disabled: z.boolean().optional(),
  label: z.string().optional(),
  icon: z.string().optional(),
  color: z.nativeEnum(buttonColor).optional(),
  variant: z.nativeEnum(buttonVariants).optional(),
  buttonType: z.nativeEnum(buttonTypes).optional(),
  click: z.function().optional(),
  extraClasses: z.string().optional(),
});
