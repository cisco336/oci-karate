import { basicTypes } from '@/constants/enums';

export interface iButton {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    type?: basicTypes;
    buttonType?: 'button' | 'submit' | 'reset' | undefined;
    callback?: () => any;
}

export interface iDropdown extends iButton {
    isOpen: boolean;
    position: 'up' | 'down' | 'left' | 'rigth';
    closeOnSelect: boolean;
}

export interface iCheckBox {
    id?: string;
    checked?: boolean;
    name?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number | readonly string[] | undefined;
    callback?: () => any;
}
