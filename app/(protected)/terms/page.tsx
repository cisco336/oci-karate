'use client';
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, buttonColor, buttonTypes } from '@/components/shared/Button';
import parse from 'html-react-parser';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { ArticleType } from '@/@types';
import { Loader } from '@/components/shared/Loader/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Terms = () => {
  const [terms, setTerms] = React.useState<ArticleType | null>(null);

  const router = useRouter();

  const { data, status, update } = useSession();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  useEffect(() => {
    const getTerms = async () => {
      const response = await fetch('/api/terms');
      const data = await response.json();
      setTerms(data.articleSchema ?? null);
    };
    terms === null && getTerms();
  }, [terms]);

  const acceptHandler = async (values: any) => {
    if (!values.accepted || !data || !data?.id) {
      return;
    }

    const response = await fetch('/api/terms', {
      method: 'POST',
      body: JSON.stringify(data.id),
    });

    const jsonData = await response.json();
    update({ ...data, termsAccepted: jsonData.agreedTerms });
    router.push('/profile');
  };

  return terms ? (
    <Formik
      onSubmit={acceptHandler}
      initialValues={{ accepted: false }}>
      {({ values }) => {
        return (
          <Form className="flex flex-col gap-4 py-8 items-start w-full animate-fade-in max-w-[800px] [&_h4]:my-8">
            <h2 className="font-thin mb-8">
              {capitalizeFirstLetter(terms?.articleTitle ?? '')}
            </h2>
            <div>{parse(terms?.articleContent.html ?? '')}</div>
            <div className="ml-auto flex gap-4 mb-[1rem] focus-within:[&_label]:translate-y-0">
              <label
                className={''}
                htmlFor={`accepted`}>
                Acepto los terminos
              </label>
              <Field
                type={'checkbox'}
                name="accepted"
              />
            </div>
            <div className="flex gap-2 min-w-[100%] justify-end pt-[1rem]">
              <Button color={buttonColor.Text}>Cancelar</Button>
              <Button
                buttonType={buttonTypes.Submit}
                color={buttonColor.Primary}>
                Continuar
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  ) : (
    <Loader />
  );
};

export default Terms;
