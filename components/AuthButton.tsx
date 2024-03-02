'use client';
import Link from 'next/link';
import Button from './Button';
import { basicTypes } from '@/constants/enums';
import DropDown from './DropDown';
import { signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
    const user = useSession();

    const loginOut = () => {
        signOut({ redirect: true, callbackUrl: '/' });
    };

    const dropdown = (
        <DropDown
            isOpen={false}
            position={'up'}
            closeOnSelect={false}
            label={`Hola ${user?.data?.user?.personalData?.firstName}`}>
            <Link href="/profile">
                <Button type={basicTypes.Text}>Mi cuenta</Button>
            </Link>
            <hr />
            <Button
                type={basicTypes.Text}
                callback={() => loginOut()}>
                Cerrar sesión
            </Button>
        </DropDown>
    );

    const login = (
        <Link href="/login">
            <Button type={basicTypes.Text}>Iniciar sesión</Button>
        </Link>
    );

    return user?.status === 'authenticated' ? dropdown : login;
}
