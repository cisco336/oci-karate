'use client';
import { iSessionData } from '@/models/entity.models';
import { Role, BeltColors, kyuDan, IdType } from '@prisma/client';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
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

export const Profile = () => {
    const sessionAuth = useSession();
    const [session, setSession] = useState<any | null>(null);

    const { data, status, update } = sessionAuth;

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

    console.log(sessionAuth?.data);

    if (!data || (status as 'loading' | 'authneticated') === 'loading') {
        return <Loader />;
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                ...(data as iSessionData)?.personalData,
                ...(data as iSessionData)?.karateData,
                isChild: (data as iSessionData)?.isChild,
                parents: (data as iSessionData)?.parents ?? [],
                role: Role[(data as iSessionData)?.role[0]] ?? Role.STUDENT,
                kyu: kyuDan[
                    (data as iSessionData)?.karateData?.kyu ?? kyuDan.NA
                ],
                dan: kyuDan[
                    (data as iSessionData)?.karateData?.dan ?? kyuDan.NA
                ],
            }}>
            <>
                <PersonalForm />
                <KarateForm />
            </>
        </Formik>
    );
};

export default Profile;
