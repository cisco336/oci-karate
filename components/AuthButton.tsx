'use client';
import Link from 'next/link';
import { Button, basicTypes } from './shared/Button/Button';
import DropDown from './shared/DropDown';
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
