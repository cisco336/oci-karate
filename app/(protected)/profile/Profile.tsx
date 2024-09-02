'use client';
import { iSessionData } from '@/models/entity.models';
import { Role, BeltColors, kyuDan, IdType } from '@prisma/client';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import PersonalForm from './personalForm';
import KarateForm from './karateForm';
import { useSession } from 'next-auth/react';
import {
    Button,
    buttonColor,
    buttonTypes,
    buttonVariants,
} from '@/components/shared/Button';
import { Loader } from '@/components/shared/Loader/Loader';
import { User } from 'next-auth';

export const Profile = () => {
    const sessionAuth = useSession();
    console.log('useSession', sessionAuth);
    const [user, setUser] = useState<iSessionData | null>(null);
    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
        setSession(sessionAuth);
        if (session?.data?.user != null) {
            setUser(session.data.user);
        }
    }, [setUser, sessionAuth?.status, session?.data?.user]);

    const handleSubmit = async (values: any) => {
        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: session?.data?.user?.id,
                karateId: session?.data?.user?.karateData?.id,
                personalDataId: session?.data?.user?.personalData?.id,
                ...values,
            }),
        });
        const parsedResponse = await response.json();
        await sessionAuth.update({ ...sessionAuth, user: { ...values } });
    };

    if (!sessionAuth || sessionAuth?.status === 'loading' || !user) {
        return <Loader />;
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ ...user.personalData }}>
            <PersonalForm />
        </Formik>
    );

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    firstName: user?.personalData?.firstName,
                    lastName: user?.personalData?.lastName
                        ? user?.personalData?.lastName
                        : '',
                    motherFamilyName: user?.personalData?.motherFamilyName,
                    secondName: user?.personalData?.secondName,
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
                        <Form className="max-w-[1200px] py-[2rem] text-gray-900 flex flex-col gap-6 [&_label]:text-gray-300 [&_label]:font-thin">
                            <div className="grid md:grid-cols-2 gap-4">
                                <h2 className="col-span-full text-gray-300 text-4xl font-thin">
                                    Información personal
                                </h2>
                                <PersonalForm />
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <h2 className="col-span-full text-gray-300 text-4xl font-thin">
                                    Información de Karate
                                </h2>
                                <KarateForm />
                            </div>
                            <span className="flex justify-end">
                                <Button
                                    color={buttonColor.Accent}
                                    variant={buttonVariants.Solid}
                                    buttonType={buttonTypes.Submit}
                                    disabled={
                                        !formProps.isValid || !formProps.dirty
                                    }>
                                    Guardar cambios
                                </Button>
                            </span>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Profile;
