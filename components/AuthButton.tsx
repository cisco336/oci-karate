'use client';
import Link from 'next/link';
import { Button, buttonClassType } from './shared/Button';
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
                <Button type={buttonClassType.Text}>Mi cuenta</Button>
            </Link>
            <hr />
            <Button
                type={buttonClassType.Text}
                click={() => loginOut()}>
                Cerrar sesión
            </Button>
        </DropDown>
    );

    const login = (
        <Link href="/login">
            <Button type={buttonClassType.Text}>Iniciar sesión</Button>
        </Link>
    );

    return user?.status === 'authenticated' ? dropdown : login;
}
