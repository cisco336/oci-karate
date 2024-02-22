import { Form, Field, ErrorMessage, FastFieldProps, FieldProps } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';

const PersonalForm = () => {
    let IDTypes: string[] = [];
    for (var type in IDTypes) {
        IDTypes.push(type);
    }
    return (
        <>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Nombre">Nombre</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Nombre"
                />
                <ErrorMessage
                    name="Nombre"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Apellido">Apellido</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Apellido"
                />
                <ErrorMessage
                    name="Apellido"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Cedula">Cédula / Pasaporte</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Cedula"
                />
                <ErrorMessage
                    name="Cedula"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Tipo_Cedula">Tipo Cédula</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Tipo_Cedula"
                    component="select">
                    {IDTypes.map((c) => (
                        <option
                            key={c}
                            value={c}>
                            {c}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name="Tipo_Cedula"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Cumpleaños">Cumpleaños</label>
                <Field
                    type="date"
                    name="Cumpleaños">
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
                    name="Cumpleaños"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Telefono">Teléfono</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Telefono"
                />
                <ErrorMessage
                    name="Telefono"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Menor_de_edad">Menor de edad?</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="checkbox"
                    name="Menor_de_edad"
                />
                <ErrorMessage
                    name="Menor_de_edad"
                    component="div"
                />
            </div>
            <div className="flex flex-col gap-1 mb-[1rem]">
                <label htmlFor="Bio">Bio</label>
                <Field
                    className="border border-slate-500 rounded-md py-2 px-3"
                    type="text"
                    name="Bio"
                    component="textarea"
                />
                <ErrorMessage
                    name="Bio"
                    component="div"
                />
            </div>
        </>
    );
};

export default PersonalForm;
