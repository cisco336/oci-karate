import { FieldDataType } from '../types';

export const FIELDS: FieldDataType[] = [
  {
    name: 'names',
    label: 'Nombres',
    type: 'text',
  },
  {
    name: 'lastNames',
    label: 'Apellidos',
    type: 'text',
  },
  {
    name: 'idType',
    label: 'Tipo de identificación',
    type: 'select',
    enumName: 'IdType',
  },
  {
    name: 'idNumber',
    label: 'Número de identificación',
    type: 'text',
  },
  {
    name: 'birthday',
    label: 'Cumpleaños',
    type: 'date',
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'text',
  },
];
