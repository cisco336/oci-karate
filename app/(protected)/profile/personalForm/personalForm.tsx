'use client';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { Field, ErrorMessage, FieldProps } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import { FIELDS } from './fields';
import { useEnumsContext } from '@/app/providers';

const PersonalForm = () => {
  const { IdType } = useEnumsContext();

  return (
    <>
      {FIELDS.map((field) => (
        <div
          key={field.name}
          className="flex flex-col gap-1 mb-[1rem]">
          <label htmlFor={field.name}>{field.label}</label>
          {field.name !== 'idType' ? (
            <Field
              className="border border-slate-500 rounded-md py-2 px-3"
              type={field.type}
              name={field.name}
            />
          ) : (
            <Field
              className="border border-slate-500 rounded-md py-2 px-3"
              type={field.type}
              name={field.name}
              component="select">
              {IdType.map((c) => (
                <option
                  key={c}
                  value={c}>
                  {capitalizeFirstLetter(c.replaceAll('_', ' ').toString())}
                </option>
              ))}
            </Field>
          )}
          <ErrorMessage
            name={field.name}
            component="div"
          />
        </div>
      ))}
    </>
  );
};

export default PersonalForm;
