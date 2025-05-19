import { useEnumsContext } from '@/app/providers';
import React from 'react';
import { FIELDS } from './fields';
import { renderField } from '../renderFieldHelper';

export const MedicalForm = (props: any) => {
  const enums = useEnumsContext();
  return (
    <section className="border-b border-slate-500 pb-8 mb-8">
      <h4 className="ml-auto mb-6 text-2xl font-semibold text-info-400">
        Información médica
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map((field) => renderField(field, enums))}
      </div>
    </section>
  );
};
