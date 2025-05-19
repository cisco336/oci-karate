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
    <section className="border-b border-slate-500 pb-8 mb-8">
      <h4 className="ml-auto mb-6 text-2xl font-semibold text-accent-400">
        Información de Karate
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFields.map((field) => renderField(field, enums))}
      </div>
    </section>
  );
};

export default KarateForm;
