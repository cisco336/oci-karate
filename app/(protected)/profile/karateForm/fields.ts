import { FieldDataType } from '../types';

export const FIELDS: FieldDataType[] = [
  {
    name: 'cinturon',
    label: 'Cinturón',
    type: 'select',
    enumName: 'Cinturon',
  },
  {
    name: 'kyu',
    label: 'Kyu',
    type: 'text',
    disabled: true,
  },
  {
    name: 'dan',
    label: 'Dan',
    type: 'select',
    enumName: 'KyuDan',
  },
];
