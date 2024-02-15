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
