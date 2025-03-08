import { useEnumsContext } from '@/app/providers';
import React from 'react';
import { FIELDS } from './fields';
import { renderField } from '../renderFieldHelper';

export const MedicalForm = (props: any) => {
  const enums = useEnumsContext();
  return (
    <div className="flex flex-col border-b border-slate-500 pb-8">
      <h4 className="ml-auto">Información médica</h4>
      <div>{FIELDS.map((field) => renderField(field, enums))}</div>
    </div>
  );
};
