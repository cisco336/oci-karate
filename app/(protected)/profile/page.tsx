'use client';
import Button from '@/components/Button';
import { basicTypes } from '@/constants/enums';
import { iUserData } from '@/models/entity.models';
import { Role, BeltColors, kyuDan, IdType } from '@prisma/client';
import { Session } from '@supabase/supabase-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import PersonalForm from './personalForm';
import KarateForm from './karateForm';

export const Profile = () => {
    const [userData, setUserData] = useState<iUserData | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        const getData = async () => {
            const fetching = await await fetch('/api/profile');
            const getData: { userData: iUserData; session: Session } | any =
                await fetching.json();
            setSession(getData.session);
            setUserData(getData.userData);
        };
        if (!userData) {
            getData();
        }
    }, [userData]);
    const handleSubmit = (values: any) => {
        const post = fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: values,
        }).then((res: any) => {
            res.json().then((r: any) => console.log(r));
        });
    };
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    Nombre: userData?.firstName || '',
                    Apellido: userData?.lastName || '',
                    Cedula: userData?.userNationalID || '',
                    Tipo_Cedula:
                        IdType[
                            userData?.userNationalIDType
                                ? userData?.userNationalIDType
                                : 'CEDULA_CIUDADANIA'
                        ],
                    Bio: userData?.bio || '',
                    Cinturon:
                        BeltColors[userData?.belt ? userData.belt : 'BLANCO'],
                    Cumpleaños: userData?.birthDate || null,
                    Telefono: userData?.phone || null,
                    Menor_de_edad: userData?.isChild,
                    Padres: userData?.parents || [],
                    Rol: Role[userData?.role ? userData.role : 'STUDENT'],
                    Kyu: kyuDan[userData?.kyu ? userData.kyu : 'NA'],
                    Dan: kyuDan[userData?.dan ? userData.dan : 'NA'],
                }}>
                {({ isSubmitting }) => (
                    <Form className="w-[80%] py-[2rem]">
                        <PersonalForm />
                        <KarateForm />
                        <Button
                            type={basicTypes.Primary}
                            buttonType="submit"
                            disabled={false}>
                            Guardar cambios
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Profile;
