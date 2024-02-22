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
                <label htmlFor="Cinturon">Cinturon</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Cinturon"
                    component="select">
                    {colors.map((c) => (
                        <option
                            key={c}
                            value={c}>
                            {c}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name="Cinturon"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Kyu">Kyu</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Kyu"
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
                    name="Kyu"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Dan">Dan</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Dan"
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
                    name="Dan"
                    component="div"
                />
            </div>
        </>
    );
};

export default KarateForm;
