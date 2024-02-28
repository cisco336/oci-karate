import Link from 'next/link';
import Button from './Button';
import { basicTypes } from '@/constants/enums';
import { checkSessionIsValid, signOut } from '@/services/auth.service';
import DropDown from './DropDown';
import { auth } from '@/auth';

export default async function AuthButton() {
    const session = await auth();

    // console.log('Session: ', session);

    const user = session?.user?.email;

    const signOutHandler = async () => {
        'use server';
        await signOut();
    };

    const dropdown = (
        <DropDown
            isOpen={false}
            position={'up'}
            closeOnSelect={false}
            label={`Hola ${user}`}>
            <form action={signOutHandler}>
                <Link href="/profile">
                    <Button type={basicTypes.Text}>Mi cuenta</Button>
                </Link>
                <hr />
                <Button
                    buttonType="submit"
                    type={basicTypes.Text}>
                    Cerrar sesión
                </Button>
            </form>
        </DropDown>
    );

    const login = (
        <Link href="/login">
            <Button type={basicTypes.Text}>Iniciar sesión</Button>
        </Link>
    );

    return session ? dropdown : login;
}
