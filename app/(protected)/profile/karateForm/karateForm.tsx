import { useEnumsContext } from '@/app/providers';
import React from 'react';
import { FIELDS } from './fields';
import { renderField } from '../renderFieldHelper';

const KarateForm = (props: any) => {
  const enums = useEnumsContext();
  const filteredFields =
    props.cinturon !== 'NEGRO'
      ? FIELDS.filter((field) => field.name !== 'dan')
      : [...FIELDS];

  return (
    <div className="flex flex-col border-b border-slate-500 pb-8">
      <h4 className="ml-auto">Información de Karate</h4>
      <div>{filteredFields.map((field) => renderField(field, enums))}</div>
    </div>
  );
};

export default KarateForm;
