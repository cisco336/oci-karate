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
                <label htmlFor="userNationalID">Cédula / Pasaporte</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="userNationalID"
                />
                <ErrorMessage
                    name="userNationalID"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="userNationalIDType">Tipo Cédula</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="userNationalIDType"
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
                    name="userNationalIDType"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="birthDate">Cumpleaños</label>
                <Field
                    type="date"
                    name="birthDate">
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
                    name="birthDate"
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
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="isChild">Menor de edad?</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="checkbox"
                    name="isChild"
                />
                <ErrorMessage
                    name="isChild"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
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
