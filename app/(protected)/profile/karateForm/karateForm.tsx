import { useEnumsContext } from '@/app/providers';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { BeltColors, kyuDan } from '@prisma/client';
import { ErrorMessage, Field } from 'formik';
import React from 'react';

const KarateForm = () => {
  let colors: string[] = [];
  for (var color in BeltColors) {
    colors.push(color);
  }
  let kyus: string[] = [];
  for (var kyu in kyuDan) {
    kyus.push(kyu);
  }

  const enums = useEnumsContext();
  console.log(enums);

  const fieldClassNames =
    'border border-slate-500 rounded-md py-2 px-3 bg-transparent text-gray-300';
  return (
    <div className="flex flex-col border-b border-slate-500 pb-8">
      <h4 className="ml-auto">Información de Karate</h4>
      <div className="flex flex-col gap-1 mb-[1rem]">
        <label htmlFor="cinturon">Cinturon</label>
        <Field
          className={fieldClassNames}
          type="text"
          name="cinturon"
          component="select">
          {colors.map((c) => (
            <option
              key={c}
              value={c}>
              {capitalizeFirstLetter(c)}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="cinturon"
          component="div"
        />
      </div>
      <div className="flex flex-col gap-1 mb-[1rem]">
        <label htmlFor="kyu">Kyu</label>
        <Field
          className={fieldClassNames}
          type="text"
          name="kyu"
          component="select">
          {kyus.map((c) => (
            <option
              key={c}
              value={c}>
              {c}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="kyu"
          component="div"
        />
      </div>
      <div className="flex flex-col gap-1 mb-[1rem]">
        <label htmlFor="dan">Dan</label>
        <Field
          className={fieldClassNames}
          type="text"
          name="dan"
          component="select">
          {kyus.map((c) => (
            <option
              key={c}
              value={c}>
              {c}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="dan"
          component="div"
        />
      </div>
    </div>
  );
};

export default KarateForm;
