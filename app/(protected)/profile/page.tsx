'use client';
import Button from '@/components/Button';
import { basicTypes } from '@/constants/enums';
import { iSessionData } from '@/models/entity.models';
import { Role, BeltColors, kyuDan, IdType } from '@prisma/client';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import PersonalForm from './personalForm';
import KarateForm from './karateForm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const Profile = () => {
    const sessionAuth = useSession();
    const router = useRouter();
    const [user, setUser] = useState<iSessionData | null>(null);
    const [session, setSession] = useState<any | null>(null);
    useEffect(() => {
        setSession(sessionAuth);
        if (session?.data != null) {
            setUser(session.data);
        }
    }, [user, sessionAuth]);

    const handleSubmit = async (values: any) => {
        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ id: session?.data?.id, ...values }),
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse);
    };

    if (!sessionAuth || sessionAuth?.status === 'loading' || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    firstName: user?.personalData?.firstName,
                    lastName: user?.personalData?.lastName
                        ? user?.personalData?.lastName
                        : '',
                    userNationalID: user?.personalData?.idNumber
                        ? user?.personalData?.idNumber
                        : '',
                    userNationalIDType:
                        IdType[
                            user?.personalData?.idType
                                ? user?.personalData?.idType
                                : IdType.CEDULA_CIUDADANIA
                        ],
                    bio: user?.personalData?.bio ? user?.personalData?.bio : '',
                    belt: BeltColors[
                        user?.karateData?.cinturon
                            ? user.karateData.cinturon
                            : BeltColors.BLANCO
                    ],
                    birthDate: user?.personalData?.birthDay
                        ? user?.personalData?.birthDay
                        : '',
                    phone: user?.personalData?.phone
                        ? user?.personalData?.phone
                        : '',
                    isChild: user?.isChild,
                    parents: user?.parents || [],
                    role: Role[user?.role ? user.role[0] : Role.STUDENT],
                    kyu: kyuDan[
                        user?.karateData?.kyu ? user.karateData.kyu : kyuDan.NA
                    ],
                    dan: kyuDan[
                        user?.karateData?.dan ? user.karateData.dan : kyuDan.NA
                    ],
                }}>
                {(formProps) => {
                    return (
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
                    );
                }}
            </Formik>
        </>
    );
};

export default Profile;
