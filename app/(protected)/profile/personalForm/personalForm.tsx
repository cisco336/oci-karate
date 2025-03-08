'use client';
import React from 'react';
// import DatePicker from 'react-datepicker';
import { FIELDS } from './fields';
import { useEnumsContext } from '@/app/providers';
import { renderField } from '../renderFieldHelper';

export const PersonalForm = (props: any) => {
  const enums = useEnumsContext();
  return (
    <div className="flex flex-col border-b border-slate-500 pb-8">
      <h3 className="ml-auto">Información personal</h3>
      <div>{FIELDS.map((field) => renderField(field, enums))}</div>
    </div>
  );
};
