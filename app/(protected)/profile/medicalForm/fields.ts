import { FieldDataType } from '../types';

export const FIELDS: FieldDataType[] = [
  {
    name: 'bloodType',
    label: 'Tipo de sangre',
    type: 'select',
    enumName: 'BloodTypes',
  },
  {
    name: 'eps',
    label: 'EPS',
    type: 'select',
    enumName: 'Eps',
  },
  {
    name: 'prepaidMedicine',
    label: 'Medicina prepagada',
    type: 'select',
    enumName: 'PMedicine',
  },
  {
    name: 'specialConditions',
    label: 'Condiciones especiales',
    type: 'text',
  },
  {
    name: 'emergencyContactName',
    label: 'Nombre de contacto de emergencia',
    type: 'text',
  },
  {
    name: 'emergencyContactPhone',
    label: 'Teléfono de contacto de emergencia',
    type: 'text',
  },
];
