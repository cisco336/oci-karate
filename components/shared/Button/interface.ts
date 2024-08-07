import { buttonColor, buttonVariants, buttonTypes } from './';

export interface iButton {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    color?: buttonColor;
    variant?: buttonVariants;
    buttonType?: buttonTypes;
    click?: () => any;
}
