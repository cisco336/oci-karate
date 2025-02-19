import { PropsWithChildren } from 'react';
import { Client } from './enumsProviderClient';
import { getData } from '@/services/hygraph.service';
import { GetEnumsValuesType, getEnumValues } from '@/services/queries';

const getEnums = async () => {
  const ENUMS_NAMES = [
    'BloodTypes',
    'Categories',
    'Cinturon',
    'IdType',
    'Kata',
    'KyuDan',
    'Role',
    'Tags',
  ];
  const enums = await Promise.allSettled(
    ENUMS_NAMES.map((name) => {
      return getData<GetEnumsValuesType>(getEnumValues, { name });
    }).map((promise) =>
      promise.then(({ __type }: GetEnumsValuesType) => {
        return {
          name: __type.name,
          values: __type.enumValues.map((value: any) => value.name),
        };
      }),
    ),
  );

  const parsedEnums = enums.map(
    (e) =>
      (e as unknown as { status: string; value: GetEnumsValuesType }).value,
  );

  console.log('parsedEnums:', parsedEnums);

  return parsedEnums;
};

export const EnumsProvider = async ({ children }: PropsWithChildren) => {
  const enums = await getEnums();

  return <Client enums={enums}>{children}</Client>;
};
