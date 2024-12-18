'use client';
import { signIn } from 'next-auth/react';
import { Form, Formik } from 'formik';
import { Input } from '@/components/shared/Input';
import {
  Button,
  buttonColor,
  buttonTypes,
  buttonVariants,
} from '@/components/shared/Button';
import * as Yup from 'yup';
import { auth } from '@/auth';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const submit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      console.log(response.error);
      return;
    }
    const { agreedTerms } = await (auth() as unknown as {
      agreedTerms: boolean;
    });

    if (!agreedTerms) {
      console.log('Terms not agreed');
      return;
    }
  };

  const loginForm = (
    <>
      <Input
        label="E-mail"
        name="email"
        type="text"
        placeholder="user@email.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="your password"
      />
    </>
  );

  return (
    <Formik
      onSubmit={submit}
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}>
      {({ resetForm, isValid, isSubmitting, touched }) => {
        return (
          <Form className={'w-full max-w-[600px] mt-8'}>
            {loginForm}
            <span className="flex w-full justify-end mt-8 gap-4">
              {(touched.password || touched.email) && (
                <Button
                  buttonType={buttonTypes.Button}
                  label={'Clear'}
                  color={buttonColor.Primary}
                  click={() => resetForm()}
                  loading={isSubmitting}
                  variant={buttonVariants.Outline}
                />
              )}
              <Button
                buttonType={buttonTypes.Submit}
                label={'Log in'}
                color={buttonColor.Accent}
                loading={isSubmitting}
                disabled={!isValid}
              />
            </span>
          </Form>
        );
      }}
    </Formik>
  );
}
