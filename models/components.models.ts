import { iButton } from '@/components/shared/Button/iButton';
import { basicTypes } from '@/constants/enums';

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
