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

  const { data, status, update } = sessionAuth;

  const handleSubmit = async (values: any) => {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: (data as iSessionData)?.id,
        karateId: (data as iSessionData)?.karateData?.id,
        personalDataId: (data as iSessionData)?.personalData?.id,
        ...values,
      }),
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    await update({ ...sessionAuth, user: { ...values } });
  };

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
        role: Role[(data as iSessionData)?.role?.[0]] ?? Role.STUDENT,
        kyu: kyuDan[(data as iSessionData)?.karateData?.kyu ?? kyuDan.NA],
        dan: kyuDan[(data as iSessionData)?.karateData?.dan ?? kyuDan.NA],
      }}>
      {(formProps) => {
        return (
          <Form className="max-w-[1200px] py-[2rem] text-gray-900 flex flex-col gap-6 [&_label]:text-gray-300 [&_label]:font-thin">
            <div className="grid md:grid-cols-2 gap-4">
              <h2 className="col-span-full ">Información personal</h2>
              <PersonalForm />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <h2 className="col-span-full ">Información de Karate</h2>
              <KarateForm />
            </div>
            <span className="flex justify-end">
              <Button
                color={buttonColor.Accent}
                variant={buttonVariants.Solid}
                buttonType={buttonTypes.Submit}
                disabled={!formProps.isValid || !formProps.dirty}>
                Guardar cambios
              </Button>
            </span>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Profile;
