import { basicTypes } from '@/constants/enums';

export interface iButton {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    type?: basicTypes;
    callback?: () => any;
}
