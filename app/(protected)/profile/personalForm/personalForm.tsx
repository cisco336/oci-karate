'use client';
import React from 'react';
// import DatePicker from 'react-datepicker';
import { FIELDS } from './fields';
import { useEnumsContext } from '@/app/providers';
import { renderField } from '../renderFieldHelper';

export const PersonalForm = (props: any) => {
  const enums = useEnumsContext();
  return (
    <section className="border-b border-slate-500 pb-8 mb-8">
      <h3 className="ml-auto mb-6 text-3xl font-semibold text-primary-400">
        Información personal
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map((field) => renderField(field, enums))}
      </div>
    </section>
  );
};
