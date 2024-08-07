import { buttonClassType, buttonVariants, buttonTypes } from './';

export interface iButton {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    type?: buttonClassType;
    variant?: buttonVariants;
    buttonType?: buttonTypes;
    click?: () => any;
}
