'use client';
import Link from 'next/link';
import { Button, buttonColor } from './shared/Button';
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
                <Button color={buttonColor.Text}>Mi cuenta</Button>
            </Link>
            <hr />
            <Button
                type={buttonColor.Text}
                click={() => loginOut()}>
                Cerrar sesión
            </Button>
        </DropDown>
    );

    const login = (
        <Link href="/login">
            <Button color={buttonColor.Text}>Iniciar sesión</Button>
        </Link>
    );

    return user?.status === 'authenticated' ? dropdown : login;
}
