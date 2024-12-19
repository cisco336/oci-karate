'use client';
import Link from 'next/link';
import { Button, buttonColor } from './shared/Button';
import DropDown from './shared/DropDown';
import { signOut, useSession } from 'next-auth/react';
import { iSessionData } from '@/models/entity.models';
import {
  MdLogin,
  MdLogout,
  MdArrowDropDown,
  MdAccountBox,
  MdDashboard,
} from 'react-icons/md';

export default function AuthButton() {
  const { data, status } = useSession();

  const loginOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  console.log(data);

  const dropdown = (
    <DropDown
      isOpen={false}
      position={'up'}
      closeOnSelect={false}
      label={`${
        data
          ? `Hola ${(data as iSessionData)?.personalData?.firstName ?? 'karateca'}`
          : 'Loading'
      }`}
      icon={<MdArrowDropDown size={'24'} />}>
      {data && (
        <Link href={'/dashboard'}>
          <Button
            color={buttonColor.Text}
            icon={<MdDashboard size={'12'} />}>
            Mi panel
          </Button>
        </Link>
      )}
      <Link href="/profile">
        <Button
          color={buttonColor.Text}
          icon={<MdAccountBox size={'12'} />}>
          Mi cuenta
        </Button>
      </Link>
      <hr className="border-info-500" />
      <Button
        color={buttonColor.Text}
        click={() => loginOut()}
        icon={<MdLogout size={'12'} />}>
        Cerrar sesión
      </Button>
    </DropDown>
  );

  const login = (
    <Link href="/login">
      <Button color={buttonColor.Text}>
        Iniciar sesión <MdLogin size={'24'} />
      </Button>
    </Link>
  );

  return status === 'authenticated' ? dropdown : login;
}
