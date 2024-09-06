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
  return (
    <>
      <div className="flex flex-col gap-1 mb-[1rem]">
        <label htmlFor="cinturon">Cinturon</label>
        <Field
          className="border border-slate-500 rounded-md py-2 px-3"
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
          className="border border-slate-500 rounded-md py-2 px-3"
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
          className="border border-slate-500 rounded-md py-2 px-3"
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
    </>
  );
};

export default KarateForm;
