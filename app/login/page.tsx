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
import { useState } from 'react';
import path from '../img/path.jpg';

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

    console.log('RESPONSE: ', response);
    if (response?.error) {
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

  const [register, setRegister] = useState(false);

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
        placeholder="contraseña"
      />
    </>
  );

  const registerForm = (
    <>
      <Input
        label="Primer nombre"
        name="firstName"
        type="text"
        placeholder="Tu primer nombre"
      />
      <Input
        label="Segundo nombre"
        name="secondName"
        type="text"
        placeholder="Tu segundo nombre"
      />
      <Input
        label="Primer apellido"
        name="lastName"
        type="text"
        placeholder="Tu primer apellido"
      />
      <Input
        label="Segundo apellido"
        name="motherFamilyName"
        type="text"
        placeholder="Tu segundo apellido"
      />
    </>
  );

  return (
    <>
      <div className="flex justify-center items-center h-screen gap-4 z-[1]">
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
              <div className="bg-black bg-opacity-90 p-8 rounded-lg border border-gray-800">
                <Form className={'w-full max-w-[600px] mt-8'}>
                  <div className="flex justify-start items-center gap-4 pb-4">
                    <h3>{register ? 'Registrate ó' : 'Inicia sesión ó'}</h3>
                    <Button
                      buttonType={buttonTypes.Button}
                      label={register ? 'inicia sesión' : 'registrate'}
                      color={buttonColor.Accent}
                      click={() => setRegister(!register)}
                      loading={isSubmitting}
                      variant={buttonVariants.Solid}
                    />
                  </div>
                  {register && registerForm}
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
              </div>
            );
          }}
        </Formik>
      </div>
      <img
        src={path.src}
        className="absolute h-screen object-cover w-screen z-[0]"
      />
    </>
  );
}
