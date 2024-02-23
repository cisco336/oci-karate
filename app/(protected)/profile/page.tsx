'use client';
import Button from '@/components/Button';
import { basicTypes } from '@/constants/enums';
import { iUserData } from '@/models/entity.models';
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
    console.log(sessionAuth);
    const router = useRouter();
    const [userData, setUserData] = useState<iUserData | null>(null);
    const [session, setSession] = useState<any | null>(null);
    useEffect(() => {
        const getData = async () => {
            const fetching = await await fetch('/api/profile');
            const getData: { userData: iUserData; session: any } | any =
                await fetching.json();
            if (getData.session === null) {
                router.push('/login');
            }
            setSession(getData.session);
            setUserData(getData.userData);
        };
        if (!userData) {
            getData();
        }
    }, [userData]);

    const handleSubmit = async (values: any) => {
        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    firstName: userData?.firstName || '',
                    lastName: userData?.lastName || '',
                    userNationalID: userData?.userNationalID || '',
                    userNationalIDType:
                        IdType[
                            userData?.userNationalIDType
                                ? userData?.userNationalIDType
                                : IdType.CEDULA_CIUDADANIA
                        ],
                    bio: userData?.bio || '',
                    belt: BeltColors[
                        userData?.belt ? userData.belt : BeltColors.BLANCO
                    ],
                    birthDate: userData?.birthDate || null,
                    phone: userData?.phone || null,
                    isChild: userData?.isChild,
                    parents: userData?.parents || [],
                    role: Role[userData?.role ? userData.role : Role.STUDENT],
                    kyu: kyuDan[userData?.kyu ? userData.kyu : kyuDan.NA],
                    dan: kyuDan[userData?.dan ? userData.dan : kyuDan.NA],
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
