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
import { useState } from 'react';
import path from '../img/path.jpg';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const submit = async (
    values: {
      email: string;
      password: string;
      names: string;
      lastNames: string;
      birthday: string;
    },
    {
      setErrors,
      resetForm,
    }: {
      setErrors: (errors: { [key: string]: string }) => void;
      resetForm: () => void;
    },
  ) => {
    const response = await signIn('credentials', {
      ...values,
      register,
      redirect: false,
    });
    if (response?.error) {
      console.log('error: ', response.error);

      if (
        response.error === 'Configuration' ||
        response.error === 'CredentialsSignin'
      ) {
        setErrors({ password: 'El usuario o la contraseña son incorrectas.' });
      }

      if (response.error === 'AccessDenied') {
        setErrors({
          email:
            'Ya existe una cuenta con ese email, por favor intenta iniciar sessión o comunicate con el administrador del sitio web.',
        });
      }
      return;
    }

    if (response?.ok) {
      resetForm();
      router.push('/dashboard');
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
        label="Nombres"
        name="names"
        type="text"
        placeholder="Tu nombre(s)"
      />
      <Input
        label="Apellidos"
        name="lastNames"
        type="text"
        placeholder="Tu apellido(s)"
      />
      <Input
        label="Fecha de nacimiento"
        name="birthday"
        type="date"
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
          initialValues={{
            email: '',
            password: '',
            names: '',
            lastNames: '',
            birthday: '',
          }}
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
                      click={() => {
                        setRegister(!register);
                        resetForm();
                      }}
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
