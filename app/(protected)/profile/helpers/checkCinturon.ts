import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { BeltColors, kyuDan } from '@prisma/client';

export const checkCinturon = (values: object) => {
  switch (values.cinturon) {
    case 'AMARILLO':
      values.kyu = capitalizeFirstLetter('OCTAVO');
      break;
    case 'NARANJA':
      values.kyu = capitalizeFirstLetter('SEPTIMO');
      break;
    case 'AZUL':
      values.kyu = capitalizeFirstLetter('SEXTO');
      break;
    case 'VERDE':
      values.kyu = capitalizeFirstLetter('QUINTO');
      break;
    case 'VIOLETA':
      values.kyu = capitalizeFirstLetter('CUARTO');
      break;
    case 'MARRON3' as unknown as BeltColors:
      values.kyu = capitalizeFirstLetter('TERCERO');
      break;
    case 'MARRON2' as unknown as BeltColors:
      values.kyu = capitalizeFirstLetter('SEGUNDO');
      break;
    case 'MARRON1' as unknown as BeltColors:
      values.kyu = capitalizeFirstLetter('PRIMERO');
      break;
    case 'NEGRO':
      values.kyu = capitalizeFirstLetter('NA');
      values.dan =
        !formProps?.values?.dan || values.dan === 'NA'
          ? (capitalizeFirstLetter('PRIMERO') as unknown as kyuDan)
          : values.dan;
      break;
    case 'BLANCO':
    default:
      values.kyu = capitalizeFirstLetter('NOVENO');
      break;
  }
  return values;
};
