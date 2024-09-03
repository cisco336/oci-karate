'use client';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { IdType } from '@prisma/client';
import { Field, ErrorMessage, FieldProps } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';

const PersonalForm = () => {
    let IDTypes: string[] = [];
    for (var type in IdType) {
        IDTypes.push(type);
    }
    return (
        <>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="firstName">Nombre</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="firstName"
                />
                <ErrorMessage
                    name="firstName"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="lastName">Apellido</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="lastName"
                />
                <ErrorMessage
                    name="lastName"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="idNumber">Cédula / Pasaporte</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="idNumber"
                />
                <ErrorMessage
                    name="idNumber"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="idType">Tipo Cédula</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="idType"
                    component="select">
                    {IDTypes.map((c) => (
                        <option
                            key={c}
                            value={c}>
                            {capitalizeFirstLetter(
                                c.replaceAll('_', ' ').toString()
                            )}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name="idType"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="birthDay">Cumpleaños</label>
                <Field
                    type="date"
                    name="birthDay">
                    {(props: FieldProps) => {
                        return (
                            <DatePicker
                                className="border border-slate-500 rounded-md py-2 px-3 min-w-[100%]"
                                id="date"
                                {...props.field}
                                selected={props.field.value}
                                onChange={(date) =>
                                    props.form.setFieldValue(
                                        props.field.name,
                                        date
                                    )
                                }
                            />
                        );
                    }}
                </Field>
                <ErrorMessage
                    name="birthDay"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="phone">Teléfono</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="phone"
                />
                <ErrorMessage
                    name="phone"
                    component="div"
                />
            </div>
            <div className="flex flex-row gap-4 mb-[1rem]">
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="checkbox"
                    name="isChild"
                />
                <label htmlFor="isChild">Menor de edad?</label>
                <ErrorMessage
                    name="isChild"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem] col-span-full">
                <label htmlFor="bio">Bio</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="bio"
                    component="textarea"
                />
                <ErrorMessage
                    name="bio"
                    component="div"
                />
            </div>
        </>
    );
};

export default PersonalForm;
