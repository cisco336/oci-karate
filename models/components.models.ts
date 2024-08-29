import { z } from 'zod';
import { iButton } from '@/components/shared/Button';

const iDropdown = iButton.extend({
    isOpen: z.boolean(),
    position: z.enum(['up', 'down', 'left', 'right']),
    closeOnSelect: z.boolean(),
});

export const iCheckBox = z.object({
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
