'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

import BackButton from '@/components/BackButton';
import { Form, Formik } from 'formik';
import { Input } from '@/components/shared/Input';
import { Button, buttonColor, buttonTypes } from '@/components/shared/Button';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const submit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    console.log('##########', values);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
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
      initialValues={{ email: '', password: '' }}>
      {(formProps) => {
        console.log('formProps:', formProps);
        return (
          <Form className={'w-full max-w-[600px] mt-8'}>
            {loginForm}
            <span className="flex w-full justify-end mt-8">
              <Button
                buttonType={buttonTypes.Submit}
                label={'Log in'}
                color={buttonColor.Accent}
                loading={formProps.isSubmitting}
              />
            </span>
          </Form>
        );
      }}
    </Formik>
  );
}
