'use client';
import { iSessionData } from '@/models/entity.models';
import { Formik, Form } from 'formik';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { PersonalForm } from './personalForm/personalForm';
import KarateForm from './karateForm/karateForm';
import { useSession } from 'next-auth/react';
import {
  Button,
  buttonColor,
  buttonTypes,
  buttonVariants,
} from '@/components/shared/Button';
import { Loader } from '@/components/shared/Loader/Loader';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { checkCinturon } from './helpers/checkCinturon';
import { MedicalForm } from './medicalForm/medicalForm';

export const Profile = () => {
  const { data, status, update } = useSession();

  const handleSubmit = async (values: any) => {
    const {
      birthday,
      idNumber,
      idType,
      lastNames,
      names,
      phone,
      cinturon,
      dan,
      kyu,
    } = values;
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          id: (data as iSessionData)?.id,
          karateId: (data as iSessionData)?.karateData?.id,
          personalDataId: (data as iSessionData)?.personalData?.id,
          medicalDataId: (data as iSessionData)?.medicalData?.id,
          kyu: kyu.toUpperCase(),
          dan: dan.toUpperCase(),
          idType: idType.toUpperCase().split(' ').join('_'),
        }),
      });
      await update({
        ...data,
        personalData: {
          ...data?.personalData,
          birthday,
          idNumber,
          idType,
          lastNames,
          names,
          phone,
        },
        karateData: {
          kyu,
          dan,
          cinturon,
        },
      });
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  if (!data || (status as 'loading' | 'authneticated') === 'loading') {
    return <Loader />;
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        ...(data as iSessionData)?.personalData,
        idType: (data as iSessionData)?.personalData?.idType,
        ...(data as iSessionData)?.karateData,
        cinturon: (data as iSessionData)?.karateData?.cinturon,
        isChild: (data as iSessionData)?.isChild,
        parents: (data as iSessionData)?.parents ?? [],
        kyu: (data as iSessionData)?.karateData?.kyu,
        dan: (data as iSessionData)?.karateData?.dan ?? 'NA',
      }}>
      {(formProps) => {
        const updatedValues = checkCinturon(formProps.values);
        formProps.values = updatedValues as typeof formProps.values;
        return (
          <Form className="max-w-[800px] py-[2rem] text-gray-900 flex flex-col gap-6 [&_label]:text-gray-300 [&_label]:font-thin">
            <PersonalForm {...formProps.values} />
            <KarateForm {...formProps.values} />
            <MedicalForm {...formProps.values} />
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
